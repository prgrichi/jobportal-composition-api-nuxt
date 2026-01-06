import * as yup from 'yup';
import i18n from '@/i18n';

export const createRegisterSchema = () => {
  const t = i18n.global.t;

  return yup.object({
    email: yup.string()
      .required(t('errors.emailRequired'))
      .email(t('errors.emailInvalid')),
    password: yup.string()
      .required(t('errors.passwordRequired'))
      .min(6, t('errors.passwordLength')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('errors.passwordMismatch'))
      .required(t('errors.confirmPassword'))
  });
};