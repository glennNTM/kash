import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BarChart3,
  History,
  Target,
  User,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from '../lib/icons'
import { useSession, signOut } from '../hooks/useSession'
import { useUiStore } from '../stores/uiStore'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/statistiques', icon: BarChart3, label: 'Statistiques' },
  { to: '/historique', icon: History, label: 'Historique' },
  { to: '/objectifs', icon: Target, label: 'Objectifs' },
  { to: '/profil', icon: User, label: 'Profil' },
]

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function Avatar({ name, image }: { name: string; image?: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="size-9 rounded-full object-cover"
      />
    )
  }
  return (
    <span className="size-9 shrink-0 rounded-full bg-(--accent-soft) text-(--accent) grid place-items-center text-sm font-semibold">
      {initials(name)}
    </span>
  )
}

export default function DashboardLayout() {
  const { data } = useSession()
  const navigate = useNavigate()
  const user = data?.user

  const collapsed = useUiStore((s) => s.sidebarCollapsed)
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-dvh bg-(--bg-1)">
      {/* ── Sidebar fixe (desktop ≥1024px) ─────────────────────────── */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 flex-col bg-(--bg-2) border-r border-(--border-subtle) transition-[width] duration-(--duration-base) ${
          collapsed ? 'w-[76px]' : 'w-60'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-apple)' }}
      >
        <div
          className={`flex items-center py-5 ${
            collapsed ? 'justify-center px-3' : 'justify-between px-6'
          }`}
        >
          {!collapsed && (
            <span className="font-display text-3xl text-(--accent) font-bold">
              Kash
            </span>
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={collapsed ? 'Déplier la sidebar' : 'Replier la sidebar'}
            title={collapsed ? 'Déplier' : 'Replier'}
            className="grid place-items-center size-9 rounded-md text-(--t-2) transition-colors duration-(--duration-fast) hover:bg-(--bg-3) hover:text-(--t-1)"
          >
            {collapsed ? (
              <PanelLeftOpen size={18} strokeWidth={1.75} />
            ) : (
              <PanelLeftClose size={18} strokeWidth={1.75} />
            )}
          </button>
        </div>

        <nav className="flex-1 px-3 pb-6 flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }, index) => (
            <NavLink
              key={index}
              to={to}
              end={to === '/dashboard'}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-(--duration-fast) ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-(--accent-soft) text-(--accent)'
                    : 'text-(--t-2) hover:bg-(--bg-3) hover:text-(--t-1)'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.75} className="shrink-0" />
              {!collapsed && label}
            </NavLink>
          ))}
        </nav>

        {/* Bloc profil + déconnexion */}
        {user && (
          <div className="border-t border-(--border-subtle) p-3">
            <div
              className={`flex items-center gap-3 py-2 ${
                collapsed ? 'justify-center px-0' : 'px-2'
              }`}
            >
              <Avatar name={user.name} image={user.image} />
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-(--t-1)">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-(--t-3)">{user.email}</p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              title={collapsed ? 'Déconnexion' : undefined}
              className={`mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-(--t-2) transition-colors duration-(--duration-fast) hover:bg-(--bg-3) hover:text-(--error) ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut size={18} strokeWidth={1.75} className="shrink-0" />
              {!collapsed && 'Déconnexion'}
            </button>
          </div>
        )}
      </aside>

      {/* ── Contenu ─────────────────────────────────────────────────── */}
      <div
        className={`transition-[padding] duration-(--duration-base) ${
          collapsed ? 'lg:pl-[76px]' : 'lg:pl-60'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-apple)' }}
      >
        <main className="mx-auto max-w-7xl px-4 py-6 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* ── Bottom nav (mobile <1024px) ─────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-100 flex border-t border-(--border-subtle) bg-(--bg-glass) backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ to, icon: Icon, label }, index) => (
          <NavLink
            key={index}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-eyebrow font-medium transition-colors duration-(--duration-fast) ${
                isActive ? 'text-(--accent)' : 'text-(--t-3)'
              }`
            }
          >
            <Icon size={22} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
