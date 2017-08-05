import axios from 'axios';
import { GET_INITIAL_BEATMAPS, CHECK_VALID_MAP, GET_NEW_BEATMAPS, CLEAR_BEATMAPS_BEFORE_SEARCH } from "./types";

const ROOT_URL = `https://api.eggplants.org/api`;

// Responsible for reaching out to the local API and grabbing 100 initial beatmaps.
// These beatmaps are random in the sense that they can be from game modes 0-3. 
// They'll be displayed to the user upon first loading the page.
export function getInitialBeatmaps(offset = 0) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/initialbeatmaps?offset=${offset}`)
            .then((response) => {
                dispatch({ type: GET_INITIAL_BEATMAPS, payload: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// Responsible for reaching out to the local API and checking if the beatmap
// we have entered is a set first off, and if it's a valid beatmap.
// This function is used when downloading shareable beatmap links
export function checkValidMap({ isBeatmapSet, id }) {
    return function(dispatch) {
        const beatmapSetOrIdText = (isBeatmapSet) ? 's' : 'b';

        axios.get(`${ROOT_URL}/${beatmapSetOrIdText}/${id}`)
            .then((response) => {
                dispatch({ type: CHECK_VALID_MAP, payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: CHECK_VALID_MAP, payload: false });
            })
    }
}

// Responsible for reaching out to the local API and getting a list of
// new beatmaps. These beatmaps will be displayed to the user.
export function getNewBeatmaps({ query, status, mode, keys }) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/search?query=${query}&status=${status}&mode=${mode}&keys=${keys}`)
            .then((response) => {
                // Here, we'll create a new variable on the beatmaps object named "beatmaps" instead of "sets"
                // This way it will be consistent with the initialBeatmaps, so we can render them on the screen
                // in a DRY way.
                let returnedData = response.data;
                response.data.beatmaps = response.data.sets;

                dispatch({ type: GET_NEW_BEATMAPS, payload: response.data });
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: GET_NEW_BEATMAPS, payload: [] });
            })
    }
}


// Responsible for dispatching a payload of undefined, so that we can clear
// the searched beatmaps and initial beatmaps. This is usually done before a search
// So that we can properly display the loading animation
export function clearBeatmapsBeforeSearch() {
    return function(dispatch) {
        dispatch({ type: CLEAR_BEATMAPS_BEFORE_SEARCH, payload: undefined });
    }
}