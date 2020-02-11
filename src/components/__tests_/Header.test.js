import React from 'react';
import {mount} from 'enzyme';


import Header from '../Header';

const mockDispatch = jest.fn();

function setup() {
  const props = {
    app: {},
    dispatch: mockDispatch,
    location: {
      pathname: '/',
    },
  };

  return mount(<Header suppressClassNameWarning {...props} />);
}

describe('Header', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  
});
