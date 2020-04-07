# Website oli

## dev

`pscp -r C:\Repository\website-oli\dist pi@192.168.178.66:/home/pi/oli/www`

`docker rm website-oli`

`docker create \
  --name=website-oli \
  --cap-add=NET_ADMIN \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/Amsterdam \
  -e URL=ollekepeters.nl \
  -e SUBDOMAINS=www, \
  -e EMAIL=oli@pheelix.dev \
  -e VALIDATION=http \
  -p 443:443 \
  -p 80:80 \
  -v /home/pi/oli:/config \
  --restart unless-stopped \
  linuxserver/letsencrypt:1.3.0-ls103`
  
`docker start website-oli`

## Developing Using Source Files
To use the source files, you will need to have npm installed globally along with Gulp.js. To start:
* Run `npm install` in the root directory
* Run `gulp dev` and edit the files as needed

If you need to update the plugins included with this template, simply run the following tasks:
* First run `npm update` to update the dependencies
* Then run `gulp copy` to copy the new versions to their proper destinations

# Creator
forked from [Agency](http://startbootstrap.com/template-overviews/agency/)

Start Bootstrap was created by and is maintained by **[David Miller](http://davidmiller.io/)**, Owner of [Blackrock Digital](http://blackrockdigital.io/).

* https://twitter.com/davidmillerskt
* https://github.com/davidtmiller
