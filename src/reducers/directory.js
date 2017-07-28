import { REQUEST_DIRECTORY, RECEIVE_DIRECTORY, initialData } from '../actions/directory'
import _ from 'lodash';

// Reducer for app info
const getDirectory = (state = initialData, action) => {
    switch (action.type) {
        case REQUEST_DIRECTORY:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_DIRECTORY:
            return Object.assign({}, state, {
                isFetching: false,
                storages: action.directory,
                parents: _.uniq(_.map(action.directory, (node)=>node.contact[1].xpub))
            });
        default:
            return state;
    }
}

const directory = (state = initialData, action) => {
    switch (action.type) {
        case REQUEST_DIRECTORY:
        case RECEIVE_DIRECTORY:
            return Object.assign({}, state, getDirectory(undefined, action));
        default:
            return state;
    }
}

export default directory;