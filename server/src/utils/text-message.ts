export const EmailExists = (mail: string) =>
  `Пользлователь с почтой ${mail} уже существует`;

export enum ErrorMessages {
  USER_NOT_FOUND = "Пользователь не найден",
  EMAIL_EXISTS = "Пользователь с такой почтой уже существует",
  WRONG_PASS_OR_EMAIL = "Почта или пароль введены неверно",
  REGISTRATION_FAILED = "Регистация не доступна",
}

export enum OptionsMessages {
  ACTIVATE_MAIL = "Активация аккаунта на ", 
  MESSAGE_EMAIL = "Для активации перейдите по ссылке"
}
