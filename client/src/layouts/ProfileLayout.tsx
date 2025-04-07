import { Outlet } from 'react-router-dom';
import styles from './ProfileLayout.module.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, ErrorFallback } from '../components';
import { useLogoutQuery } from '../lib';

type Props = {
    children?: React.ReactNode;
};

export const ProfileLayout: React.FC<Props> = ({ children }) => {
    const { mutate: logout, isPending: isLoggingOut } = useLogoutQuery();

    const handleLogout = () => {
        logout();
    };
    return (
        <div className={styles.profileLayout}>
            <h1>Профиль</h1>
            <Button
                content={isLoggingOut ? 'Выход...' : 'Выйти'}
                onClick={handleLogout}
                disabled={isLoggingOut}
            />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Outlet />
            </ErrorBoundary>
            {children}
        </div>
    );
};
