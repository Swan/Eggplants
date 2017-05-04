const axios = require('axios');

// Responsible for checking if a /b/ exists on Ripple's mirror and download it if so.
const beatmapIdDownload = (req, res) => {
    
    const url = `http://storage.ripple.moe/b/${req.params.beatmapId}`;

    axios.get(url)
        .then((response) => {
            return res.redirect(`http://storage.ripple.moe/${response.data['ParentSetID']}.osz`);
        })
        .catch((err) => {
            const status = 404;
            const error = 'Beatmap not found';
            
            return res.status(status).json({status, error});
        });

};

module.exports = { beatmapIdDownload };