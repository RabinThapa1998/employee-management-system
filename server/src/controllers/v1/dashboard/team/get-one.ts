import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Team } from "../../../../models";

export const getOneTeamHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate("members");
    if (!team) throw new BadRequestError("Team Not Found");

    res.status(200).json({
      data: team,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
