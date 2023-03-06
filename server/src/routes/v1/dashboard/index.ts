import { Router } from "express";
import { indexEmployeeRouter } from "./employee";

const router = Router();

router.use("/employee", indexEmployeeRouter);

export { router as indexDashboardRouter };
