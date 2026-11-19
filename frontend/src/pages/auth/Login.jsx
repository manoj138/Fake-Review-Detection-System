import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthFormContainer } from '../../components/auth/AuthFormContainer';
import { FormInput } from '../../components/auth/FormInput';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { SocialLoginButton } from '../../components/auth/SocialLoginButton';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { AuthFooter } from '../../components/auth/AuthFooter';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { ArrowRight, LogIn } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('demo.officer@reviewguard.ai');
  const [password, setPassword] = useState('demo1234');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate authentication API latency
    setTimeout(() => {
      login(email, password, rememberMe);
      setIsLoading(false);
      showToast('Welcome back! Review intelligence session started.', 'success');

      // Navigate to attempted route or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }, 500);
  };

  return (
    <AuthLayout>
      <AuthFormContainer
        title="Sign in to ReviewGuard"
        subtitle="Access your review intelligence workspace and automated fraud monitors"
      >
        <SocialLoginButton label="Sign in with Google" />

        <AuthDivider text="Or sign in with email" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="email"
            type="email"
            label="Work Email Address"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            error={errors.email}
          />

          <PasswordInput
            id="password"
            label="Password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: null });
            }}
            error={errors.password}
          />

          {/* Remember me & Forgot Password */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-brand-border text-[#635BFF] focus:ring-[#635BFF]"
              />
              <span className="text-brand-muted">Remember me for 30 days</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-[#635BFF] hover:underline font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit CTA */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            className="w-full mt-2"
            icon={ArrowRight}
            iconPosition="right"
          >
            Sign In to Dashboard
          </Button>

          {/* Register switch link */}
          <div className="text-center text-xs text-brand-muted pt-3 border-t border-brand-border mt-4">
            <span>Don't have an account yet? </span>
            <Link
              to="/register"
              className="text-[#635BFF] hover:underline font-semibold"
            >
              Create free account
            </Link>
          </div>
        </form>

        <AuthFooter />
      </AuthFormContainer>
    </AuthLayout>
  );
}
export default Login;

