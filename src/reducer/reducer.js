import curry from 'lodash/curry';
import { Iterable, Record } from 'immutable';
import errorHandler from '../errorHandler';

const getNoKeyError = keyName => new Error(`There is no ${keyName} key in your state branch. The new one will be set`);

export default curry((keyName, loadingActions, notLoadingActions, reducer) => (state, action) => {
    const possibleError = errorHandler(keyName, loadingActions, notLoadingActions, reducer);
    if (possibleError instanceof Error) {
        console.error(possibleError);
        return;
    }

    const includesLoadingAction = loadingActions.includes(action.type);
    const includesNotLoadingAction = notLoadingActions.includes(action.type);

    if (Iterable.isIterable(state) || state instanceof Record) {

        if (!state.has(keyName)) {
            console.error(getNoKeyError(keyName));
        }

        state = includesLoadingAction ? state.set(keyName, true) : state;
        state = includesNotLoadingAction ? state.set(keyName, false) : state;
    } else if (typeof(state) === 'object') {

        if (!state.hasOwnProperty(keyName)) {
            console.error(getNoKeyError(keyName));
        }

        state = includesLoadingAction ? state[keyName] = true : state;
        state = includesNotLoadingAction ? state[keyName] = false : state;
    } else {
        console.error('State branch should be an instance of either Object or Immutable.Iterable');
        return;
    }

    return reducer(state, action);
})
