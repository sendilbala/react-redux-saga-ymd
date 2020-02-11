import React from 'react';
import {mount} from 'enzyme';

import Footer from '../Footer';

function setup() {
  return mount(<Footer />);
}

describe('Footer', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
