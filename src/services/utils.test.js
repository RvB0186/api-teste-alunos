import { describe, it, expect } from 'vitest';
import { isValidEmail } from './utils.js';

describe('Validação de Email', () => {
  it('deve retornar true para um email válido', () => {
    const email = 'teste@exemplo.com';
    expect(isValidEmail(email)).toBe(true);
  });

  it('deve retornar false para um email sem @', () => {
    const email = 'teste.com';
    expect(isValidEmail(email)).toBe(false);
  });
});