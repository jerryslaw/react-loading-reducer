import curry from 'lodash/curry';
import errorHandler from '../errorHandler';

export default curry((keyName, loadingActions, notLoadingActions, reducer) => (state, action) => {
    const possibleError = errorHandler(keyName, loadingActions, notLoadingActions, reducer);
    if (possibleError instanceof Error) {
        console.error(possibleError);
        return;
    }

    state = loadingActions.includes(action.type) ? state.set(keyName, true) : state;
    state = notLoadingActions.includes(action.type) ? state.set(keyName, false) : state;

    return reducer(state, action);
})
