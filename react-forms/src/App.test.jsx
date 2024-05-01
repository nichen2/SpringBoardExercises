// src/App.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders box form', () => {
    render(<App />);
    const width = screen.getByText(/width/i);
    const height = screen.getByText(/height/i);
    expect(width).toBeInTheDocument();
    expect(height).toBeInTheDocument();
  });
});
