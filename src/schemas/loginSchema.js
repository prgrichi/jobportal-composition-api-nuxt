import * as yup from 'yup';
import i18n from '@/i18n';

export const createLoginSchema = () => {
  const t = i18n.global.t;

  return yup.object({
    email: yup.string()
      .required(t('errors.emailRequired'))
      .email(t('errors.emailInvalid')),
    password: yup.string()
      .required(t('errors.passwordRequired'))
      .min(6, t('errors.passwordLength'))
  });
};