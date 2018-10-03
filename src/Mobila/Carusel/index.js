let defaultState = {
    images: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'IMAGES':
            return {
                ...state,
                images: [...state.images, action.images]
            };
        case 'RESET_IMAGES':
            return defaultState;
        default:
            return state
    }
}