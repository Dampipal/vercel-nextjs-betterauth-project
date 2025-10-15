'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });
      
      if (result.data) {
        console.log('User created:', result.data);
        alert('Sign up successful!');
      } else if (result.error) {
        alert('Error: ' + result.error.message);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      
      if (result.data) {
        console.log('Signed in:', result.data);
        window.location.href = '/dashboard';
      } else if (result.error) {
        alert('Error: ' + result.error.message);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await authClient.signIn.social({
        provider: 'google',
      });
      
      if (result.data) {
        console.log('Google sign in initiated');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Next.js 15
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Built with Tailwind CSS v4 & Better Auth
          </p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleSignUp} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            
            <Button 
              onClick={handleSignIn} 
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <Button 
              onClick={handleGoogleSignIn} 
              variant="secondary"
              className="w-full"
            >
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}