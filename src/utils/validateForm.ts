import { z } from 'zod';

const validateForm = <T extends z.ZodObject<any>>(
  formData: unknown,
  schema: T,
  res: any,
  message : string
): z.infer<T> | null => {
  const parsedData = schema.safeParse(formData);

  if (!parsedData.success) {
    const formatted = parsedData.error.format();
    const errors: { [key: string]: string[] } = {};

    for (const key in formatted) {
      if (formatted[key] && Array.isArray(formatted[key]._errors) && formatted[key]._errors.length > 0) {
        errors[key] = formatted[key]._errors;
      }
    }

    res.status(422).json({
      message: message,
      errors
    });

    return null;
  }

  return parsedData.data;
};

export { validateForm };