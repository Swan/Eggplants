const axios = require('axios');


// Responsible for checking if a /s/ exists on Ripple's mirror and redirects them to a download if so. 
const setIdDownload = (req, res) => {

    const url = `http://storage.ripple.moe/s/${req.params.setId}`;

    axios.get(url)
        .then((response) => {
            return res.redirect(`https://storage.ripple.moe/${req.params.setId}.osz`);
        })
        .catch((err) => {
            const status = 404;
            const error = 'The beatmap was not found';
            
            return res.status(status).json({status, error});
        });
};

module.exports = { setIdDownload };