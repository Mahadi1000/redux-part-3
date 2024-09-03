import loginImage from '../assets/images/login.svg';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import { loginUser } from '@/redux/features/userSlice';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate('/');
    }
  }, [user.email, isLoading]);

  const handleGoogleLogin = () => {
    // Handle Google Login
  };

  return (
    <div className="flex max-w-7xl h-screen items-center mx-auto">
      <div className="w-1/2">
        <img
          src={loginImage}
          className="h-full w-full"
          alt="Login illustration"
        />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
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
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login with email
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
              Don&apos;t have an account?{' '}
              <span
                className="text-primary hover:underline cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
