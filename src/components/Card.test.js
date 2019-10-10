import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Card from './Card';

it('Expect to render Card component', () => {
    expect(shallow(<Card />)).toMatchSnapshot();
});