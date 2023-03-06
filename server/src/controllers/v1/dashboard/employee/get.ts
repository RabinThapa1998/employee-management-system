import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee } from "../../../../models";

export const getEmployeeHandler = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.find();
    if (!employee) throw new BadRequestError("Employee List Empty");

    res.status(200).json({
      data: employee,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong | fix backed"
    );
  }
};
