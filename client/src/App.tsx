import { useEffect } from 'react';
import { Routers } from './routers/routers';
import { useDeviceTypeIdentifier } from './lib/useDeviceTypeIdentifier';
import { useAppDispatch } from './store/useAppDispatch';
import { useAppSelector } from './store/useAppSelect';
import { toggleAuthState } from './store/authStateSlice';
import { useCheckAuthQuery } from './lib';

export const App: React.FC = () => {
  const accessToken = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.authState);
  const { mutate: checkAuth, isPending: isLoading } = useCheckAuthQuery();

  useDeviceTypeIdentifier();

  useEffect(() => {
    if (accessToken) {
      checkAuth(undefined, {
        onSuccess: () => console.log('Auth check succeeded'),
        onError: (err) => console.log('Auth check failed:', err),
      });
    } else {
      dispatch(toggleAuthState({ isLogin: false }));
    }
  }, [checkAuth, dispatch]);

  if (isLogin === undefined || (accessToken && isLoading)) {
    return <div>Загрузка...</div>;
  }

  return <Routers />;
};