import React from 'react';
import { shallow, render } from 'enzyme';
import PriceButton from '../client/components/PriceButton.jsx';

describe('PriceButton', () => {
  it('should render component', () => {
    const component = shallow(<PriceButton />);

    expect(component.getElements()).toMatchSnapshot();
  });

  it('should render price when passed in props', () => {
    const priceButtonProps = {
      price: 36.00
    };
    const component = shallow(<PriceButton {...priceButtonProps}/>);

    expect(component.text()).toContain([priceButtonProps.price].toString());
  });
});