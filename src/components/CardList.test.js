import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CardList from './CardList';

it('Expect to render CardList component', () => {
    const mockRobots = [
        {
            id: 1,
            name: 'John Snow',
            email: 'john@gmail.com'
        }
    ];
    expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot();
});