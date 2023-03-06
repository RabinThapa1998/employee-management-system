import { Router } from "express";
import { getTeamHandler } from "../../../../controllers/v1/dashboard";

const router = Router();
router.get("/", getTeamHandler);
export { router as getTeamRouter };
