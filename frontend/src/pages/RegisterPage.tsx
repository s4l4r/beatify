import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { register, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phoneNumber || undefined,
      });
      navigate('/home');
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-4">
            <Music2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white dark:text-white text-gray-900">
            Sign up for Beatify
          </h1>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-900/20 border border-red-800/50 text-red-400 text-sm"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300 dark:text-gray-300 text-gray-600 mb-1"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-800 dark:bg-gray-800 bg-gray-100
                  text-white dark:text-white text-gray-900 rounded-md
                  border border-gray-700 dark:border-gray-700 border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  placeholder-gray-500"
                placeholder="John"
                autoComplete="given-name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300 dark:text-gray-300 text-gray-600 mb-1"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-800 dark:bg-gray-800 bg-gray-100
                  text-white dark:text-white text-gray-900 rounded-md
                  border border-gray-700 dark:border-gray-700 border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  placeholder-gray-500"
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 dark:text-gray-300 text-gray-600 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-800 dark:bg-gray-800 bg-gray-100
                text-white dark:text-white text-gray-900 rounded-md
                border border-gray-700 dark:border-gray-700 border-gray-300
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                placeholder-gray-500"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 dark:text-gray-300 text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-800 dark:bg-gray-800 bg-gray-100
                text-white dark:text-white text-gray-900 rounded-md
                border border-gray-700 dark:border-gray-700 border-gray-300
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                placeholder-gray-500"
              placeholder="Create a password"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-300 dark:text-gray-300 text-gray-600 mb-1"
            >
              Phone number{' '}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-800 dark:bg-gray-800 bg-gray-100
                text-white dark:text-white text-gray-900 rounded-md
                border border-gray-700 dark:border-gray-700 border-gray-300
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                placeholder-gray-500"
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary-600 text-white rounded-full font-semibold
              hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        {/* Login link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-400 text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-400 hover:text-primary-300 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
