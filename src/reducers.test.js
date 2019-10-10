import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
   } from './constants';

import * as reducers from './reducers';

describe('Search Robots', () => {
    const initialStateSearch = {
        searchField: ''
    }

    test('Should return initialState', () => {
        expect(reducers.searchRobots(undefined, {})).toEqual({ searchField: '' });
    })

    test('Should handle CHANGE_SEARCHFIELD action', () => {
        expect(reducers.searchRobots(initialStateSearch, {
            type: CHANGE_SEARCHFIELD,
            payload: 'abc'
        })).toEqual({ searchField: 'abc' });
    })
})

describe('Request Robots', () => {
    const initialStateRobots = {
        robots: [],
        isPending: false
    }

    test('Should return initialState', () => {
        expect(reducers.requestRobots(undefined, {})).toEqual(initialStateRobots);
    })

    test('Should handle REQUEST_ROBOTS_PENDING action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_PENDING
        })).toEqual({  
            robots: [],
            isPending: true
        });
    })

    test('Should handle REQUEST_ROBOTS_SUCCESS action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_SUCCESS,
            payload: [{
                id: 123,
                name: 'test',
                email: 'test@gmail.com'
            }]
        })).toEqual({  
            robots: [{
                id: 123,
                name: 'test',
                email: 'test@gmail.com'
            }],
            isPending: false
        });
    })

    test('Should handle REQUEST_ROBOTS_FAILED action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_FAILED,
            payload: 'Error occurred'
        })).toEqual({ 
            error: 'Error occurred', 
            robots: [],
            isPending: false
        });
    })
})