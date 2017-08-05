import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory } from 'react-router';
import ReactRedirect from 'react-redirect';

class Download extends Component {
    componentWillMount() {
        // We'll run a check here if the URL is a /s/ link, if it isn't then it must be /b/
        const isBeatmapSet = (window.location.href.includes('/s/'));
        // Call the action creator to check if the beatmap is valid.
        this.props.checkValidMap({ isBeatmapSet, id: this.props.params.id });
    }

    render() {
        if (this.props.isValidMap) {
            // If the beatmap is valid, which we've received from our action creator,
            // We check if the beatmap has a property named beatmapSet - Meaning a /s/ link was passed.
            // If not, then it must be a /b/ link which has a ParentSetID -- returned from the Ripple API.
            if (this.props.isValidMap.beatmapSet)
                return window.location = `https://storage.ripple.moe/${this.props.isValidMap.beatmapSet.SetID}.osz`;
            else
                return window.location = `https://storage.ripple.moe/${this.props.isValidMap.beatmap.ParentSetID}.osz`;

            // Just move back to the homepage if it isn't valid.
        } else if (this.props.isValidMap != 'undefined' && this.props.isValidMap == false) {
            browserHistory.push('/');
        }
        return (
            <div id="download-screen">
                <div id="download-screen-loader"></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isValidMap: state.downloader.isValidMap
    }
};

export default connect(mapStateToProps, actions)(Download);