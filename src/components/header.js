import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="cover container-fluid">
                <br/>
                <h2>🍆 EGGPLANTS</h2>
                <h3><i className="fa fa-music"></i> Beatmap Listing</h3>
                <h4>Here, you can search for osu! beatmaps to download.</h4>
                <h4>All you have to do is search, and then start downloading. It's that simple.</h4>
                <h4>You don't have to be logged into the osu! website or deal with slow download speeds to use this service!</h4>
            </div>
        );
    }
}

export default Header;