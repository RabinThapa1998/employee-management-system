import { Router } from "express";
import { createEmployeeRouter } from "./create";

const router = Router();
router.use(createEmployeeRouter);

export { router as indexEmployeeRouter };
