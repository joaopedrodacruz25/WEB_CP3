import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Send } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { supabase } from '../services/supabase.js'
import { validateForm } from '../services/contactValidation.js'

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}



export default function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')
  const [noticeType, setNoticeType] = useState('success')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setNotice('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (isSubmitting) return

    const nextErrors = validateForm(values)
    setErrors(nextErrors)
    setNotice('')

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)

    const messageData = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    }

    try {
      const { error: databaseError } = await supabase
        .from('contact_messages')
        .insert(messageData)

      if (databaseError) {
        throw databaseError
      }

      // A mensagem já está salva no Supabase. Agora tentamos enviar o e-mail.
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      setValues(initialValues)
      setErrors({})

      if (!serviceId || !templateId || !publicKey) {
        setNoticeType('success')
        setNotice(
          'Sua mensagem foi salva com sucesso. O envio por e-mail será ativado quando configurarmos o EmailJS.'
        )
        return
      }

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: messageData.name,
            from_email: messageData.email,
            reply_to: messageData.email,
            subject: messageData.subject,
            message: messageData.message,
          },
          publicKey
        )

        setNoticeType('success')
        setNotice('Mensagem enviada e registrada com sucesso. Obrigado pelo contato!')
      } catch (emailError) {
        console.error('Erro ao enviar o e-mail de contato:', emailError)
        setNoticeType('error')
        setNotice(
          'Sua mensagem ficou salva no painel, mas a notificação por e-mail não foi enviada. Não precisa enviar novamente.'
        )
      }
    } catch (databaseError) {
      console.error('Erro ao salvar a mensagem no Supabase:', databaseError)
      setNoticeType('error')
      setNotice('Não foi possível salvar sua mensagem. Confira a conexão e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-section container contact-page">
      <SectionHeading
        eyebrow="CONTATO"
        title="Vamos conversar?"
        description="Preencha o formulário para entrar em contato comigo. Todos os campos são obrigatórios."
      />

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label>
            Nome
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Seu nome"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <small id="name-error" className="field-error">{errors.name}</small>}
          </label>

          <label>
            E-mail
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="voce@email.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <small id="email-error" className="field-error">{errors.email}</small>}
          </label>
        </div>

        <label>
          Assunto
          <input
            name="subject"
            value={values.subject}
            onChange={handleChange}
            placeholder="Sobre o que gostaria de conversar?"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && <small id="subject-error" className="field-error">{errors.subject}</small>}
        </label>

        <label>
          Mensagem
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            rows="6"
            placeholder="Escreva sua mensagem (mínimo de 20 caracteres)"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && <small id="message-error" className="field-error">{errors.message}</small>}
        </label>

        {notice && (
          <p className={`notice ${noticeType === 'error' ? 'notice-error' : 'notice-success'}`} role="status">
            {notice}
          </p>
        )}

        <button
          className="button button-primary submit-button"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true" /> Enviando...
            </>
          ) : (
            <>
              <Send size={17} /> Enviar mensagem
            </>
          )}
        </button>
      </form>

      <p className="contact-note">
        <Mail size={16} /> Suas informações serão utilizadas apenas para responder ao seu contato.
      </p>
    </section>
  )
}
