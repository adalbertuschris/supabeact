export const emailValidator = (value: string) => {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return true;
  } else {
    return "email";
  }
};
