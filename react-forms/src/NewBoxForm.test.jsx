import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

describe('NewBoxForm Component', () => {
  it('renders without crashing', () => {
    render(<NewBoxForm />);
  });

  it('includes all form fields', () => {
    render(<NewBoxForm />);
    expect(screen.getByLabelText(/width/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/height/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/background color/i)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<NewBoxForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
