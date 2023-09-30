export const isFieldError = (
  field: string,
  errorsMessage: Record<string, any>,
) => {
  if (!errorsMessage) return {};
  const findTheField = errorsMessage.filter(
    (error: Record<string, any>) => error && error.path[0] === field,
  )[0];
  return {
    error: !!findTheField,
    helperText: findTheField ? findTheField.message : '',
  };
};
