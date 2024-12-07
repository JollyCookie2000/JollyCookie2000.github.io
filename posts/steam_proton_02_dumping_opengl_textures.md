# Steam Proton #02 - Dumping OpenGL textures

Hey all! Welcome to the second post of my blog series on exploring and tinkering with Valve's Proton! This time I'm going to do something slightly more complex than a simple Hello World: this time, I'm going to make Proton dump all of a game's textures. For simplicity, I'm going to be using the game *Hyperdimension Neptunia: Re;Birth1* which, contrary to what the its Steam page says, only uses OpenGL and not DirectX 10. Also, while this game is 32-bits, this implementation should work with any game that uses OpenGL, 32-bits or 64-bits.

> Note: Copyright laws still apply! I'm no lawyer, but I'm pretty sure we don't have permission to use these textures outside of the game. This is purely for academic purpose.

This is not a tutorial on OpenGL. Instead, refer to this guide that talks about textures in OpenGL if you want to know more: [learnopengl.com/Getting-started/Textures](https://learnopengl.com/Getting-started/Textures).

I'm going to keep things as simple as possible and, as such, I'm only interested in one function: `glTexImage2D` ([reference](https://registry.khronos.org/OpenGL-Refpages/gl4/html/glTexImage2D.xhtml)). Of all the parameters that this function accepts, I'm only interested in the following:

* `GLenum target`: Specifies the target texture. For now, I'm only going to support the `GL_TEXTURE_2D` (`0x0DE1`) target.
* `GLsizei width`: Specifies the width of the texture image.
* `GLsizei height`: Specifies the height of the texture image.
* `GLenum format`: Specifies the format of the pixel data. For now, I'm only going to support the `GL_RGBA` (`0x1908`) format, since that seems to be the only texture format that the game uses. It should be pretty easy to support other formats.
* `GLenum type`: Specifies the data type of the pixel data. This is the data type in which the texture is passed to this function. For now, I'm only going to support the `GL_UNSIGNED_BYTE` (`0x1401`) data type.
* `const void* data`:  Specifies a pointer to the image data in memory. This is the actual pixel data for the texture. For example, if the texture format is `GL_RGBA` and the data type is `GL_UNSIGNED_BYTE`, then this argument is going to be a pointer to an array of unsigned bytes, where every group of 4 bytes is going to represent a pixel. In this example, the array will have a size of *width x height x 4 x 1* bytes.

> Note: constants like `GL_TEXTURE_2D` are defined in the file `wine/include/wine/wgl.h`. You can use a command like `$ grep --recursive 'GL_TEXTURE_2D' ./` to search for a specific constant.

This means that, by intercepting calls to the `glTexImage2D` function, we have access to the pixel data of every texture as it gets loaded by the game. For this experiment, I'm going to directly modify this function in such a way that it writes the texture data to a file.

With the theory out of the way, let's start writing code!

Like in the previous post, we have to modify a DLL. In Windows, OpenGL is implemented by the `opengl32.dll` DLL file, which is located under `C:\Windows\System32\opengl32.dll` for 64-bits and `C:\Windows\SysWOW64\opengl32.dll` for 32-bits. In Proton, the source code for this DLL is located under `wine/dlls/opengl32/`.

Let's start by looking for the implementation of the `glTexImage2D` function with `$ grep --recursive --line-number 'glTexImage2D' ./`. The first result that seems interesting is a file called `thunks.c` at line 2489. Looking at this line we see the following: `void WINAPI glTexImage2D( GLenum target, GLint level, GLint internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, const void *pixels )`. That's exactly what we want! There's a warning at the beginning of the file saying something about not modifying the file. I'm going to ignore it.

> Note: I had no idea what "thunk" means, so I looked it up on the Internet. From Wikipedia: *In computer programming, a thunk is a subroutine used to inject a calculation into another subroutine.* In this case, I assume the file is called `thunks.c` because it contains a bunch of functions that do not actually do the calculations themselves and, instead, act as a proxy between the API that Windows applications expect and what is actually available on Linux.

## The plan

Let's review our objective. We want to dump the textures that the game loads by intercepting the OpenGL function calls. So, here's the plan:

1. *Get the texture data.* This one is easy; we receive the texture data and the texture size as parameters of the `glTexImage2D` function.
2. *Make sure the texture is in a supported format.* This one is optional. Basically, check that the texture has a format that we expect (target, format and type). I'm going to skip this check for this particular instance, since every texture in this game has the same format.
3. *Encode the texture.* Basically, transform the array of bytes we received into an image format that we can easily open with a image-viewing program.
4. *Write the texture to a file.* Pretty self-explanatory.
5. *Continue the execution*. Basically, after dumping the texture, we want to continue with the normal execution of the code. Otherwise, the game would just dump one texture and quit.

For the first point, there's nothing extra we have to do, since we receive the texture data as part of the arguments to the `glTexImage2D` function.

For the second point, we can put a simple if-statement that decides whether to attempt to dump the texture or not depending on the texture format. As already stated, I'm going to skip this step.

The third point requires a lot more work. Using popular formats like PNG or JPEG would require the use of an external library, due to the complexity of the these formats. The problem is that I'm not yet sure how to include extra dependencies when compiling Proton, which means that I have to implement the encoder myself for now. Fortunately, there's an extremely simple image format that is easy to encode, decode and is human-readable! I'm talking about the [Portable Pixmap Format](https://en.wikipedia.org/wiki/Netpbm)! I'm going to get into the details of this format in this post, since the Wikipedia article explains everything very clearly, but I'm just going to leave this simple example of a 2x2 black and white checkerboard image:

```
P3          # Magic number indicating an RGB image
2 2         # Image size in the format "< width > < height >"
255         # The maximum value of each color component.

  0   0   0 # Top-left black
255 255 255 # Top-right white
255 255 255 # Bottom-left white
  0   0   0 # Bottom-right black

# Oh yeah, you can even use comments! ;)
```

Simply beautiful! Just copy-and-paste this text into a text file, save it as `checkerboard.ppm` and voilà!

There's a few downsides to this format. The first is support: as far as I know, very few programs actually support this format (GIMP is one of those programs. Gwenview from the KDE project also supports it). The second issue is file size: the fact that there's no compression and that each color value is specified using ASCII characters, means that files will be quite large (4.2 MiB for a PNG and 70.3 MiB for a PPM of the same 3200x1813 image!).

The fourth point is to simply write our PPM-encoded texture to a file and, at the end, continue with the program's normal execution.

## The execution

Let's start by looking at how I changed the `glTexImage2D` function:

```C
void WINAPI glTexImage2D( GLenum target, GLint level, GLint internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, const void *pixels )
{
	truct glTexImage2D_params args = { .teb = NtCurrentTeb(), .target = target, .level = level, .internalformat = internalformat, .width = width, .height = height, .border = border, .format = format, .type = type, .pixels = pixels };

	NTSTATUS status;

	// The name of the file used to dump this texture
	char dump_file_name[64];

	// A counter that is incremented for each texture; used as a way to distinguish textures
	static int texture_counter = 0;

	// Generate the name of the file with the format "< counter >.ppm".
	sprintf(dump_file_name, "%d.ppm", texture_counter++);

	// Dump this texture to a file.
	dump_opengl_texture(dump_file_name, width, height, pixels);

	// Write a message to the log.
	MESSAGE("Dumped texture %s; format: %d; size: %dx%d; type: %d\n", dump_file_name, format, width, height, type);

	TRACE( "target %d, level %d, internalformat %d, width %d, height %d, border %d, format %d, type %d, pixels %p\n", target, level, internalformat, width, height, border, format, type, pixels );

	if ((status = UNIX_CALL( glTexImage2D, &args ))) WARN( "glTexImage2D returned %#lx\n", status );
}
```

Let's now implement the logic behind the `dump_opengl_texture` function in a separate file:

```C
#pragma once

#pragma once

void dump_opengl_texture(const char* dump_file_name, const int width, const int height, const void* data)
{
	// Re-cast the void pointer into something we can actually use.
	const unsigned char* pixels = (const unsigned char*) data;
	
	// File handle.
	FILE* file = NULL;

	// Open the file for writing.
	file = fopen(dump_file_name, "w");

	// Write the image file header.
	fprintf(file, "P3\n");
	fprintf(file, "%d %d\n", width, height);
	fprintf(file, "255\n");

	for (unsigned int y = 0; y < height; ++y)
	{
		for (unsigned int x = 0; x < width; ++x)
		{
			// For each pixel in the texture, write the RGB
			//  components as "< red > < green > < blue >\n".
			fprintf(file, "%d %d %d\n",
				pixels[0 + y * width * 4 + x * 4],  // Red
				pixels[1 + y * width * 4 + x * 4],  // Green
				pixels[2 + y * width * 4 + x * 4]); // Blue
		}
	}

	// Close the file.
	fclose(file);
}

```

A quick note on the way I index the pixels array inside the two for loops: since `pixels` is a 1D array and a texture is a 2D matrix, we need to to some simple math to transform a 2D index (`x` and `y`) into a 1D index. The formula is pretty simple: `index = y * width + x`, where `index` is the resulting 1D index, `x` and `y` are the 2D index and `width` is the width of the 2D matrix.

We also have to take into consideration the fact that the texture is made up of 4 components: red, green, blue and alpha, but we are exporting the texture only as RGB without the alpha channel. This is the reason for the `* 4` used to multiply the index, even though we are only considering three components. I definitely didn't waste half an hour trying to understand why the dumped textures were completely broken.

Let's not forget to include this file inside `thunks.c`. This is a matter of simply adding the `#include "dump_opengl_texture.h"` directive at the top of the `thunks.c` file, after the other include directives.

Let's now compile and run the game with the changes!

## The result

As soon as I started the game, magic happened: a bunch of images were appearing in the game's folder! Some were completely black, some were clearly used for particle effects and other were the game character's deformed faces. It worked!

Writing a texture to disk using the PPM format results in the game freezing or slowing down due to the large size of the files being written. If your game freezes or stutters, that is probably normal.

> Note: In this game, the order in which the textures are loaded depends on the player's actions. It is therefore not guaranteed that a texture is going to be dumped with the same file name each time.

And that's all for this second post of this series! We went from writing a simple message to the log to dumping a game's textures! While the changes made and the code written were small, I still had a ton of fun and was able to understand a lot about Wine/Proton. I'm still not sure what the next experiment will be about. Maybe I'll try to fix some of the games in my Steam library that do not work on Linux. Until then, see you next time!

P.S.: I really like the idea of dumping a game's textures and I would like to expand it by adding the possibility of loading textures from disk and replace the game's original textures with textures of my own (different visual style? higher-definition textures? chaos?). Maybe I can take this even further and replace stuff like shaders and meshes.
