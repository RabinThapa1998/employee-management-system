import { Router } from "express";
import { createTeamRouter } from "./create";

const router = Router();
router.use(createTeamRouter);

export { router as indexTeamRouter };
