import { describe, it, expect } from 'vitest'
import { validateTransaction } from '../utils/blockchain'

describe('Smart Contract Tests', () => {
  it('should validate token transaction', () => {
    const transaction = {
      from: '0x123...',
      to: '0x456...',
      amount: 100,
      timestamp: Date.now()
    }
    expect(validateTransaction(transaction)).toBe(true)
  })
})
