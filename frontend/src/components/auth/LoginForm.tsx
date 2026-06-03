import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import googleIcon from '../../assets/google-color-svgrepo-com.svg'

const loginSchema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
  password: z.string().min(8, 'Mot de passe trop court (8 caractères minimum)'),
})

type LoginData = z.infer<typeof loginSchema>

function inputClass(hasError: boolean) {
  return [
    'w-full px-4 py-3.5 rounded-xl border text-(--t-1) bg-(--bg-2)',
    'outline-none transition-all placeholder:text-(--t-3)',
    'focus:ring-2',
    hasError
      ? 'border-(--error) focus:border-(--error) focus:ring-(--error)/15'
      : 'border-(--border-medium) focus:border-(--accent) focus:ring-(--accent)/15',
  ].join(' ')
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (_: LoginData) => {
    // TODO: câbler Better Auth
    await new Promise((r) => setTimeout(r, 800))
  }

  return (
    <div
      className="w-full max-w-sm bg-(--bg-2) rounded-2xl border border-(--border-medium) p-8"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      <div className="mb-8 text-center">
        <h1
          className="font-display font-bold text-(--t-1) mb-2"
          style={{ fontSize: 'var(--text-display-m)', letterSpacing: 'normal' }}
        >
          Connexion
        </h1>
        <p className="text-sm text-(--t-2)">
          Pas encore de compte ?{' '}
          <Link to="/login" className="text-(--accent) font-medium hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-(--t-1)">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass(!!errors.email)}
            style={{ fontSize: 'var(--text-body-l)', transitionDuration: 'var(--duration-fast)' }}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-(--error) mt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mot de passe */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-(--t-1)">
              Mot de passe
            </label>
            <button
              type="button"
              className="text-xs text-(--accent) hover:underline font-medium"
            >
              Mot de passe oublié ?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`${inputClass(!!errors.password)} pr-11`}
              style={{ fontSize: 'var(--text-body-l)', transitionDuration: 'var(--duration-fast)' }}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--t-3) hover:text-(--t-1) transition-colors p-1"
              style={{ transitionDuration: 'var(--duration-fast)' }}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" role="alert" className="text-xs text-(--error) mt-0.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-(--accent) text-white font-semibold py-3.5 rounded-full hover:bg-(--accent-hover) transition-colors active:scale-97 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          style={{ fontSize: 'var(--text-body-l)', transitionDuration: 'var(--duration-fast)' }}
        >
          {isSubmitting && <Loader2 size={18} className="animate-spin" />}
          Se connecter
        </button>

        {/* Séparateur */}
        <div className="flex items-center gap-3 my-1">
          <span className="flex-1 h-px bg-(--border-medium)" />
          <span className="text-xs text-(--t-3) font-medium">ou</span>
          <span className="flex-1 h-px bg-(--border-medium)" />
        </div>

        {/* Google */}
        <button
          type="button"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 bg-(--bg-2) text-(--t-1) font-semibold py-3.5 rounded-full border border-(--border-medium) hover:bg-(--bg-3) transition-colors active:scale-97 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontSize: 'var(--text-body-l)', transitionDuration: 'var(--duration-fast)' }}
        >
          <img src={googleIcon} alt="" aria-hidden className="w-5 h-5" />
          Continuer avec Google
        </button>
      </form>
    </div>
  )
}
