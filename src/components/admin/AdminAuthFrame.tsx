import type { ReactNode } from 'react';
import logo from '@/assets/languagebridge-logo-new.svg';

export default function AdminAuthFrame({ title, children }: { title: string; children: ReactNode }) {
  return <main className="min-h-screen bg-background flex items-center justify-center p-6 pb-72 sm:pb-6">
    <section className="w-full max-w-sm">
      <img src={logo} alt="LanguageBridge" className="h-16 w-auto mx-auto mb-6" />
      <h1 className="text-2xl font-bold text-center mb-8">{title}</h1>
      {children}
    </section>
  </main>;
}