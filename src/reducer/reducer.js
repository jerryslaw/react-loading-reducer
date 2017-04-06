import curry from 'lodash/curry';
import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import { isImmutable } from 'immutable';

import errorHandler from '../errorHandler';

const getNoKeyError = keyName => new Error(`There is no ${keyName} key in your state branch. The new one will be set`);

export default curry((keyName, loadingActions, notLoadingActions, reducer) => (state, action) => {
    const possibleError = errorHandler(keyName, loadingActions, notLoadingActions, reducer);
    if (possibleError instanceof Error) {
        console.error(possibleError);
        return;
    }

    let newState;

    const includesLoadingAction = loadingActions.includes(action.type);
    const includesNotLoadingAction = notLoadingActions.includes(action.type);

    if (isImmutable(state)) {
        //handle Immutable state

        if (!state.has(keyName)) {
            console.error(getNoKeyError(keyName));
        }

        if (includesLoadingAction) {
            newState = state.set(keyName, true);
        } else if (includesNotLoadingAction) {
            newState = state.set(keyName, false);
        } else {
            newState = state;
        }
    } else if (isObject(state)) {
        // handle non-Immutable state

        newState = cloneDeep(state);

        if (!state.hasOwnProperty(keyName)) {
            console.error(getNoKeyError(keyName));
            //set key if it doesn't exist
            newState[keyName] = false;
        }

        if (includesLoadingAction) {
            newState[keyName] = true;
        } else if (includesNotLoadingAction) {
            newState[keyName] = false;
        }
    } else {
        newState = cloneDeep(state);
    }

    return reducer(newState, action);
})
