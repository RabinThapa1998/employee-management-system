import { Router } from "express";
import { createTeamRouter } from "./create";
import { getTeamRouter } from "./get";
import { getOneTeamRouter } from "./get-one";
import { deleteTeamRouter } from "./delete";
import { updateTeamRouter } from "./update";

const router = Router();
router.use(createTeamRouter);
router.use(getTeamRouter);
router.use(getOneTeamRouter);
router.use(deleteTeamRouter);
router.use(updateTeamRouter);

export { router as indexTeamRouter };
