import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthFormContainer } from '../../components/auth/AuthFormContainer';
import { FormInput } from '../../components/auth/FormInput';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';
import { ArrowLeft, Mail, CheckCircle2, Send } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email format.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      showToast(`Password reset link dispatched to ${email}.`, 'success');
    }, 450);
  };

  return (
    <AuthLayout>
      <AuthFormContainer
        title={isSubmitted ? 'Check Your Inbox' : 'Reset Your Password'}
        subtitle={
          isSubmitted
            ? `We've sent a recovery instruction link to ${email}`
            : 'Enter your registered email and we will send you secure recovery instructions'
        }
      >
        {isSubmitted ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <Mail className="w-7 h-7" />
            </div>

            <p className="text-xs text-brand-muted leading-relaxed max-w-sm mx-auto">
              Didn't receive the email? Check your spam folder or try requesting a new link below in 60 seconds.
            </p>

            <div className="space-y-3 pt-2">
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
              >
                Try Another Email Address
              </Button>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#635BFF] hover:underline w-full py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="reset-email"
              type="email"
              label="Registered Account Email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              error={error}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full mt-2"
              icon={Send}
              iconPosition="right"
            >
              Send Password Reset Link
            </Button>

            <div className="pt-3 border-t border-brand-border text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </AuthFormContainer>
    </AuthLayout>
  );
}
export default ForgotPassword;

