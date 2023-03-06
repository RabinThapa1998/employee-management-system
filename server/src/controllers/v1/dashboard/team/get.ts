import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Team } from "../../../../models";

export const getTeamHandler = async (req: Request, res: Response) => {
  try {
    const team = await Team.find().populate("members");
    if (!team) throw new BadRequestError("Team List Empty");

    res.status(200).json({
      data: team,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
