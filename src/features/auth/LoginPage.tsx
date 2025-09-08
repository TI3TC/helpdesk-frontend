import { useState } from 'react';
import { signInWithMicrosoft } from './msalActions';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`(${mode}) Em breve conectaremos a API.\nEmail: ${email}`);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-900 grid place-items-center text-white text-xl">3TC</div>
        <h1 className="text-2xl font-semibold text-center mb-1">Bem-vindo ao HelpDesk 3TC</h1>
        <p className="text-center text-sm text-gray-600 mb-4">{mode === 'login' ? 'Faça login para continuar' : 'Crie sua conta'}</p>

        <button
          onClick={signInWithMicrosoft}
          className="w-full mb-3 rounded-xl border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Entrar com Microsoft 365
        </button>

        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray-500">ou</span></div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm">Email</span>
            <input type="email" className="w-full rounded-xl border px-3 py-2" required
                   value={email} onChange={e=>setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Senha</span>
            <input type="password" className="w-full rounded-xl border px-3 py-2" required
                   value={password} onChange={e=>setPassword(e.target.value)} />
          </label>
          <button type="submit" className="w-full rounded-xl bg-gray-900 py-2 text-white font-medium">
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <>Não tem conta? <button className="text-blue-600 underline" onClick={()=>setMode('register')}>Criar conta</button></>
          ) : (
            <>Já tem conta? <button className="text-blue-600 underline" onClick={()=>setMode('login')}>Entrar</button></>
          )}
        </p>
      </div>
    </div>
  );
}

