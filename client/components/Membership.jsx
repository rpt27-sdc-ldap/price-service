import React from 'react';

const Membership = () => (
  <div id='membership'>
    <div id='premiumPlus' className='priceTitle'>
      Included with <strong>premiumPlus</strong>
    </div>
    <div id='memberBenefites' className='priceBody'>
      <ul>
        <li>1 audiobook of your choice.</li>
        <li>Stream or download thousands of included titles.</li>
        <li>$14.95 a month after 30 day trial. Cancel anytime.</li>
      </ul>
    </div>
    <button className='priceButton' id='memberEnroll'>Continue for free</button>
  </div>
);

export default Membership;