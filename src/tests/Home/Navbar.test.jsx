import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';

import NavBar from '../../components/Home/Navbar.component';

describe('<NavBar /> rendering', () => {
  const { container } = render(<NavBar />);
  const navBar = container.querySelector('div > div');

  test('should render navbar with styles correctly', () => {
    expect(navBar).toHaveStyle(`background-color: #1c5476`);
    expect(navBar).toHaveStyle(`height: 4rem`);
  });

  test('should render sign in button correctly', () => {
    const signInButton = navBar.querySelector('button');
    expect(signInButton).toBeTruthy();
  });

  test('should render home button correctly', () => {
    const homeButton = navBar.querySelector('svg');

    expect(homeButton).toBeTruthy();
    expect(homeButton).toHaveStyle('font-size: 2rem');
    expect(homeButton).toHaveStyle('margin: 0px 2rem 0px 1.8rem');
    expect(homeButton).toHaveStyle('cursor: pointer;');
  });

  test('should render search input correctly', () => {
    const searchInput = navBar.querySelector('input');
    expect(searchInput).toBeTruthy();
    expect(searchInput.placeholder).toEqual('Search...');
  });

  test('should render toggle button correctly', () => {
    const toggleButton = navBar.querySelector('label');

    expect(toggleButton).toBeTruthy();
    expect(toggleButton.children[1]).toHaveTextContent('Dark mode');
  });

  test('should change input value', () => {
    const searchInput = navBar.querySelector('input');

    fireEvent.change(searchInput, { target: { value: 'testing' } });
    expect(searchInput.value).toBe('testing');
  });
});
