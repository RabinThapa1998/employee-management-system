import { Router } from "express";
import { createTeamRouter } from "./create";
import { getTeamRouter } from "./get";

const router = Router();
router.use(createTeamRouter);
router.use(getTeamRouter);

export { router as indexTeamRouter };
