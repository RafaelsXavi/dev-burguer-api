import * as Yup from 'yup';

export const productStoreSchema = Yup.object({
  name: Yup.string().required(),
  price: Yup.number().required(),
  category_id: Yup.number().required(),
  offer: Yup.boolean().default(false),
});

export const productUpdateSchema = Yup.object({
  name: Yup.string(),
  price: Yup.number(),
  category_id: Yup.number(),
  offer: Yup.boolean(),
});
