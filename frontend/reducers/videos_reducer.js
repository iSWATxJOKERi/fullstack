import { RECEIVE_VIDEOS, RECEIVE_VIDEO, REMOVE_VIDEO } from '../actions/video_actions';

const videosReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_VIDEOS:
            let newstate = Object.assign({}, state);
            action.videos.map(video => {
                newstate[video.id] = video
            })
            return newstate
        case RECEIVE_VIDEO:
            return Object.assign({}, state, { [action.video.id]: action.video })
        case REMOVE_VIDEO:
            let ns = Object.assign({}, state);
            delete ns[action.id];
            return ns;
        default:
            return state;
    }
}

export default videosReducer;