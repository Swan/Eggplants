const axios = require('axios');

// Responsible for grabbing the initially shown beatmaps from Ripple's API
const getInitialBeatmaps = (req, res) => {

    let offset = req.query.offset; // TODO: Would need to increase the offset by 100 each time. 101, 201, 301 etc, for infinite scrolling
    let randomModeNum = Math.floor((Math.random() * 3) + 1);
    axios.get(`http://storage.ripple.moe/api/search?amount=100&status=1&offset=${offset}&mode=${randomModeNum}`)
        .then((response) => {
            res.json(response.data.Sets);
        })
        .catch((err) => {
            const status = 400;
            const error = 'Bad Request';
            res.status(400)
                .json({status, error})
        });
};

module.exports = {getInitialBeatmaps};