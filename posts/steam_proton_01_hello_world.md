# Steam Proton #01 - Hello, World!

Hi! I'm Lorenzo and I've decided to start this journey trying to understand how Wine/Proton work and, in the future, hopefully be able to contribute to the project. I'm going to use this blog as a way to keep track of my progress and to maybe help someone else get into this amazing project.

The first thing to do is to get Proton's source code, compile it and make sure that it works. After this, I would like to apply a small change to the code and make Proton print the string *Hello, World!* to the log.

## Environment setup

The building process is made much easier thanks to the use containers that automatically install and configure all the required dependencies. Since I'm using Fedora Linux, I'm going to use Podman instead of Docker.

On Fedora, I had to set SELinux in *permissive* mode by running `# setenforce 0`, otherwise I would get an error when trying to mount a host path inside a Podman container.

Now I just had to grab the source code for Proton: `$ git clone --recurse-submodules https://github.com/ValveSoftware/Proton.git proton`. For this experiment, I'm using the `proton-9.0-3e` tag.

## Compiling

Compiling Proton is fortunately very easy: just run `$ make dist container_engine=podman build_name=MyProton-9`. The final package will be located inside `build/build-MyProton-9/dist/`. The `build_name` variable lets us choose the display name of our custom Proton. To use in Steam, just copy the `dist/` directory inside `~/.var/app/com.valvesoftware.Steam/.steam/steam/compatibilitytools.d/`. Note that the path may be different depending on the way you installed Steam (I am using Flatpak). Also, if you haven't already installed some other custom version of Proton, it is likely that the `compatibilitytools.d/` directory does not exist; in that case, it will have to be created manually. It is necessary to restart Steam for the custom Proton to be detected. Just to be sure, it's better to delete the game's Wine prefix if it exists to avoid issues (`~/.var/app/com.valvesoftware.Steam/.steam/steam/steamapps/compatdata/< game ID >/`).

## Running

To use our custom Proton, right-click on a game in the Steam library and select *Properties...*. Then, under the *Compatibility* tab, check *Force the use of a specific Steam Play compatibility tool* and select *proton_9.0-local* from the drop-down menu (the name may be slightly different depending the Proton version used). Later I try to change the display name into something more unique.

There's one last thing that needs to be done before proceeding, and that is to enable logging. To do this, simply go into the game's properties and, under the *General* tab, paste the following text into the *LAUNCH OPTIONS* text box: `PROTON_LOG=1 %command%`. Now, when a game is run, a log file will be created in your home directory (or, like in my case, in `~/.var/app/com.valvesoftware.Steam/`) with the name `steam-< game ID >.log`.

## Hello, World!

Finally! Here comes the interesting part!

As I said in the beginning, the objective is simple: make Proton print *Hello, World!* in the log file. To do this, two things are needed: first we need to find the right place in the code to add our own custom-code and second, we need to find a way to print text to the log file (`printf` is actually not available at all!).

The way Wine (and, as a consequence, Proton) is by re-implementing many of the DLLs that you would find on a normal Windows installation and that are used by Windows program. For this experiment, I decided to modify one of the DLLs, since that's where most of the interesting code is located. I picked `kernel32.dll` for this, since it's guaranteed to be loaded by any Windows program. From Wikipedia: *KERNEL32.DLL exposes to applications most of the Win32 base APIs, such as memory management, input/output (I/O) operations, process and thread creation, and synchronization functions.* ([wikipedia.org/wiki/Microsoft_Windows_library_files](https://wikipedia.org/wiki/Microsoft_Windows_library_files)). On Windows, the file is located under `C:\Windows\System32\kernel32.dll`. The source code for this DLL is located at `wine/dlls/kernel32/`.

Let's move onto the next point: we need to find a way to print stuff to the log file. As I said before, `printf` is not available and as such, we need to look somewhere else. Fortunately, Wine puts at our disposal a series of functions to help with logging, one for each log level (trace, warn, err, fixme). These functions are defined in the `wine/include/wine/debug.h`:

```C
#define TRACE                      WINE_TRACE
#define TRACE_(ch)                 WINE_TRACE_(ch)
#define TRACE_ON(ch)               WINE_TRACE_ON(ch)

#define WARN                       WINE_WARN
#define WARN_(ch)                  WINE_WARN_(ch)
#define WARN_ON(ch)                WINE_WARN_ON(ch)

#define FIXME                      WINE_FIXME
#define FIXME_(ch)                 WINE_FIXME_(ch)
#define FIXME_ON(ch)               WINE_FIXME_ON(ch)

#define ERR                        WINE_ERR
#define ERR_(ch)                   WINE_ERR_(ch)
#define ERR_ON(ch)                 WINE_ERR_ON(ch)

#define MESSAGE                    WINE_MESSAGE
```

I'm going to use the `MESSAGE` function for this case. So, all I did to print *Hello, World!* was adding `MESSAGE("Hello, World!\n");` at the beginning of the `DllMain` function inside `wine/dlls/kernel32/kernel_main.c`. `DllMain` is the first function that gets executed when a DLL is loaded and, since `kernel32.dll` gets loaded by basically every Windows application, I can be sure that the message is always printed.

Now I simply compile Proton again, copy it to the correct directory, restart Steam and start a game. Result: there's a bunch of *Hello, World!* messages in the game's log files! I assume the message gets printed multiple times because the DLL gets loaded multiple times.

That's all for the first post of this series! Next time, we'll be doing something much more interesting!
