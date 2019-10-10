import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
   } from './constants'
import * as actions from './actions';

const mockStore = configureMockStore([thunkMiddleware]);

describe('TEST ACTIONS: setSearchField', () => {
    test('Handle undefined', () => {
        const text = undefined;
        const expected = {
            type: CHANGE_SEARCHFIELD,
            payload: undefined
        }
        expect(actions.setSearchField(text)).toEqual(expected)
    })

    test('Successfully set searchfield with given text', () => {
        const text = 'test';
        const expected = {
            type: CHANGE_SEARCHFIELD,
            payload: 'test'
        }
        expect(actions.setSearchField(text)).toEqual(expected)
    });
});

describe('TEST ACTIONS: requestRobots', () => {
    afterEach(() => {
        fetchMock.restore();
    })

    test('Handle pending request robots API', () => {
        const store = mockStore();
        store.dispatch(actions.requestRobots());
        const action = store.getActions();
        const expected = {
            type: REQUEST_ROBOTS_PENDING
        }
        expect(action[0]).toEqual(expected)
    })

    test('Handle success request robots API', () => {
        const store = mockStore();
        const mockResponse = [
            {
                id: 1,
                name: 'Lionel Messi',
                email: 'lmessi10@gmail.com'
            }
        ];
        fetchMock.getOnce('https://jsonplaceholder.typicode.com/users', {
            body: mockResponse,
            headers: { 'content-type': 'application/json' }
        });
        const expected = [
            { type: REQUEST_ROBOTS_PENDING },
            { type: REQUEST_ROBOTS_SUCCESS, payload: mockResponse }
        ];
        store.dispatch(actions.requestRobots()).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    })

    test('Handle failed request robots API', () => {
        const store = mockStore();
        const mockResponse = 'Error occurred';
        fetchMock.getOnce('https://jsonplaceholder.typicode.com/users', {
            throws: 'Error occurred'
        });
        const expected = [
            { type: REQUEST_ROBOTS_PENDING },
            { type: REQUEST_ROBOTS_FAILED, payload: mockResponse }
        ];
        store.dispatch(actions.requestRobots()).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    })
});

