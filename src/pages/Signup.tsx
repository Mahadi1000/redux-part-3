'use client';

import { useEffect, useState } from 'react';
import loginImage from '../assets/images/login.svg';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch } from '@/redux/hook';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/redux/features/userSlice';

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (password && confirmPassword && password === confirmPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = (data: SignupFormInputs) => {
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  const handleGoogleLogin = () => {
    // Handle Google Login
  };

  return (
    <div className="flex max-w-7xl mx-auto h-screen items-center">
      <div className="w-1/2">
        <img
          src={loginImage}
          className="h-full w-full"
          alt="Signup illustration"
        />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>
          <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Your password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                  })}
                />
                {password !== confirmPassword && confirmPassword && (
                  <p className="text-red-500">Passwords do not match</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={disabled}
              >
                Sign up
              </Button>
            </div>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            className="flex items-center justify-between w-full"
            onClick={handleGoogleLogin}
          >
            <p>Google</p>
            <FcGoogle />
          </Button>
          <div className="mt-4">
            <p>
              Already have an account?{' '}
              <span
                className="text-primary hover:underline cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
