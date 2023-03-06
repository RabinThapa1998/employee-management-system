import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee } from "../../../../models";

export const getOneEmployeeHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) throw new BadRequestError("Employee not found");

    res.status(200).json({
      data: employee,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
