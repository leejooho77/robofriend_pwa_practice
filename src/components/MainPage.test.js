import React from 'react';
import { shallow } from 'enzyme';
import MainPage from './MainPage';

let wrapper;
let wrapper2;
let wrapper3;

beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false
    }
    wrapper = shallow(<MainPage { ...mockProps }/>);
})

describe('Render MainPage', () => {
    test('Expect to render MainPage', () => {
        expect(wrapper).toMatchSnapshot();
    })
})

describe('Testing FilterRobot function', () => {
    beforeEach(() => {
        const mockProps2 = {
            onRequestRobots: jest.fn(),
            robots: [
                {
                    id: 3,
                    name: 'John',
                    email: 'john@gmail.com'
                }
            ],
            searchField: 'John',
            isPending: false
        }
        wrapper2 = shallow(<MainPage { ...mockProps2 } />);

        const mockProps3 = {
            onRequestRobots: jest.fn(),
            robots: [
                {
                    id: 3,
                    name: 'John',
                    email: 'john@gmail.com'
                }
            ],
            searchField: 'a',
            isPending: false
        }
        wrapper3 = shallow(<MainPage { ...mockProps3 } />);
    })

    test('FilterRobot should return empty array', () => {
        expect(wrapper.instance().filterRobots()).toEqual([]);
    })
    
    test('FilterRobot should return array with John', () => {
        expect(wrapper2.instance().filterRobots()).toEqual([
            {
                id: 3,
                name: 'John',
                email: 'john@gmail.com'
            }
        ]);
    })
    
    test('FilterRobot should return empty array when there is no match', () => {
        expect(wrapper3.instance().filterRobots()).toEqual([]);
    })
})
