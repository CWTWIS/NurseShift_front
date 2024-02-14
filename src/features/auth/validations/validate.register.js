import Joi from "joi";
import validate from "../../../utils/validate";

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().required().trim().messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email address is required",
    "any.required": "Email address is required",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required",
      "any.required": "Mobile number is required",
    }),
  positionId: Joi.number().integer().min(1).max(3).required().messages({
    "any.required": "Position is required",
  }),
  departmentId: Joi.number().integer().min(1).max(6).required().messages({
    "any.required": "Position is required",
  }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be at least 6 characters and contains only alphabet and number",
      "any.required": "password is required",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Confirm password is required",
    "any.only": "Password and confirm password are not match",
    "any.required": "Confirm password is required",
  }),
});

const validateRegister = (input) => validate(registerSchema)(input);
export default validateRegister;
