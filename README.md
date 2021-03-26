# GMDSS

WORK IN PROGRESS
## Development

Frontend: `ng serve` -  `http://localhost:4200/`
Server: `npm run dev` or `npm run prod`

config files must be created for each env to work (config.dev.env & config.prod.env): [template](https://github.com/spoqk/gmdss/blob/master/server/config/config.temp.env)

nodemon `sudo npm install -g nodemon`

to enable OAuth 2.0 for http://localhost:3000/auth/google/callback:
in GoogleCloud console -> APIs & Services -> credentials -> edit OAuth 2.0 Client IDs - there add it to Authorised JavaScript origins URIs and Authorised redirect URIs
in order for it to work on local machine - install and run localtunnel to expose localhost `sudo npm install -g localtunnel` then `lt -h "http://serverless.social" -p 3000 --subdomain mysubdomain`
and then enable OAuth 2.0 for http://mysubdomain.serverless.social 