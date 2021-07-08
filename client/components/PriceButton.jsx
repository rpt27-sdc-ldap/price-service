/* eslint-disable react/prop-types */
import React from 'react';

const PriceButton = (props) => {
  console.log('props', props)
  return (
  //console.log('props', props)
  <div id='price'>
    <button className='priceButton' id='bookBuy'>Buy for ${props.price ? props.price : ''}</button>
  </div>
)};

export default PriceButton;