# Blog Website

This is the source code for my personal website which you can find [here](https://jollycookie2000.github.io).

This is an entirely static website built using the [Jekyll](https://jekyllrb.com) static website generator.

## Requirements

Jekyll is required to build the website locally. You can install Jekyll on Fedora Linux with the following command:

```Bash
# Install Ruby and other dependencies.
sudo dnf install ruby ruby-devel

# Install the Jekyll gem.
gem install jekyll

# Install dependencies.
gem install
```

## Building

The website is automatically built and deployed by GitHub Actions.

You can build the website locally with the following command:

```Bash
# Install dependencies.
bundle install

# Build the website.
bundle exec jekyll build
```

This will create the directory `_site/` inside which you can find the generated website.

You can also run the website locally for development purposes by running the following command:

```Bash
bundle exec jekyll serve --drafts --livereload
```

You can now access the website at `http://localhost:4000`.

Once you have applied your changes, run the following command to verify if there are any configuration issues:

```Bash
bundle exec jekyll doctor
```
