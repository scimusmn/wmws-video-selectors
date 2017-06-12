# wmws-video-selectors

Video selector for the We Move and We Stay exhibit at the Science Museum of Minnesota. Contains both the Identity selector and the Flute/Jingle Dress selector.

## Saving content to a file

    mongoexport --port 3001 --db meteor --collection ExhibitComponents --pretty --jsonArray --out exhibitComponents.json
    mongoexport --port 3001 --db meteor --collection Videos --pretty --jsonArray --out videos.json

## Loading content from the file
Warning, this is destructive.

    meteor reset
    meteor

This will erase everything in your local database and update it with the json
files that are tracked in Git.


## Serve media from an external directory
If a Meteor project contains large media files, the startup process can become increasingly long as it processes the large files.
Reduce startup time by moving the media files outside the Meteor project, and using a Node `http-server` instance to serve the files.

Edit the 'mediaServer' value in settings-kiosk.json file.

    "mediaServer": "http://localhost:8080",

Install `http-server` globally.

    sudo npm install http-server -g

Change directories to an external media folder.

    cd /usr/local/src/wmws-media/

Start the http-server on port 8080 in silent mode.

    http-server -p 8080 --silent

Media files will now be served from this folder instead of the default `public` folder inside your Meteor project.