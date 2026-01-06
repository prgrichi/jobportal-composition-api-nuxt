import * as yup from 'yup';
import i18n from '@/i18n';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ['pdf'];

export const createJobApplicationSchema = () => {
  const t = i18n.global.t;

  return yup.object({
    firstName: yup.string().required(t('errors.firstNameRequired')),
    lastName: yup.string().required(t('errors.lastNameRequired')),
    email: yup
      .string()
      .required(t('errors.emailRequired'))
      .email(t('errors.emailInvalid')),
    cv: yup
      .mixed()
      .required(t('errors.cvRequired'))
      .test('fileSize', t('errors.fileSizeMax', { size: MAX_FILE_SIZE_MB }), (value) => {
        if (!value || !value[0]) return false;
        return value[0].size <= MAX_FILE_SIZE;
      })
      .test('fileType', t('errors.fileTypeAllowedPdf'), (value) => {
        if (!value || !value[0]) return false;
        const extension = value[0].name.split('.').pop().toLowerCase();
        return ALLOWED_FILE_TYPES.includes(extension);
      })
  });
};

