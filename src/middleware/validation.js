export const validation = async ({ schema, data } = {}) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(error.message, { cause: 400 });
  }
};
