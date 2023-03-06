import { Router } from "express";
import { createTeamRouter } from "./create";
import { getTeamRouter } from "./get";
import { getOneTeamRouter } from "./get-one";

const router = Router();
router.use(createTeamRouter);
router.use(getTeamRouter);
router.use(getOneTeamRouter);

export { router as indexTeamRouter };
