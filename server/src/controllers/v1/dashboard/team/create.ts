import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee, Team } from "../../../../models";

export const createTeamHandler = async (req: Request, res: Response) => {
  try {
    const { name, password, members, billable_hrs } = req.body;
    const _team = await Team.findOne({
      name,
    });
    if (_team) throw new BadRequestError("Team Already Exists");
    const _employee = await Employee.find({
      _id: { $in: members },
    });

    const newTeam = await Team.build({
      name,
      password,
      members,
      billable_hrs,
    }).save();

    res.status(200).json({
      data: newTeam,
    });
    const updateEmployee = await Employee.updateMany(
      { _id: { $in: members } },
      { $set: { team: newTeam._id } }
    );
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
