import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { createEmployeeHandler } from "../../../../controllers/v1/dashboard";

const router = Router();
const validateFields = [
  check("name").not().isEmpty().withMessage("name field is required"),
  check("surname").not().isEmpty().withMessage("surname field is required"),
  check("dob").not().isEmpty().withMessage("dob field is required"),
  check("address").not().isEmpty().withMessage("address field is required"),
  check("phone_number")
    .not()
    .isEmpty()
    .withMessage("phone_number field is required"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email field is required")
    .isEmail()
    .withMessage("invalid email"),
  check("gender").not().isEmpty().withMessage("gender field is required"),
  check("starts_at").not().isEmpty().withMessage("starts_at field is required"),
  check("ends_at").not().isEmpty().withMessage("ends_at field is required"),
  check("job_position")
    .not()
    .isEmpty()
    .withMessage("job_position field is required"),
  check("is_billable")
    .not()
    .isEmpty()
    .withMessage("is_billable field is required"),
  check("billable_hrs")
    .not()
    .isEmpty()
    .withMessage("billable_hrs field is required")
    .isNumeric()
    .withMessage("billable_hrs must be a number"),
];

router.post("/", validateFields, validateRequest, createEmployeeHandler);
export { router as createEmployeeRouter };
