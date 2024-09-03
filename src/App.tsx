import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { setLoading, setUser } from './redux/features/userSlice';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hook';
import { auth } from './firebase/firebase.config';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(setLoading(true));

      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user.email!));
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
        }
      });
    }, [dispatch]);
  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
