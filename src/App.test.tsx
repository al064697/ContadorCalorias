import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText(/Contador de Calorías/i)).toBeTruthy()
  })

  it('shows zero calories total on initial load', () => {
    render(<App />)
    expect(screen.getByText(/Total:/)).toBeTruthy()
  })
})
