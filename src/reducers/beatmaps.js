import { GET_INITIAL_BEATMAPS, GET_NEW_BEATMAPS, CLEAR_BEATMAPS_BEFORE_SEARCH } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case GET_INITIAL_BEATMAPS:
            return { ...state, initialBeatmaps: action.payload};
        case GET_NEW_BEATMAPS:
            return { ...state, newBeatmaps: action.payload};
        case CLEAR_BEATMAPS_BEFORE_SEARCH:
            return { ...state, initialBeatmaps: action.payload, newBeatmaps: action.payload }
        default:
            return state;
    }
}