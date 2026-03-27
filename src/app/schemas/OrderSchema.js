import * as Yup from 'yup';

export const orderStoreSchema = Yup.object({
  products: Yup.array()
    .required()
    .of(
      Yup.object({
        id: Yup.number().required(),
        quantity: Yup.number().required().positive(),
      }),
    ),
});

export const orderUpdateSchema = Yup.object({
  status: Yup.string().required(),
});
