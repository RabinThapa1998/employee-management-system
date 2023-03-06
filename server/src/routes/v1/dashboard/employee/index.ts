import { Router } from "express";
import { createEmployeeRouter } from "./create";
import { getEmployeeRouter } from "./get";
import { getOneEmployeeRouter } from "./get-one";
import { updateEmployeeRouter } from "./update";

const router = Router();
router.use(createEmployeeRouter);
router.use(getEmployeeRouter);
router.use(getOneEmployeeRouter);
router.use(updateEmployeeRouter);

export { router as indexEmployeeRouter };
