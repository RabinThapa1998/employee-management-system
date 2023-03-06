import { Router } from "express";
import { createEmployeeRouter } from "./create";
import { getEmployeeRouter } from "./get";

const router = Router();
router.use(createEmployeeRouter);
router.use(getEmployeeRouter);

export { router as indexEmployeeRouter };
