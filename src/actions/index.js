// Toggle sider action
export const TOGGLE_SIDER = 'TOGGLE_SIDER';
export const toggleSider = () => {
    return {
        type: TOGGLE_SIDER
    }
}

// Action for updating window height for setting min height of content area
export const UPDATE_WINDOW_HEIGHT = 'UPDATE_WINDOW_HEIGHT';
export const updataeWindowHeight = (windowHeight) => {
    return {
        type: UPDATE_WINDOW_HEIGHT,
        windowHeight
    }
}