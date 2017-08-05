import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import BeatmapsReducer from './beatmaps';
import DownloaderReducer from './downloader';

const rootReducer = combineReducers({
    beatmapData: BeatmapsReducer,
    downloader: DownloaderReducer,
    form: reduxFormReducer
});

export default rootReducer;
