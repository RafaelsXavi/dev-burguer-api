import * as Yup from 'yup';

export const categoryStoreSchema = Yup.object({
  name: Yup.string().required(),
});

export const categoryUpdateSchema = Yup.object({
  name: Yup.string(),
});
