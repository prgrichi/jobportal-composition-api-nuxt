import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

export const createRegisterSchema = () => {
  const { t } = useI18n();
  return yup.object({
    email: yup.string().required(t('errors.emailRequired')).email(t('errors.emailInvalid')),
    password: yup
      .string()
      .required(t('errors.passwordRequired'))
      .min(6, t('errors.passwordLength')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('errors.passwordMismatch'))
      .required(t('errors.confirmPassword')),
  });
};
