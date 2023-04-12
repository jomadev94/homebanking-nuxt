import {
  required,
  maxLength,
  minLength,
  minValue,
  email,
  numeric,
  helpers,
} from "@vuelidate/validators";
const passFormat = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/);
const toFormat = helpers.regex(/^VIN.*$/);

export const globalRules = {
  required: helpers.withMessage(
    ({ $property }) => `${$property} field is required`,
    required
  ),
  minLength: (min:number) =>
    helpers.withMessage(
      ({ $params, $property }) =>
        `${$property} field must be longer than ${$params.min}`,
      minLength(min)
    ),
  maxLength: (max:number) =>
    helpers.withMessage(
      ({ $params, $property }) =>
        `${$property} field must be less than ${$params.max}`,
      maxLength(max)
    ),
  minValue: (min:number) =>
    helpers.withMessage(
      ({ $property, $params }) =>
        `${$property} field must be greater than ${$params.min}`,
      minValue(min)
    ),
  email: helpers.withMessage("Invalid email format", email),
  passFormat: helpers.withMessage(
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    passFormat
  ),
  numeric: helpers.withMessage(
    ({ $property }) => `${$property} field must be numeric`,
    numeric
  ),
  toFormat: helpers.withMessage(
    "Account must starts with 'VIN' prefix",
    toFormat
  ),
};
