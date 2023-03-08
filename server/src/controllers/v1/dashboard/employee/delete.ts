import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee, Team } from "../../../../models";

export const deleteEmployeeHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) throw new BadRequestError("Employee not found");
    console.log(
      "🚀 ~ file: delete.ts:29 ~ deleteEmployeeHandler ~ employee:",
      employee
    );

    //delete employee from the team
    if (employee.team.length) {
      const _team = await Team.findById(employee.team[0]);
      if (!_team) throw new BadRequestError("Team not found");
      _team.members = _team.members.filter((m) => m != employee.id);
      await _team.save();
    }

    //delete employee
    await employee.remove();

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
