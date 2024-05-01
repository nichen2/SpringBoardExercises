import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import BoxList from './BoxList';

describe('BoxList Component', () => {
  it('renders without crashing', () => {
    render(<BoxList />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
