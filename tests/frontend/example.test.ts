import { describe, it, expect } from 'vitest'
import { validateData } from '../utils/validation'

describe('Frontend Data Validation', () => {
  it('should validate research data format', () => {
    const testData = {
      title: 'Research Project',
      description: 'Description of research',
      methodology: 'Scientific method used',
      results: 'Research results'
    }
    expect(validateData(testData)).toBe(true)
  })
})
