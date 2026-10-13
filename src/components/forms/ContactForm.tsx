'use client'

import { useState, type FormEvent } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { useApp } from '@/components/providers/AppProvider'
import { Button } from '@/components/ui/Button'
import { sendContactMessage } from '@/lib/api/contact'
import { validateContact } from '@/lib/validation'
import { fmt } from '@/lib/utils'

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }
type Values = typeof EMPTY

export function ContactForm() {
  const { t } = useApp()
  const f = t.contact.form
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const [sentName, setSentName] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validateContact(values, t.errors)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStatus('sending')
    try {
      await sendContactMessage(values)
      setSentName(values.name.trim())
      setValues(EMPTY)
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-md bg-chalk-100 p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-zellige text-chalk"><Check className="h-5 w-5" aria-hidden /></span>
        <h3 className="mt-5 font-display text-3xl font-light">{f.successTitle}</h3>
        <p className="mt-2 text-mute">{fmt(f.successBody, { name: sentName })}</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>{f.again}</Button>
      </div>
    )
  }

  const field = (key: keyof Values, label: string, opts: { type?: string; autoComplete?: string; multiline?: boolean } = {}) => {
    const id = `c-${key}`
    const err = errors[key]
    const common = {
      id, name: key, value: values[key], className: 'field',
      onChange: (e: { target: { value: string } }) => setValues((v) => ({ ...v, [key]: e.target.value })),
      'aria-invalid': err ? (true as const) : undefined,
      'aria-describedby': err ? `${id}-err` : undefined,
    }
    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-[15px] font-medium">{label}</label>
        {opts.multiline ? <textarea rows={6} {...common} /> : <input type={opts.type ?? 'text'} autoComplete={opts.autoComplete} {...common} />}
        {err && <p id={`${id}-err`} className="mt-1.5 text-sm text-ember">{err}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {Object.keys(errors).length > 0 && <p role="alert" className="rounded-[3px] border border-ember p-3 text-[15px] text-ember">{t.errors.summary}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', f.name, { autoComplete: 'name' })}
        {field('email', f.email, { type: 'email', autoComplete: 'email' })}
        {field('phone', f.phone, { type: 'tel', autoComplete: 'tel' })}
        {field('subject', f.subject)}
      </div>
      {field('message', f.message, { multiline: true })}
      {status === 'failed' && <p role="alert" className="rounded-[3px] border border-ember p-3 text-[15px] text-ember">{f.failed}</p>}
      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {status === 'sending' ? f.sending : f.send}
      </Button>
      <p className="text-xs text-mute">{t.common.demoDisclaimer}</p>
    </form>
  )
}
