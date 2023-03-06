import { Router } from "express";
import { body, param } from "express-validator";
import { getOneEmployeeHandler } from "../../../../controllers/v1/dashboard";
import { isValidObjectId } from "../../../../services/object-id-validate";

const router = Router();
router.get(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Valid class id must be provided"),
  ],
  getOneEmployeeHandler
);

export { router as getOneEmployeeRouter };
