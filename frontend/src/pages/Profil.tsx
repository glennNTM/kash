import { useNavigate } from 'react-router-dom'
import { LogOut, Mail, User, Bell, Shield, ChevronRight } from '../lib/icons'
import { useSession, signOut } from '../hooks/useSession'

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest text-(--t-3) px-4 mb-1"
      style={{ fontSize: 'var(--text-eyebrow)' }}
    >
      {children}
    </p>
  )
}

function SettingRow({
  icon: Icon,
  label,
  value,
  onClick,
  danger = false,
}: {
  icon: React.ElementType
  label: string
  value?: string
  onClick?: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors duration-(--duration-fast) hover:bg-(--bg-3) disabled:cursor-default"
    >
      <span
        className="shrink-0 size-8 rounded-full flex items-center justify-center"
        style={{ background: danger ? 'rgba(220,38,38,0.08)' : 'var(--bg-3)' }}
      >
        <Icon
          size={16}
          strokeWidth={1.75}
          color={danger ? 'var(--error)' : 'var(--t-2)'}
        />
      </span>
      <span
        className="flex-1 text-sm font-medium"
        style={{ color: danger ? 'var(--error)' : 'var(--t-1)' }}
      >
        {label}
      </span>
      {value && <span className="text-sm text-(--t-3) shrink-0">{value}</span>}
      {onClick && !danger && (
        <ChevronRight size={16} strokeWidth={1.75} className="text-(--t-3) shrink-0" />
      )}
    </button>
  )
}

export default function Profil() {
  const { data } = useSession()
  const navigate = useNavigate()
  const user = data?.user

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto">
      {/* Titre */}
      <h1
        className="font-bold text-(--t-1)"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display-m)' }}
      >
        Profil
      </h1>

      {/* Carte identité */}
      <div
        className="rounded-xl border border-(--border-subtle) bg-(--bg-2) overflow-hidden"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex items-center gap-4 p-5 border-b border-(--border-subtle)">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="size-16 rounded-full object-cover shrink-0"
            />
          ) : (
            <span className="size-16 rounded-full bg-(--accent-soft) text-(--accent) grid place-items-center text-xl font-bold shrink-0">
              {user ? initials(user.name) : '?'}
            </span>
          )}
          <div className="min-w-0">
            <p className="font-bold text-(--t-1) text-base truncate">
              {user?.name ?? '—'}
            </p>
            <p className="text-sm text-(--t-3) truncate mt-0.5">{user?.email ?? '—'}</p>
          </div>
        </div>

        <SettingRow icon={User} label="Nom complet" value={user?.name} />
        <SettingRow icon={Mail} label="Adresse e-mail" value={user?.email} />
      </div>

      {/* Préférences */}
      <div
        className="rounded-xl border border-(--border-subtle) bg-(--bg-2) overflow-hidden"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="pt-4 pb-1">
          <SectionTitle>Préférences</SectionTitle>
        </div>
        <SettingRow icon={Bell} label="Notifications" value="Activées" />
        <SettingRow icon={Shield} label="Confidentialité" />
      </div>

      {/* Compte */}
      <div
        className="rounded-xl border border-(--border-subtle) bg-(--bg-2) overflow-hidden"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="pt-4 pb-1">
          <SectionTitle>Compte</SectionTitle>
        </div>
        <SettingRow
          icon={LogOut}
          label="Se déconnecter"
          onClick={handleSignOut}
          danger
        />
      </div>

      {/* Version */}
      <p className="text-center text-xs text-(--t-3) pb-2">Kash · v0.1.0</p>
    </div>
  )
}
