import { Router } from "express";
import { createEmployeeRouter } from "./create";
import { getEmployeeRouter } from "./get";
import { getOneEmployeeRouter } from "./get-one";

const router = Router();
router.use(createEmployeeRouter);
router.use(getEmployeeRouter);
router.use(getOneEmployeeRouter);

export { router as indexEmployeeRouter };
