import { body, query, param ,validationResult} from "express-validator";

const userRegistrationValidators = [
  body("name")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const blogPostCreationValidators = [
  body("title")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long"),
  body("content")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),
];
const commentCreationValidators = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment content cannot be empty"),
  body("content")
    .isLength({ max: 500 })
    .withMessage("Comment content is too long"),
];

const searchValidators = [
  param("keyword")
    .optional()
    .isString()
    .withMessage("Keywords must be a string"),
];

const userLoginValidators = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      data: {},
      message: 'Validation failed',
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
export { userRegistrationValidators, blogPostCreationValidators, commentCreationValidators, searchValidators, userLoginValidators };