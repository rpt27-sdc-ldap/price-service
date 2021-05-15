import React from 'react';

const Membership = () => (
  <div id='membership'>
    <div id='premiumPlus' className='priceBody'>
      Included with <span id='premium'>premium</span><span id='plus'>plus</span>
    </div>
    <button className='priceButton priceBody' id='memberEnroll'>Try for $0.00</button>
    <div id='memberBenefits' className='priceBody'>
      <ul>
        <li>1 audiobook of your choice.</li>
        <li>Stream or download thousands of included titles.</li>
        <li>$14.95 a month after 30 day trial. Cancel anytime.</li>
      </ul>
    </div>
  </div>
);

export default Membership;