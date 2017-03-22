// If beatmap could not be downloaded
module.exports.showJsonError = (req, res) => {
     res
        .status(404)
        .json({
            status: 404,
            error: "The beatmap you are trying to download could not be found."
        });
}

// If invalid direct link
module.exports.jsonNotValidLink = (req, res) => {
    res
        .status(404)
        .json({status: 404, error: "The link you have entered is not valid."})   
}

// Download Beatmap
module.exports.downloadBeatmap = (req, res, beatmapSetId) => {
    res.redirect('http://storage.ripple.moe/' + beatmapSetId + ".osz");
}
