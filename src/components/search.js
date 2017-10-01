import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class Search extends Component {
    // Responsible for calling the action creators to clear all the beatmaps
    // and for grabbing the new beatmaps
    handleFormSubmit({ query, status, mode, keys }) {
        if (query == undefined) return;
        if (status == undefined) status = 'ranked'
        if (mode == undefined) mode = 'osu';
        if (keys == undefined && mode == 'mania') keys = 1;

        this.props.clearBeatmapsBeforeSearch();
        this.props.getNewBeatmaps({ query, status, mode, keys });
    }

    // Conditionally renders the mania key count select field
    // based on if the user has selected "mania"
    renderManiaSelect() {
        const { handleSubmit, fields: { query, status, mode, keys }} = this.props;

        if (mode.value == 'mania') {
            return (
                <div className="row">
                    <fieldset className="form-group col-md-4 col-md-offset-4">
                        <label><i className="fa fa-keyboard-o"></i> Key Count</label>
                        <select {...keys} className="form-control">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </fieldset>
                </div>
            );
        }
    }
    
    // Conditionally renders a search result
    // that being either a success or an error
    renderSearchResult() {
        // Display success message.
        if (this.props.newBeatmaps && this.props.newBeatmaps.beatmaps.length > 0 && !this.props.initialBeatmaps) {
            console.log(this.props.newBeatmaps);
            return (
                <div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="alert-message alert-message-success">
                                <h4>Success: {this.props.newBeatmaps.beatmaps.length} beatmap(s) were found.</h4>
                                <p>You've found <strong>{this.props.newBeatmaps.beatmaps.length}</strong> beatmaps. Now get to downloading!</p>
                                <p>Feel free to request any features or report any issues on <a href="https://github.com/Swan/Eggplants" target="_blank">Github.</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            );         
        // Display error message.
        } else if (this.props.newBeatmaps && this.props.newBeatmaps.beatmaps.length == 0 && !this.props.initialBeatmaps) {
            return (
                <div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="alert-message alert-message-danger">
                                <h4>Error: No Beatmaps Found</h4>
                                <p>Unfortunately there weren't any beatmaps found.</p>
                                <p>Feel free to request any features or report any issues on <a href="https://github.com/Swan/Eggplants" target="_blank">Github.</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
            
    }

    render() {
        const { handleSubmit, fields: { query, status, mode, keys }} = this.props;

        return (
            <div className="eggplants-search">
                <div className="container-fluid">
                    <div className="eggplants-search-info">
                        <h2><i className="fa fa-search"></i> Search For Beatmaps</h2>
                        <h4>It's extremely easy to start finding osu! beatmaps to download.</h4>
                        <h4>Just enter in a search query, and click the purple button.</h4>
                        <h4>You can create shareable beatmap links by using:</h4>
                        <h5>- https://osu.eggplants.org/s/:id</h5>
                        <h5>- https://osu.eggplants.org/b/:id</h5>
                    </div>

                    <div className="container">
                        {this.renderSearchResult()}
                    </div>

                    <div className="eggplants-search-form">
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <fieldset className="form-group col-md-4">
                                <label><i className="fa fa-search"></i> Search Query</label>
                                <input {...query} type="text" className="form-control" placeholder="Search for a beatmap" required/>
                            </fieldset>

                            <fieldset className="form-group col-md-4">
                                <label><i className="fa fa-star"></i> Ranked Status</label>
                                <select {...status} className="form-control">
                                    <option value="ranked">Ranked</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="loved">Loved</option>
                                    <option value="all">All</option>
                                </select>
                            </fieldset>

                            <fieldset className="form-group col-md-4">
                                <label><i className="fa fa-star"></i> Game Mode</label>
                                <select {...mode} className="form-control">
                                    <option value="osu">osu!</option>
                                    <option value="taiko">Taiko</option>
                                    <option value="ctb">Catch The Beat</option>
                                    <option value="mania">Mania</option>
                                </select>
                            </fieldset>   

                            {this.renderManiaSelect()}

                            <br/>
                            <div className="center-button" >
                                <button type="submit" className="btn btn-eggplants"><i className="fa fa-search"></i> Search For Beatmaps!</button> 
                                <h6>Made with 🍆</h6>    
                            </div>                                               
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        newBeatmaps: state.beatmapData.newBeatmaps,
        initialBeatmaps: state.beatmapData.initialBeatmaps
    }
};

export default reduxForm({
    form: 'search',
    fields: ['query', 'status', 'mode', 'keys']
}, mapStateToProps, actions)(Search);
