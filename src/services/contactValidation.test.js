import { describe, it, expect } from 'vitest'
import { validateForm } from './contactValidation.js'

const validValues = {
  name: 'João Pedro',
  email: 'joao@gmail.com',
  subject: 'Contato profissional',
  message: 'Gostaria de conversar sobre uma oportunidade.',
}

describe('Validação do formulário de contato', () => {
  it('deve aceitar todos os campos preenchidos corretamente', () => {
    const result = validateForm(validValues)

    expect(result).toEqual({})
  })

  it('deve exigir o nome', () => {
    const result = validateForm({
      ...validValues,
      name: '',
    })

    expect(result.name).toBe('Informe seu nome.')
  })

  it('deve rejeitar um e-mail inválido', () => {
    const result = validateForm({
      ...validValues,
      email: 'email-invalido',
    })

    expect(result.email).toBe('Digite um e-mail válido.')
  })

  it('deve exigir o assunto', () => {
    const result = validateForm({
      ...validValues,
      subject: '',
    })

    expect(result.subject).toBe('Informe o assunto.')
  })

  it('deve exigir uma mensagem com pelo menos 20 caracteres', () => {
    const result = validateForm({
      ...validValues,
      message: 'Mensagem curta',
    })

    expect(result.message).toBe(
      'A mensagem precisa ter pelo menos 20 caracteres.',
    )
  })

  it('deve rejeitar campos preenchidos somente com espaços', () => {
    const result = validateForm({
      name: '   ',
      email: 'joao@gmail.com',
      subject: '   ',
      message: '                    ',
    })

    expect(result.name).toBe('Informe seu nome.')
    expect(result.subject).toBe('Informe o assunto.')
    expect(result.message).toBe(
      'A mensagem precisa ter pelo menos 20 caracteres.',
    )
  })

  it('deve aceitar uma mensagem com exatamente 20 caracteres', () => {
    const result = validateForm({
      ...validValues,
      message: '12345678901234567890',
    })

    expect(result.message).toBeUndefined()
  })
})