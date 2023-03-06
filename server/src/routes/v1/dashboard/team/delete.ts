import { Router } from "express";
import { param } from "express-validator";
import { deleteTeamHandler } from "../../../../controllers/v1/dashboard";
import { isValidObjectId } from "../../../../services/object-id-validate";

const router = Router();
router.delete(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Valid class id must be provided"),
  ],
  deleteTeamHandler
);
export { router as deleteTeamRouter };
