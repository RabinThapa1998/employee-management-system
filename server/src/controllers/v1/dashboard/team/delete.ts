import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee, Team } from "../../../../models";

export const deleteTeamHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    console.log("🚀 ~ file: delete.ts:9 ~ deleteTeamHandler ~ team:", team);
    if (!team) throw new BadRequestError("Team Not Found");
    //remove the team from all the employees
    if (team.members.length) {
      for (let i = 0; i < team.members.length; i++) {
        const employee = await Employee.findById(team.members[i]);
        if (!employee) throw new BadRequestError("Employee not found");
        employee.team = [];
        await employee.save();
      }
    }

    //delete team
    await team.remove();

    res.status(200).json({
      message: "Team deleted successfully",
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
