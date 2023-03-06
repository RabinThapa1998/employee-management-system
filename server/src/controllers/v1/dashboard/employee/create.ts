import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee } from "../../../../models";

export const createEmployeeHandler = async (req: Request, res: Response) => {
  try {
    const {
      name,
      middle_name,
      surname,
      dob,
      gender,
      address,
      phone_number,
      email,
      starts_at,
      ends_at,
      job_position,
      team,
      is_billable,
      billable_hrs,
    } = req.body;
    const _employee = await Employee.findOne({
      email,
    });
    if (_employee) throw new BadRequestError("Employee Already Exists");
    const newEmployee = await Employee.build({
      name,
      middle_name,
      surname,
      dob,
      gender,
      address,
      phone_number,
      email,
      starts_at,
      ends_at,
      job_position,
      team,
      is_billable,
      billable_hrs,
    }).save();

    res.status(200).json({
      data: newEmployee,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
