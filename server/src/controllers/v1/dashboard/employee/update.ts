import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee } from "../../../../models";

export const updateEmployeeHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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
    const employee = await Employee.findById(id);
    if (!employee) throw new BadRequestError("Employee not found");

    employee.name = name || employee.name;
    employee.middle_name = middle_name || employee.middle_name;
    employee.surname = surname || employee.surname;
    employee.dob = dob || employee.dob;
    employee.gender = gender || employee.gender;
    employee.address = address || employee.address;
    employee.phone_number = phone_number || employee.phone_number;
    employee.email = email || employee.email;
    employee.starts_at = starts_at || employee.starts_at;
    employee.ends_at = ends_at || employee.ends_at;
    employee.job_position = job_position || employee.job_position;
    employee.team = team || employee.team;
    employee.is_billable = is_billable || employee.is_billable;
    employee.billable_hrs = billable_hrs || employee.billable_hrs;

    await employee.save();

    res.status(200).json({
      data: employee,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
