// Require Database if Necessary

// Create Empty Eggplants Object
var eggplants = {};


// Easter Egg
eggplants.peppy = function(req, res) {

    res
        .status(200)
        .json({
            status: 200,
            name: "Dean Herbert",
            alias: "Peppy",
            description: "Lord and savior of the circle punching game called osu! If you've made it here, you are a champion."
        });
}


// Export
module.exports = eggplants;