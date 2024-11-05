# Card Conjurer
Card Conjurer was created by a passionate Magic the Gathering player and grew to
become probably the most popular online card generator known to the game.

In November 2022, Wizards of the Coast served the original creator and webhost
of the site with Cease-and-Desist paperwork, forcing the site offline.

This repository is for the purpose of making the application usable on your
local machine and maintaining templates in perpetuity.


## Setup

- Clone this repo somewhere on your system. (Or download the Zip with CODE > Download Zip above)
- Run server.exe (or mac-server for MacOS, linux-server for linux)
- You're good to go! You could also set up Card Conjurer in a more traditional method using WAMP, Docker, XAMPP, etc.

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?longCache=true&style=popout)](https://www.paypal.me/kyleburtondonate) ← Help out Card Conjurer's original creator, Kyle. We love you buddy.


## Alternative Setup (Docker)

This is an alternative way to run Card Conjurer locally for more technically
inclined people.

A Docker Compose file is present to run the application in a lightweight Nginx
context. The port used is 4242 (http://localhost:4242/).

Starting:

```bash
$ docker compose up -d
```

Stopping:

```bash
$ docker compose down
```

## Using Local Images

If you're saving a lot of cards custom images you might hit the data limit for
uploaded images (about 2MB).

You can avoid this by putting the image files in the `local_art` directory of
this repo. Then, when selecting the image in the Art tab of the card creator,
instead of uploading the image you can type the file name in the "Via URL"
field.

This will use the image directly from the `local_art` directory instead of
needing to store the whole image in the save file.

For example if you add the file: `cardconjurer/local_art/my_art.jpg`

You can load it in the "Via URL" box by typing: `my_art.jpg` then hitting enter.
