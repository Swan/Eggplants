import React, { Component } from 'react';
import Beatmaps from './beatmaps';
import Nav from './nav';
import Header from './header';
import Search from './search';

class Homepage extends Component {
    render() {
        return (
            <div className="homepage">
                <Nav />
                <Header />
                <Search />
                <Beatmaps />
            </div>
        );
    }
}

export default Homepage;