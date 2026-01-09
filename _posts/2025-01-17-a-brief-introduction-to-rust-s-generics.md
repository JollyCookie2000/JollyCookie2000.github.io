---
author: "Lorenzo A. Piazza"
layout: post
title:  "A brief introduction to Rust's generics"
date:   2025-01-17 20:04:40 +0100
---

I recently began learning how to use generics in Rust, and decided to write a brief blog post explaining the absolute basics needed to get started with using and understanding generics in Rust. The main objective of this post is to help you (and me) reason about generics.

This is in no way, shape or form a complete or in-depth guide to generics. The point of this article is just to give reader an idea of what generics are and how they are used in practice with a few really simple examples.

Generics can be used with functions, but also with structs. For simplicity, in this article I'm only going to go over how to use generic types in the context of functions.

The reader is expected to already have a basic understanding of at least Rust's traits.

## A simple example

Let's start by taking a look at some very simple code:

{% highlight rust linenos %}
fn print_value(a: i32) {
	println!("a = {}", a);
}

fn main() {
	print_value(42);
}
{% endhighlight %}

In this example, we define a function called `print_value` that accepts one argument of type `i32` (32-bit signed integers) of name `a` and returns no value. Then, inside the `main` function, we call the `print_value` function with the argument `42`.

Running this code yields the following result:

```
a = 42
```

