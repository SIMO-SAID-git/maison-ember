import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'outline' | 'outlineLight' | 'dark'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[3px] px-6 py-3.5 text-[15px] font-medium leading-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-saffron text-deep hover:bg-saffron-600',
  outline: 'border border-deep/40 text-deep hover:bg-deep hover:text-chalk',
  outlineLight: 'border border-chalk/50 text-chalk hover:bg-chalk hover:text-deep',
  dark: 'bg-deep text-chalk hover:bg-deep-600',
}
export const buttonClasses = (variant: ButtonVariant = 'primary', className?: string) =>
  cn(base, variants[variant], className)

interface ButtonLinkProps {
  href: string
  variant?: ButtonVariant
  className?: string
  children: ReactNode
  external?: boolean
}

export function ButtonLink({ href, variant, className, children, external }: ButtonLinkProps) {
  if (external) {
    return (
      <a href={href} className={buttonClasses(variant, className)} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}
export function Button({ variant, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />
}
