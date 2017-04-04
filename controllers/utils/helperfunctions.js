const express = require('express');

// If beatmap could not be downloaded
let showJsonError = (req, res) => {
     res
        .status(404)
        .json({
            status: 404,
            error: "The beatmap you are trying to download could not be found."
        });
}

let downloadBeatmap = (req, res, beatmapSetId) => {
    res.redirect('http://storage.ripple.moe/' + beatmapSetId + ".osz");
}


module.exports = {
    showJsonError,
    downloadBeatmap
};