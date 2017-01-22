# Eggplants
https://eggplants.org

Eggplants is an open-source website that serves as an alternative to downloading osu! beatmaps. Whether it be the user is not logged into the osu! site, or is on another server - They can still download beatmaps. Eggplants uses the [osu! API](https://github.com/ppy/osu-api/wiki) to find beatmaps & the [Ripple](https://ripple.moe) beatmap mirror to download them.

# Dependencies

For now, Eggplants uses less than what the package.json contains, but will be used in the future. The current list of dependencies are as follows. Note: It won't work out of the box unless you change the code.
* Express
* ejs
* Request
* body-parser

`npm install express ejs request body-parser --save`

If you want to download the other packages as well, just do:
`npm install`

# Usage

* Assuming that you already have your domain hooked up to your server and Nginx installed, just fill in your domain.

```
server {
    listen 80;

    server_name eggplants.org;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

* Add in or comment out the secret for Express-Sessions in app.js
```js
app.use(require("express-session")({
    secret: "YOUR SECRET GOES HERE", 
    resave: false,
    saveUninitialized: false
}));  
```

* Get an osu! API key, and insert it in, into middleware/index.js
```
// osu! API Key
var osuAPI = "";
```

* Lastly, use PM2 or any other tool you'd like for running it. or if you're hosting locally, just run with node app.js.

# LICENSE 

All of the code in this repository is licensed under the MIT license.

Which basically means you can do what ever your heart desires with this source.

See the "LICENSE" file for more information.





