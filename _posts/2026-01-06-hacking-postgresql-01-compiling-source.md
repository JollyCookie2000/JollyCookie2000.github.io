---
author: "Lorenzo A. Piazza"
layout: post
title:  "Hacking PostgreSQL #01 - Compiling Source"
date:   2026-01-17 12:34:20 +0100
---

## Introduction

Hey there! It's been a pretty long time since the last blog post, hasn't it? I've decided to start a new blog series about tinkering with the source code of various open-source projects.

With this blog series, I wish to improve my ability to understand and contribute to large codebases. I also wish to improve my ability to write, share my ideas in a structured manner and improve my approach to solving large problems. For this reason, I am going to take some large open-source software, compile them and tinker around.

As the title suggests, this series is dedicated to PostgreSQL (pronounced *post-gres-kew-el*). This post is not an introduction to PostgreSQL, so I'll keep it really short: PostgreSQL (sometimes also called just Postgre) is an open-source Relational Database Management System (RDBMS) with a focus on SQL compliance offering a lot of extensibility.

To tell you the truth, I haven't used Postgres a lot before. The main reason I decided to start tinkering with it is because I found some interesting articles and videos discussing the inner-workings of Postgres and I wanted to take a closer look myself.

For the first post, I'll not be making any changes to the code. I'll instead start by cloning the source code repository and finding the documentation. I'll then move onto installing dependencies, compiling the source code, running tests and deploying the compiled program in a test environment.

Now, without further ado, let's get started!

## Development environment

