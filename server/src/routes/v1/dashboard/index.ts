import { Router } from "express";
import { indexEmployeeRouter } from "./employee";
import { indexTeamRouter } from "./team";

const router = Router();

router.use("/employee", indexEmployeeRouter);
router.use("/team", indexTeamRouter);

export { router as indexDashboardRouter };
