'use client'

import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email.'
    }
    if (!values.message.trim()) next.message = 'Tell me a little about it.'
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // Visual only: no message is sent yet.
      setSubmitted(true)
    }
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border border-border/60 bg-card p-8">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-5" />
        </span>
        <h2 className="text-xl font-medium tracking-tight text-foreground">
          Thanks, {values.name.split(' ')[0] || 'there'}.
        </h2>
        <p className="text-pretty text-muted-foreground">
          Your message looks great. This form is a visual demo for now, so
          nothing was sent — but the flow is ready to connect to email whenever
          you are.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setValues({ name: '', email: '', message: '' })
          }}
          className="text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Field label="Name" error={errors.name} htmlFor="name">
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Your name"
          className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
        />
      </Field>

      <Field label="Email" error={errors.email} htmlFor="email">
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
        />
      </Field>

      <Field label="Message" error={errors.message} htmlFor="message">
        <textarea
          id="message"
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell me about your project, timeline, and goals."
          rows={5}
          className="w-full resize-none rounded-md border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
        />
      </Field>

      <button
        type="submit"
        className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Send message
        <ArrowUpRight className="size-4" />
      </button>
    </form>
  )
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string
  error?: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
