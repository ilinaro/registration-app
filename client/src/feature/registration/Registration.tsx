import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './Registration.module.scss';
import { useSignupQuery } from '../../lib';
import { Button } from '../../components';
import Input from '../../components/Input/Input';

type SignupFormData = {
  email: string;
  password: string;
  re_password: string;
};

export const Registration: React.FC = () => {
  const { mutate: sendSignupForm, isPending, isSuccess } = useSignupQuery();
  const navigate = useNavigate();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>({
    defaultValues: { email: '', password: '', re_password: '' },
  });
  const [isPasswordFocused, setPasswordFocused] = useState<boolean>(false);
  const password = watch('password', '');

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    if (!data.email || !data.password || !data.re_password) return;
    sendSignupForm({ email: data.email, password: data.password });
  };

  return (
    <div className={styles.card}>
      {isSuccess ? (
        <>
          <div className={styles.successMessage}>
            <div>Спасибо за регистрацию!</div>
            <div className={styles.successText}>Подтвердите регистрацию через email.</div>
          </div>
          <Button onClick={() => navigate('/login')} content="Перейти к входу" />
        </>
      ) : (
        <>
          <div className={styles.linkWrapper}>
            Уже есть аккаунт? <Link to="/login" className={styles.link}>Войти</Link>
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
                  autoFocus
                  {...field}
                />
              )}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}

            <Controller
              name="password"
              control={control}
              rules={{ required: 'Пароль обязателен', minLength: { value: 8, message: 'Минимум 8 символов' } }}
              render={({ field }) => (
                <Input
                  label="Пароль"
                  placeholder="***"
                  type="password"
                  required
                  {...field}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              )}
            />
            <p className={styles.error}>
              {isPasswordFocused && password.length < 8 && `Осталось символов: ${8 - password.length}`}
              {!isPasswordFocused && errors.password?.message}
            </p>

            <Controller
              name="re_password"
              control={control}
              rules={{
                required: 'Подтверждение обязательно',
                validate: value => value === password || 'Пароли не совпадают',
              }}
              render={({ field }) => (
                <Input
                  label="Повторите пароль"
                  placeholder="***"
                  type="password"
                  required
                  {...field}
                />
              )}
            />
            {errors.re_password && <p className={styles.error}>{errors.re_password.message}</p>}

            <Button type="submit" content="Зарегистрироваться" isLoading={isPending} />
          </form>
        </>
      )}
    </div>
  );
};