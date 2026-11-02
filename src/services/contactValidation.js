export function validateForm(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Informe seu nome.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Digite um e-mail válido.'
  }

  if (!values.subject.trim()) {
    errors.subject = 'Informe o assunto.'
  }

  if (values.message.trim().length < 20) {
    errors.message = 'A mensagem precisa ter pelo menos 20 caracteres.'
  }

  return errors
}