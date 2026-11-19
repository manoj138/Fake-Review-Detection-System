import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthFormContainer } from '../../components/auth/AuthFormContainer';
import { FormInput } from '../../components/auth/FormInput';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { PasswordStrengthIndicator } from '../../components/auth/PasswordStrengthIndicator';
import { SocialLoginButton } from '../../components/auth/SocialLoginButton';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { AuthFooter } from '../../components/auth/AuthFooter';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Full name is required.';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirming your password is required.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!agreedTerms) {
      errs.terms = 'You must agree to the Terms of Service to continue.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      register(name, email, password);
      setIsLoading(false);
      showToast('Account created successfully! Welcome to ReviewGuard.', 'success');
      navigate('/dashboard', { replace: true });
    }, 500);
  };

  return (
    <AuthLayout>
      <AuthFormContainer
        title="Start Your 14-Day Free Trial"
        subtitle="Protect your catalog from synthetic and duplicate reviews with AI intelligence"
      >
        <SocialLoginButton label="Sign up with Google" />

        <AuthDivider text="Or register with email" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="name"
            label="Full Name"
            required
            placeholder="Sarah Jenkins"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            error={errors.name}
          />

          <FormInput
            id="email"
            type="email"
            label="Work Email Address"
            required
            placeholder="sarah@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            error={errors.email}
          />

          <div>
            <PasswordInput
              id="password"
              label="Create Password"
              required
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              error={errors.password}
            />
            <PasswordStrengthIndicator password={password} />
          </div>

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            required
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword)
                setErrors({ ...errors, confirmPassword: null });
            }}
            error={errors.confirmPassword}
          />

          {/* Terms checkbox */}
          <div>
            <label className="flex items-start gap-2.5 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => {
                  setAgreedTerms(e.target.checked);
                  if (errors.terms) setErrors({ ...errors, terms: null });
                }}
                className="mt-0.5 rounded border-brand-border text-[#635BFF] focus:ring-[#635BFF]"
              />
              <span className="text-brand-muted leading-tight">
                I agree to ReviewGuard's{' '}
                <a href="#terms" className="text-[#635BFF] hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-[#635BFF] hover:underline font-medium">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.terms && (
              <p className="text-[11px] text-rose-600 font-medium mt-1">
                {errors.terms}
              </p>
            )}
          </div>

          {/* Submit CTA */}
          <Button
            type="submit"
            variant="ai"
            size="lg"
            loading={isLoading}
            className="w-full mt-2"
            icon={ArrowRight}
            iconPosition="right"
          >
            Create ReviewGuard Account
          </Button>

          {/* Login switch link */}
          <div className="text-center text-xs text-brand-muted pt-3 border-t border-brand-border mt-4">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-[#635BFF] hover:underline font-semibold"
            >
              Sign in here
            </Link>
          </div>
        </form>

        <AuthFooter />
      </AuthFormContainer>
    </AuthLayout>
  );
}
export default Register;

