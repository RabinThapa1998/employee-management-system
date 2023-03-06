import { Router } from "express";
import { param } from "express-validator";
import { getOneTeamHandler } from "../../../../controllers/v1/dashboard";
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
  getOneTeamHandler
);
export { router as getOneTeamRouter };
