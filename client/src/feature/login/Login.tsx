import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './Login.module.scss';
import { Button } from '../../components';
import Input from '../../components/Input/Input';
import { useLoginQuery } from '../../lib';


type LoginFormData = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { mutate: sendLoginForm, isPending } = useLoginQuery();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  });
  const email = watch('email', '');

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    if (!data.email || !data.password) return;
    sendLoginForm({ email: data.email, password: data.password });
  };

  return (
    <div className={styles.card}>
      <div className={styles.linkWrapper}>
        Нет аккаунта? <Link to="/registration" className={styles.link}>Зарегистрироваться</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email обязателен' }}
          render={({ field }) => (
            <Input
              label="Email"
              placeholder="Email"
              type="email"
              required
              autoFocus={!email}
              {...field}
            />
          )}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Пароль обязателен' }}
          render={({ field }) => (
            <Input
              label="Пароль"
              placeholder="***"
              type="password"
              required
              {...field}
            />
          )}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <Button type="submit" content="Войти" isLoading={isPending} />
      </form>
    </div>
  );
};
