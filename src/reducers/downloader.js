import { CHECK_VALID_MAP } from "../actions/types"

export default function(state = {}, action) {
    switch (action.type) {
        case CHECK_VALID_MAP:
            return { ...state, isValidMap: action.payload};
        default:
            return state;
    }
}