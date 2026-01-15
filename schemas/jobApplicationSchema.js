import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ['pdf'];

export const createJobApplicationSchema = () => {
  const { t } = useI18n();
  return yup.object({
    firstName: yup.string().required(t('errors.firstNameRequired')),
    lastName: yup.string().required(t('errors.lastNameRequired')),
    email: yup.string().required(t('errors.emailRequired')).email(t('errors.emailInvalid')),
    cv: yup
      .mixed()
      .required(t('errors.cvRequired'))
      .test('fileSize', t('errors.fileSizeMax', { size: MAX_FILE_SIZE_MB }), value => {
        if (!value) return false;
        const file = value instanceof File ? value : value[0];

        if (!(file instanceof File)) return false;

        console.log('File size check:', file.size, 'Max:', MAX_FILE_SIZE);
        return file.size <= MAX_FILE_SIZE;
      })
      .test('fileType', t('errors.fileTypeAllowedPdf'), value => {
        if (!value) return false;
        const file = value instanceof File ? value : value[0];

        if (!(file instanceof File)) return false;

        const extension = file.name.split('.').pop().toLowerCase();
        console.log('File extension check:', extension);
        return ALLOWED_FILE_TYPES.includes(extension);
      }),
  });
};
