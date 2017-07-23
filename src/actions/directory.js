import axios from 'axios';

// Async action for getting app info from server.
export const initialData = { "isFetching": false, storages: [] }
export const REQUEST_DIRECTORY = 'REQUEST_DIRECTORY';
export const RECEIVE_DIRECTORY = 'RECEIVE_DIRECTORY';

export const requestDirectory = () => {
    return {
        type: REQUEST_DIRECTORY
    }
}

export const receiveDirectory = (directory) => {
    return {
        type: RECEIVE_DIRECTORY,
        directory
    }
}

const directoryUrl = 'https://directory.orc.network';
// const directoryUrl = 'http://localhost:3000/directory';

function fetchDirectory() {
    return dispatch => {
        dispatch(requestDirectory())
        return axios.get(directoryUrl)
            .then(response => response.status === 200 ? response.data : initialData )
            .then(data => dispatch(receiveDirectory(data)))
    }
}

function shouldFetchDirectory(state) {
    if(state.directory.storages.length === 0) {
        return true;
    } else if (state.directory.isFetching) {
        return false;
    }
}

export function fetchDirectoryIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchDirectory(getState())) {
            return dispatch(fetchDirectory())
        }
    }
}
