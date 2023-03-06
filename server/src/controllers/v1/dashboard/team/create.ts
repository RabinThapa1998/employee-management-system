import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Team } from "../../../../models";

export const createTeamHandler = async (req: Request, res: Response) => {
  try {
    const { name, password, members, billable_hrs } = req.body;
    const _team = await Team.findOne({
      name,
    });
    if (_team) throw new BadRequestError("Team Already Exists");
    const newTeam = await Team.build({
      name,
      password,
      members,
      billable_hrs,
    }).save();

    res.status(200).json({
      data: newTeam,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
