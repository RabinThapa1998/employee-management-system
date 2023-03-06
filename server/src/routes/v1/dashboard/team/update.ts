import { Router } from "express";
import { param } from "express-validator";
import { updateTeamHandler } from "../../../../controllers/v1/dashboard";
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
  updateTeamHandler
);
export { router as updateTeamRouter };
