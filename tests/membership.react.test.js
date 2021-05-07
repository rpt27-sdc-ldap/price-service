import React from 'react';
import { shallow } from 'enzyme';
import Membership from '../client/components/Membership.jsx';

describe('Membership', () => {
  it('should render my component', () => {
    const component = shallow(<Membership />);

    expect(component.getElements()).toMatchSnapshot();
  });
});