> By the way, the website [Rust Playground](https://play.rust-lang.org/) allows you to quickly and easily run Rust code in the browser, without having to create a Cargo project or use rustc.

We now have a really simple function that prints a value of type `i32`!

Let's say that we also want to be able to print a value of type `f64` (64-bit floating point). How would we do this?

The simplest solution is to implement another function, similar to `print_value`, that accepts an argument of type `f64` instead of `i32`. Here is the example from before with the new function added:

{% highlight rust linenos %}
fn print_value_i32(a: i32) {
	println!("a = {}", a);
}

fn print_value_f64(a: f64) {
	println!("a = {}", a);
}

fn main() {
	print_value_i32(42);
	print_value_f64(3.14);
}
{% endhighlight %}

I also changed the name of the old `print_value` function to `print_value_i32` to avoid naming collisions.

As expected, running this code yields the following result:

```
a = 42
a = 3.14
```

## The problem

In the previous example, we addressed the challenge of executing the same operation over different data types by just copy-pasting a function and changing the types of its arguments and return value.

What if we need to print a value of `i64`? And `u8`? We could keep copy-pasting the same `print_value` function over and over again for each data type we want to print. This, however, introduces a few issues:

- We are repeating the same code over and over again.
- If we have many data types, we are going to end up with a large number of almost identical functions.
- If we wanted to change the behavior of the `print_value` functions, we would have to make the same change in every copy of the function we have implemented.

How do we solve this problem? Since we are effectively just copy-pasting the same code, wouldn't it be nice if there a way to let the compiler to the copy-pasting automatically for us, so that we only have to write only one `print_value` function?

## The solution

This is where generics come in to save the day.

Generics are a feature of some programming languages that allow developers to write code that can operate over different data types (i.e. generic code), **while still allowing the compiler to guarantee type safety**.

Let's see how we can rewrite the previous example using generics to avoid duplication:

{% highlight rust linenos %}
fn print_value<T>(a: T) {
	println!("a = {}", a);
}

fn main() {
	print_value(42);
	print_value(3.14);
}
{% endhighlight %}

In this example, I have rewritten the `print_value` function so that it accepts a single generic parameter of type `T`.

The only weird syntax we encounter in this example is the `<T>` after the name of the function. The `<>` are used to list and describe the generic arguments that the function accepts. If we were to remove the `T` from inside the `<>`, we would get a compilation error where the compiler tells us that the type `T` does not exist.

> A note: the name `T` is just a convention. We can name generic types whatever we want.

The compiler, however, does not allow us to compile this code and gives us the following error:

```
   Compiling playground v0.0.1 (/playground)
error[E0277]: `T` doesn't implement `std::fmt::Display`
 --> src/main.rs:2:21
  |
2 |     println!("a = {}", a);
  |                        ^ `T` cannot be formatted with the default formatter
  |
  = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead
  = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)
help: consider restricting type parameter `T`
  |
1 | fn print_value<T: std::fmt::Display>(a: T) {
  |                 +++++++++++++++++++

For more information about this error, try `rustc --explain E0277`.
error: could not compile `playground` (bin "playground") due to 1 previous error
```

With this error, the compiler is telling us that we are trying to execute an operation (printing) on a type that does not support it. Why does this happen?

In the function signature, we have specified that the generic type `T` exists, and nothing else. What is `T`? What functionality does it have? How is the compiler supposed to know how to print a value of type `T`? As it currently stands, the compiler has no way of determining how to do anything useful with `T`.

Fortunately, the compiler gives us a suggestion:

```
...
help: consider restricting type parameter `T`
  |
1 | fn print_value<T: std::fmt::Display>(a: T) {
  |                 +++++++++++++++++++
...
```

When try to print a value, the compiler makes sure that the type of the value implements the `Display` trait. The `Display` trait allows a data type to specify how it should be represented and formatted visually when printed to the console.

This means that we somehow need to guarantee that the type `T` implements at least the `Display` trait. We can do this in the following way:

{% highlight rust linenos %}
use std::fmt::Display;

fn print_value<T: Display>(a: T) {
	println!("a = {}", a);
}

fn main() {
	print_value(42);
	print_value(3.14);
}
{% endhighlight %}

Here, we have defined a function called `print_value` that accepts an argument of any type, as long as that type implements the `std::fmt::Display` trait.

Running this example yields the following output:

```
a = 42
a = 3.14
```

---

It is possible to specify that the generic type `T` must implement multiple traits by using the following syntax: `<T: Trait1 + Trait2>`.

It is also possible to define multiple generic types for a single function:

{% highlight rust linenos %}
use std::fmt::Display;

fn print_values<T: Display, U: Display>(a: T, b: U) {
	println!("a = {}", a);
	println!("b = {}", b);
}

fn main() {
	print_values(42, "Hello, World!");
}
{% endhighlight %}

Output:

```
a = 42
b = Hello, World!
```

---

There's an alternative syntax that works better when the list of generic types starts to become too long and difficult to read:

{% highlight rust linenos %}
fn do_stuff<T, U>(a: T, b: U) -> U
where
	T: Trait2, // Traits that the generic type T must implement.
	U: Trait1 // Traits that the generic type U must implement.
{
	// Code ...
}
{% endhighlight %}

---

Until now, we have only used generics as argument types. However, we are free to return a generic type, as well as to create local variables of a generic type.

In addition, generic types only exist withing the scope of the function that defines them. This means that e can't use the generic type `T` defined in the `print_value` function to create a variable of the same type `T` in the main function.

As an exercise, try now to implement a function that takes two generic arguments (both of the same type) and return their sum. You can easily ask for help to your local friendly LLM and it will provide you with the correct solution.

## Behind the scenes

How exactly do generics work? As I have hinted before, when we use generics, the compiler copy-pastes the generic function for each different data type we use. In other words, the compiler compiles a generic function multiple times, each time replacing the generic type with a concrete type. Let's take one of the previous examples:

{% highlight rust linenos %}
use std::fmt::Display;

fn print_value<T: Display>(a: T) {
	println!("a = {}", a);
}

fn main() {
	print_value(42);
	print_value(3.14);
}
{% endhighlight %}

When going over the code, the compiler sees that we are calling the `print_value` function with two different data types: `i32` (for the value 42) and `f64` (for the value 3.14). In other words, the following is what gets compiled into the final binary:

{% highlight rust linenos %}
fn print_value_i32(a: i32) {
	println!("a = {}", a);
}

fn print_value_f64(a: f64) {
	println!("a = {}", a);
}

fn main() {
	print_value_i32(42);
	print_value_f64(3.14);
}
{% endhighlight %}

---

Just for fun, let's take a brief look behind the scenes. For this, I'm going to be using [Compiler Explorer](https://godbolt.org), a tool that allows you to see the assembly of a compiled program.

Inside Compiler Explorer, we set the language to _Rust_ instead of the default _C++_ and then we paste the following code inside the text area on the left (be sure to include the `pub` keyword, otherwise there would be no output):

{% highlight rust linenos %}
use std::fmt::Display;

fn print_value<T: Display>(a: T) {
	println!("a = {}", a);
}

pub fn main() {
	print_value(42);
	print_value(3.14);
}
{% endhighlight %}

On the right side of the window, we will see a bunch of Assembly code appearing. It is not necessary to be able to understand all of that code. There's only a couple of lines that we are actually interested in.

Among the output, we will see two lines that start with `example::print_value::` followed by a bunch of symbols. Those are our `print_value` functions and, as expected, there's two of them. If we scroll a little bit, we will even see the text `impl core::fmt::Display for i32` and `impl core::fmt::Display for f64`, the two data types we called the function with. Try to call `print_value` with another type, like a string, and see ho the output changes!

Do keep in mind that, the more we use generics, the slower compilation times will be and the larger the final binary will be!

## Considerations

There's a few important things to consider when using generics:

* As we have seen before, the compiler generates code for every data type we use. This means that, the more types we use, the slower the compilation times and the larger the final binary will be.
* Generics introduce complexity and can easily spiral out of control.

## Conclusions

Hopefully you now see how powerful generics can be if used appropriately! This post only scratched the surface of what you can do with this powerful Rust feature.

Now that you have a basic understanding of generics, I wish you good luck on your learning journey!
