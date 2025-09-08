import LoginPage from './features/auth/LoginPage';
import AuthCallback from './pages/AuthCallback';

export default function App() {
  if (window.location.pathname.startsWith('/auth/callback')) {
    return <AuthCallback />;
  }
  return <LoginPage />;
}
