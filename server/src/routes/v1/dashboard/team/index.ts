import { Router } from "express";
import { createTeamRouter } from "./create";
import { getTeamRouter } from "./get";
import { getOneTeamRouter } from "./get-one";
import { deleteTeamRouter } from "./delete";

const router = Router();
router.use(createTeamRouter);
router.use(getTeamRouter);
router.use(getOneTeamRouter);
router.use(deleteTeamRouter);

export { router as indexTeamRouter };
