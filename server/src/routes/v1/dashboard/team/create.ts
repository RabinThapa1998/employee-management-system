import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { createTeamHandler } from "../../../../controllers/v1/dashboard";

const router = Router();
const validateFields = [
  check("name").not().isEmpty().withMessage("name field is required"),
  check("password").not().isEmpty().withMessage("password field is required"),
  check("members")
    .not()
    .isEmpty()
    .withMessage("members field is required")
    .isArray({ min: 1 })
    .withMessage("members field must have atleast one member"),
  check("billable_hrs")
    .not()
    .isEmpty()
    .withMessage("billable_hrs field is required")
    .isNumeric()
    .withMessage("billable_hrs must be a number"),
];

router.post("/", validateFields, validateRequest, createTeamHandler);
export { router as createTeamRouter };
