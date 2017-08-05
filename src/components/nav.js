import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <nav id="eggplants-nav" className="navbar navbar-inverse">
                <div className="container">

                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-3">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">🍆 EGGPLANTS</a>
                    </div>
                

                    <div className="collapse navbar-collapse" id="navbar-collapse-3">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/"><i className="fa fa-home"></i> Home</a></li>
                            <li><a href="https://juicy.eggplants.org" target="_blank"><i className="fa fa-upload"></i> File Hosting</a></li>
                            <li><a href="https://osu.ppy.sh" target="_blank"><i className="fa fa-music"></i> osu!</a></li>
                            <li><a href="https://ripple.moe" target="_blank"><i className="fa fa-circle"></i> Ripple</a></li>
                            <li><a href="https://github.com/Swan/Eggplants" target="_blank"><i className="fa fa-github"></i> Github</a></li>
                            <li><a href="https://twitter.com/lmaoswan" target="_blank"><i className="fa fa-envelope"></i> Twitter</a></li>
                            <li><a href="mailto:the@swan.moe" target="_blank"><i className="fa fa-envelope"></i> Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>      
        );
    }
}

export default Nav;