import styles from './PrimaryLayout.module.scss';

type Props = {
    children?: React.ReactNode;
};

export const PrimaryLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.primaryLayout}>
            {children}
        </div>
    );
};