Before starting, I want to give a quick word on the environment I'll be using. I don't like installing compilers and dependencies on my main operating system because I like to keep it as clean as possible. For this reason, I often times use container solutions like [Distrobox](https://distrobox.it) and do everything inside of an isolated environment.

For this project, I've created a dedicated Distrobox container:

{% highlight bash linenos %}
distrobox create --home ~/Documents/db-Postgres Postgres
{% endhighlight %}

This command creates a new Distrobox container called *Postgres* with a custom home directory located in `~/Documents/db-Postgres/`.

We can then enter the container with the following command:

{% highlight bash linenos %}
distrobox enter Postgres
{% endhighlight %}

Simply press CTRL + D or type `exit` to exit the container.

Assume that all of the following operations are being executed inside a Distrobox container.

## Getting the source code

The first thing I'm going to do is download the source code. We can easily find it by a simple web search like "*PostgreSQL  source code*". One of the first results we will see is the [Postgres GitHub repo](https://github.com/postgres/postgres). As the repo description tells us, this is not the actual repo, but just a mirror. Scrolling a few results below, we see a download page from the [official Postgres website](https://www.postgresql.org/download).

This page has a section dedicated to the source code. We can see a link that points to a file browser, which allows us to [download the source code](https://www.postgresql.org/ftp/source) as a compressed archive and, further down, there will be a link that points to a [page where we can find the actual git URL](https://git.postgresql.org/gitweb/?p=postgresql.git;a=summary): `https://git.postgresql.org/git/postgresql.git`.

If you want to have the git commit history and all of the latest changes, clone the repo from the git URL, otherwise you can just download the compressed archive. I will be cloning the repo:

{% highlight bash linenos %}
git clone https://git.postgresql.org/git/postgresql.git && cd ./postgresql/
{% endhighlight %}

At the time of this writing, the latest commit is `d40fd85187d06f7bd16fb4d0067bad0b1d248718`.

Whenever we start working on a new project, we should always read the README first. Here we'll find a [link to the documentation that explains how to compile the source code](https://www.postgresql.org/docs/devel/installation.html).

## Installing dependencies

Let's start by taking a look at the [prerequisites](https://www.postgresql.org/docs/devel/install-requirements.html) we need to compile Postgres. Here we can find a list of all of the programs and libraries we will need to build the project. I'll leave going through the web page to you and instead I'll just give you the TLDR of all of the packages we need to install:

* *GNU make* (According to the documentation, we could also use Meson. I'll use *make* since it's the one I'm most familiar with. You can use whichever you prefer.)
* *gcc*: the C compiler
* *Flex*: a lexical analyzer generator (for interperting SQL)
* *Bison*: a parser generator (for interperting SQL)
* *Readline* (development package): a library that provides in-line editing, history and other capabilities for interactive command-line programs
* *Zlib*: a compression library
* *ICU* (development package): International Components for Unicode; a library for Unicode support
* *Perl*: the Perl interpreter
* *Perl FindBin*

You can use the following command to install all of the needed packages on Fedora:

{% highlight bash linenos %}
sudo dnf install gcc flex bison readline-devel zlib-ng-compat-devel libicu-devel perl-core perl-FindBin
{% endhighlight %}

> I've used *zlib-ng-compat* instead of *zlib* because it's the only one immediately available on Fedora. I've used the "compat" variant of the package because otherwise Postgres wouldn't be able to find the package. *zlib* should also work. Read more [here](https://fedoraproject.org/wiki/Changes/ZlibNGTransition).

If we missed a package, we'll likely find out during compilation anyway. Also, depending on your distribution, some of the packages may already be installed.

The documentation lists a lot of other packages, but they are optional and I'm going to skip them.

## Building the source code

Now we can finally build the source code!

By advancing a few pages in the documentation, we can find the [page that explains how to build Postgres using GNU make](https://www.postgresql.org/docs/devel/install-make.html). If you are using Mason, check out the dedicated page.

At the beginning of the page, we can find a helpful summary of all of the commands we need to run. I'll only be running a few of them since I'll be doing a very simple deployment for the purpose of experimentation.

Let's start by generating the Makefile needed to compile the project. Note that if you forgot to install some dependencies, you'll be seeing errors during this process.

{% highlight bash linenos %}
./configure
{% endhighlight %}

This command will generate the Makefile necessary to build the project.

Let's now compile the source code:

{% highlight bash linenos %}
make
{% endhighlight %}

This will take some time depending on your hardware.

After the build has completed without errors, we should run the regression tests to make sure that the compiled code works as intended:

{% highlight bash linenos %}
make check
{% endhighlight %}

All of the tests should pass. These tests should be run after making changes to the source code and before submitting patches to make sure that our changes haven't broken any existing functionality.

The compiled binaries can be found under the `tmp_install/usr/local/pgsql/` directory.

**ATTENTION**: Unless you are careful and specify a different installation prefix, the next step is going to overwrite any existing Postgres installation and you may lose data! This is one of the reasons that I chose to work inside a dedicated containerized environment. You can refer to the Postgres documentation for instructions on how to change the installation directory.

Let's now install the compiled Postgres binaries:

{% highlight bash linenos %}
sudo make install
{% endhighlight %}

We can find the compiled files inside the `/usr/local/pgsql/` directory by default.

We can now skip forward to [chapter 18.2](https://www.postgresql.org/docs/devel/creating-cluster.html), where the documentation explains how to create and initialize a database cluster (i.e. the directory where all of the databases, tables, etc are located). I'm going to use the following command to create the data directory `pgdata` inside the repository root (note that the data directory will be owned by your current user):

{% highlight bash linenos %}
/usr/local/pgsql/bin/initdb ./pgdata/
{% endhighlight %}

We can then use the following command to start the Postgres server:

{% highlight bash linenos %}
/usr/local/pgsql/bin/postgres -D ./pgdata/
{% endhighlight %}

This will run the server in the current terminal and will output the logs to stdout. Pressing `CTRL + C` will close the server.

Opening another terminal and running the following command will connect us to the server:

{% highlight bash linenos %}
/usr/local/pgsql/bin/psql --dbname postgres
{% endhighlight %}

`postgres` is the default database that gets automatically created by `initdb`. By default, `psql` will try to connect to a database on localhost named after your Linux user. If we don't specify the database name when connecting to the server, we'll get an error about a database not existing.

We can now run SQL commands however we want.

## Conclusions

Great! We now have a simple local deployment we can use to tinker around and modify as much as we want. Whenever we make a change, we simply have to compile, install, optionally test and restart the Postgres server.

I like to start easy and slowly move onto more complex tasks, which is why the next couple of posts will only make very small changes and will instead focus more on navigating the codebase and finding the various components that make up Postgres.

## Interesting resources

These are some very interesting resources that I found on the web and that inspired me to take a closer look at Postgres.

* [Hacking on PostgreSQL (YouTube)](https://youtu.be/-OZEPExwZEw)
* [How does PostgreSQL actually work (YouTube)](https://youtu.be/OeKbL55OyL0)
* [So, you want to be a developer?](https://wiki.postgresql.org/wiki/So,_you_want_to_be_a_developer%3F)
* [Introduction to Hacking PostgreSQL](https://www.pgcon.org/2007/schedule/attachments/9-Introduction_to_Hacking_PostgreSQL_Neil_Conway.pdf)
