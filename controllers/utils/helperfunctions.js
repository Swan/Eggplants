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

// If invalid direct link
let jsonNotValidLink = (req, res) => {
    res
        .status(404)
        .json({status: 404, error: "The link you have entered is not valid."})   
}


let downloadBeatmap = (req, res, beatmapSetId) => {
    res.redirect('http://storage.ripple.moe/' + beatmapSetId + ".osz");
}


module.exports = {
    showJsonError,
    jsonNotValidLink,
    downloadBeatmap
};