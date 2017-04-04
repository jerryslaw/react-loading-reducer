import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

const errorPrefix = '(redux-loading-reducer)::';

const ERRORS = {
    INVALID_ARGUMENT: `${errorPrefix} Invalid argument ->`,
    INVALID_ARRAY_ITEM: `${errorPrefix} Invalid array item ->`
};

export default (keyName, loadingActionsNames, notLoadingActionsNames, reducer) => {
    if (!isString(keyName)) {
        return new Error(`${ERRORS.INVALID_ARGUMENT} state branch loading name arg should be a string`);
    }

    if (!isArray(loadingActionsNames)) {
        return new Error(`${ERRORS.INVALID_ARGUMENT} loading actions arg should be an array`);
    } else if (isArray(loadingActionsNames)) {
        for (let i = 0; i < loadingActionsNames.length; i++) {
            if (!isString(loadingActionsNames[i])) {
                return new Error(`${ERRORS.INVALID_ARRAY_ITEM} loading action should be a string`);
            }
        }
    }

    if (!isArray(notLoadingActionsNames)) {
        return new Error(`${ERRORS.INVALID_ARGUMENT} not-loading actions arg should be an array`);
    } else if (isArray(notLoadingActionsNames)) {
        for (let i = 0; i < notLoadingActionsNames.length; i++) {
            if (!isString(notLoadingActionsNames[i])) {
                return new Error(`${ERRORS.INVALID_ARRAY_ITEM} not-loading action should be a string`);
            }
        }
    }

    if (typeof(reducer) !== 'function') {
        return new Error(`${ERRORS.INVALID_ARGUMENT} reducer must be a function`);
    }
}