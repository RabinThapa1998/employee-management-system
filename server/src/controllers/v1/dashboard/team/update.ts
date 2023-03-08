import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee, Team } from "../../../../models";

export const updateTeamHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, members, billable_hrs } = req.body;

    const team = await Team.findById(id);
    if (!team) throw new BadRequestError("Team Not Found");
    //check if any of the members are from other teams or empty
    const memberAlreadyOnOtherTeamOrUnassigned = await Employee.find({
      _id: { $in: members },
      team: { $ne: team.id },
    });

    const memberAlreadyOnOtherTeam =
      memberAlreadyOnOtherTeamOrUnassigned.filter(
        (member) => member.team.length
      );
    if (memberAlreadyOnOtherTeam.length)
      throw new BadRequestError("Member already on other team");

    //update team
    team.name = name || team.name;
    team.password = password || team.password;
    team.members = members || team.members;
    team.billable_hrs = billable_hrs || team.billable_hrs;
    await team.save();

    res.status(200).json({
      data: team,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};
