import { Router } from "express";
import { getEmployeeHandler } from "../../../../controllers/v1/dashboard";

const router = Router();
router.get("/", getEmployeeHandler);
export { router as getEmployeeRouter };
