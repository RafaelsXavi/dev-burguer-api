import * as Yup from 'yup';

export const sessionStoreSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});
