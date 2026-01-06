---
author: "Lorenzo A. Piazza"
layout: post
title:  "Fix suspend issue with Fedora Linux on Gigabyte B850 AORUS ELITE WIFI7 ICE motherboard"
date:   2025-12-08 12:00:00 +0100
---

## Introduction

I recently built a new gaming PC with a *Gigabyte B850 AORUS ELITE WIFI7 ICE* motherboard and installed Fedora 43 Linux (I'm a certified Linux Gamer™ after all). I couldn't be happier with how it turned out, and I'm especially surprised on how well Linux runs on it out-of-the-box.

I did, however, notice an issue when putting the PC to sleep (suspend): the PC would always wake up instantly on its own. I tried [updating the BIOS to the latest version](https://www.aorus.com/en-gb/motherboards/b850-aorus-elite-wifi7-ice-rev-1x/Support) (F7 as of this writing), but without success.

After searching around, I finally found [this guide](https://pliszko.com/blog/post/2025-07-31-fixing-instant-wake-from-suspend-on-gigabyte-motherboards-on-arch-linux). I've tried the solution explained in the guide - disabling GPP0 - but without success. The second solution - adding the kernel parameter - did actually solve the issue.

These are my relevant specs:

* Motherboard: Gigabyte B850 AORUS ELITE WIFI7 ICE
* BIOS version: F7
* OS: Fedora Linux 43

## Solution

We basically have to spoof the current OS to the BIOS by changing a kernel parameter in the GRUB2 configuration.

Here are the steps:

1. Open the GRUB2 configuration in a text editor:

{% highlight bash %}
sudo nano /etc/default/grub
{% endhighlight %}

2. Add the string `acpi_osi='!Windows 2015'` to the `GRUB_CMDLINE_LINUX` option. This is what mine looks like:

{% highlight conf %}
GRUB_CMDLINE_LINUX="rhgb quiet acpi_osi='!Windows 2015'"
{% endhighlight %}

3. Re-generate the GRUB2 configuration:

{% highlight bash %}
sudo grub2-mkconfig --output /boot/grub2/grub.cfg
{% endhighlight %}

4. Reboot the PC.

5. The issue should now be resolved.

## Why this works

The issue is due to a bug with the BIOS of the motherboard that causes it to improperly handle wake up triggers if the operating system detected is not Windows. With this fix, we are spoofing our OS, making the BIOS believe that we are actually running Windows (Windows 2015 refers to Windows 10).
