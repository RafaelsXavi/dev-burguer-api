export default (schema) => async (request, response, next) => {
  try {
    await schema.validateSync(request.body, {
      abortEarly: false,
      strict: true,
    });
    return next();
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Validation fails', messages: err.errors });
  }
};
