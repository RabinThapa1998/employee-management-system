import { Router } from "express";
import { body, param } from "express-validator";
import { updateEmployeeHandler } from "../../../../controllers/v1/dashboard";
import { isValidObjectId } from "../../../../services/object-id-validate";

const router = Router();
router.patch(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Valid class id must be provided"),
  ],
  updateEmployeeHandler
);

export { router as updateEmployeeRouter };
