import z from "zod";
interface ValidationResult {
  valid: boolean;
  message: string;
}

function username(value: string): ValidationResult {
  const v = z.string().min(3);
  try {
    v.parse(value);
    return Valid;
  } catch (error) {
    return { valid: false, message: "Invalid name" };
  }
}

function email(value: string): ValidationResult {
  const v = z.string().min(3).email();
  try {
    v.parse(value);
    return Valid;
  } catch (error) {
    return { valid: false, message: "Invalid email address" };
  }
}

function password(value: string): ValidationResult {
  const v = z
    .string()
    .min(8)
    .refine((value) => {
      const isSpecial = (char: string) => /[!@#$%^&*]/.test(char);
      const isNumber = (char: string) => /\d/.test(char);
      const isString = (char: string) => /[A-z]/.test(char);
      const count = { special: 0, number: 0, string: 0 };
      for (const char of value) {
        if (isSpecial(char)) {
          count.special++;
        } else if (isNumber(char)) {
          count.number++;
        } else if (isString(char)) {
          count.string++;
        }
      }
      return count.special > 0 && count.number > 0 && count.string > 0;
    });
  try {
    v.parse(value);
    return Valid;
  } catch (error) {
    return { valid: false, message: "Invalid password" };
  }
}

export const validate = {
  email,
  password,
  username,
};

export const Valid: ValidationResult = {
  valid: true,
  message: "",
};
