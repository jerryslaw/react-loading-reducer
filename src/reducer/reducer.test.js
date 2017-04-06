import noop from 'lodash/noop';
import { Record, Iterable } from 'immutable';
import reducerWrapper from './reducer';

const keyName = 'keyName';
const invalidKeyName = 2;
const actions = ['action_name_1', 'action_name_2'];
const invalidActions = ['action_1', 1, new Function()];

const ACTION_NAME = 'ACTION';
const ACTION = {type: 'ACTION_NAME'};
const STATE = new Record({item: 1});
const reducer = (state = new STATE(), action) => {
    if (action.type === ACTION_NAME) {
        return state;
    }
    return state;
};

describe('Loading reducer test::', () => {
    it('should be a function', () => {
        expect(reducerWrapper instanceof Function).toBeTruthy;
    });
    it('should return function as reducer when all valid arguments are passed', () => {
        const possibleReducer = reducerWrapper(keyName, actions, actions, noop);
        expect(typeof possibleReducer).toBe('function');
    });
    it('should return undefined when some of arguments are invalid', () => {
       const possibleReducer = reducerWrapper(invalidKeyName, actions, invalidActions, noop)(new STATE(), ACTION);
       expect(typeof possibleReducer).toBe('undefined');
    });
    it('should return state branch as object or Immutable.Iterable when valid arguments are passed to returned function', () => {
        const possibleStateBranch = reducerWrapper(keyName, actions, actions, reducer)(new STATE(), ACTION);
        const isObj = typeof possibleStateBranch === 'object';
        const isIterable = Iterable.isIterable(possibleStateBranch);
        const isRecord = possibleStateBranch instanceof Record;
        expect(isObj || isIterable || isRecord).toBeTruthy;
    });
    it('should return state that is equal to previous', () => {
        const nextState = reducerWrapper(keyName, actions, actions, reducer)(new STATE(), ACTION);
        expect(nextState === new STATE()).toBeTruthy;
    })
});
