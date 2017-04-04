# Redux-loading-reducer
A simple function (reducer) that changes custom state flag.
The main purpose is to change a flag, such as `isLoading`, by given arrays of `loading` action names and `not-loading` action names.
Reducer is curried, so some args can be passed before.

# Usage
```javascript
import makeLoadingReducer from 'redux-loading-reducer';

const loadingActions = [
  'FIRST_LOADING_ACTION'
  'SECOND_LOADING_ACTION'
];

const notLoadingActions = [
  'ONLY_NOT_LOADING_ACTION'
];

const reducerWrapper = makeLoadingReducer('myCustomStateKeyName', loadingActions, notLoadingActions);

const myReducer = reducerWrapper((state, action) => {
  // handling my own actions
};
```
# Arguments

| Name  | Type | Purpose |
| ------------- | ------------- | ------------- |
| stateBranchKeyName  |  `string`  | *Required.* Key name that can be seen in state branch  |
| loadingActionNames  | `array`  | *Required.* Array of loading-like action names, that Loading Reducer will look for changing flag to *true* |
| notLoadingActionNames  | `array`  | *Required.* Array of not loading-like action names, that Loading Reducer will look for changing flag to *false* |
| reducer  | `function`  | *Required.* Reducer to be wrapper |

# Other
Otherwise, this function be used for change any custom flag, like `isLogged`, etc. Let treat then this with your own way.
