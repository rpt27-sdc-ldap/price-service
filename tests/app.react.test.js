import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/app.jsx';
import Membership from '../client/components/Membership.jsx';
import PriceButton from '../client/components/PriceButton.jsx';

describe('App', () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  it('should render my component', () => {
    const component = shallow(<App />);

    expect(component.getElements()).toMatchSnapshot();
  });

  it('should initialize state with currentBook as an empty object', () => {
    const component = shallow(<App />);

    expect(component.state('currentBook')).toBeDefined();
  });

  it('should render Membership and PriceButton components', () => {
    const component = shallow(<App />);
    expect(component.contains(<Membership />)).toBe(true);

    expect(component.contains(<PriceButton />)).toBe(true);
  });

  it('should call componentDidMount', () => {
    const component = shallow(<App />);
    const instance = component.instance();

    jest.spyOn(instance, 'componentDidMount');

    instance.componentDidMount();

    expect(instance.componentDidMount).toHaveBeenCalledTimes(1);

  });

  it('should call setParam', () => {
    const component = shallow(<App />);
    const instance = component.instance();

    jest.spyOn(instance, 'setParam');

    instance.componentDidMount();

    expect(instance.setParam).toHaveBeenCalledTimes(1);
  });

  it('should call getPrice', () => {
    const component = shallow(<App />);
    const instance = component.instance();

    jest.spyOn(instance, 'getPrice');

    instance.componentDidMount();

    expect(instance.getPrice).toHaveBeenCalledTimes(1);
  });


});