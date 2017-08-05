import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Beatmaps extends Component {
    componentWillMount() {
        this.props.getInitialBeatmaps();
    }

    // Here, since the beatmaps weren't grabbed from the API yet,
    // we'll want to issue a loading screen.
    renderLoader() {
        if (!this.props.initialBeatmaps && !this.props.newBeatmaps) return <div className="loader"></div>;
    }

    renderVideoStatus(beatmap) {
        if (!beatmap.HasVideo) return <div><span className="badge pull-right no-video"><i className="fa fa-video-camera"></i> No Video</span></div>;
        if (beatmap.HasVideo) return <div><span className="badge pull-right has-video"><i className="fa fa-video-camera"></i> Video</span></div>;
    }

    renderRankedStatus(beatmap) {
        switch (beatmap.RankedStatus) {
            case -1:
            case -2:
            case 0:
                return <div><span className="badge pull-right unranked"><i className="fa fa-thumbs-up"></i> Unranked</span></div>;
            case 1:
            case 2: 
                return <div><span className="badge pull-right ranked"><i className="fa fa-thumbs-up"></i> Ranked</span></div>;
            case 3:
                return <div><span className="badge pull-right qualified"><i className="fa fa-thumbs-up"></i> Qualified</span></div>;
            case 4:
                return <div><span className="badge pull-right loved"><i className="fa fa-thumbs-up"></i> Loved</span></div>;
        }
    }

    renderBeatmaps() {
        const renderedBeatmaps = (this.props.newBeatmaps) ? this.props.newBeatmaps: this.props.initialBeatmaps;

        // When the page first loads, here we'll render the list of 100 beatmaps        
        if (renderedBeatmaps && renderedBeatmaps.beatmaps.length > 0) {
            return (
                renderedBeatmaps.beatmaps.map((beatmap) => {
                    return (
                        <div key={beatmap.SetID} className="col-xs-12 col-sm-12 col-lg-3">
                            <div className="thumbnail thumby">
                                <a href={`http://eggplants.org/s/${beatmap.SetID}`} target="_blank">
                                <img className="thumb-img" src={`https://assets.ppy.sh//beatmaps/${beatmap.SetID}/covers/cover.jpg?1486129185`} />
                                </a>

                                <div className="caption">
                                    <h4 className="thumby-caption">{beatmap.Artist} - {beatmap.Title}</h4>
                                    <a href={`https://osu.ppy.sh/u/${beatmap.Creator}`} className="pull-left">{beatmap.Creator}</a>

                                    {this.renderVideoStatus(beatmap)}
                                    {this.renderRankedStatus(beatmap)}
                                    
                                    <span className="badge pull-right favourites"><i className="fa fa-heart"></i> {beatmap.Favourites}</span>  

                                    <br/><br/>
                                    
                                    <a href={`http://eggplants.org/s/${beatmap.SetID}`} target="_blank" className="btn btn-default btn-xs pull-right" role="button"><i className="fa fa-download"></i></a>
                                    <a href={`http://eggplants.org/s/${beatmap.SetID}`} target="_blank" className="btn btn-info btn-xs download-button" role="button">Download</a> 
                                    <a href={`http://osu.ppy.sh/s/${beatmap.SetID}`} target="_blank" className="btn btn-danger btn-xs" role="button">View on osu!</a>                           
                                </div>                                             
                            </div>
                        </div>
                    );                 
                })
            );
        }
    }

    render() {
        // NOTES FOR THE FUTURE:
        // We also want to take into consideration that we'll have "searchedBeatmaps" as well
        // We don't want to show the initialBeatmaps if the searchedBeatmaps array is populated.
        return (
            <div>
                <div className="eggplants-beatmaps">
                    {this.renderLoader()}

                    <div className="container-fluid">
                        {this.renderBeatmaps()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        initialBeatmaps: state.beatmapData.initialBeatmaps,
        newBeatmaps: state.beatmapData.newBeatmaps
    }
};

export default connect(mapStateToProps, actions)(Beatmaps);