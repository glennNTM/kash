import { Link } from "react-router-dom";
import SiteHeader from "../components/layout/Header";
import SiteFooter from "../components/layout/Footer";
import LoginForm from "../components/auth/LoginForm";
import { APP_NAME } from "../lib/constants";

export default function Login() {
  return (
    <div className="min-h-dvh flex flex-col bg-(--bg-1)">
      <SiteHeader />
      <main className="flex-1 flex">
        {/* Panneau gauche — visible seulement desktop */}
        <div
          className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-12"
          style={{ background: "var(--gradient-stat)" }}
        >
          <Link to="/" className="text-2xl font-bold text-white font-display">
            {APP_NAME}
          </Link>
          <div className="flex flex-col gap-4">
            <p className="text-white/90 text-lg font-display font-bold leading-snug">
              &laquo;&nbsp;La méthode 50/30/20 a changé ma façon de voir mon
              argent.&nbsp;&raquo;
            </p>
            <p className="text-white/60 text-sm">— Marie, 27 ans</p>
          </div>
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} {APP_NAME}
          </p>
        </div>

        {/* Panneau droite — form centré */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <LoginForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
