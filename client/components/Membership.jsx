import React from 'react';

const Membership = () => (
  <div id='membership'>
    <div id='premiumPlus' className='priceBody'>
      Included with <span id='premium'>premium</span><span id='plus'>plus</span>
    </div>
    <div id='memberBenefits' className='priceBody'>
      You'll have access to these benefits
      <ul>
        <li>1 audiobook of your choice.</li>
        <li>Stream or download thousands of included titles.</li>
        <li>$14.95 a month after 30 day trial. Cancel anytime.</li>
      </ul>
    </div>
    <button className='priceButton priceBody' id='memberEnroll'>Continue for free</button>
  </div>
);

export default Membership;