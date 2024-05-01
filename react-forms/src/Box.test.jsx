import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Box from './Box';

describe('Box Component', () => {
  it('renders without crashing', () => {
    render(<Box width="100px" height="100px" backgroundColor="red" />);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Box width="100px" height="100px" backgroundColor="red" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
