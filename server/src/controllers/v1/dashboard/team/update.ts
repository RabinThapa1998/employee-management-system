import { BadRequestError } from "../../../../common/errors/bad-request-error";
import { Request, Response } from "express";
import { Employee, Team } from "../../../../models";

export const updateTeamHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, members, billable_hrs } = req.body;

    const team = await Team.findById(id);
    if (!team) throw new BadRequestError("Team Not Found");
    const oldTeamList = team.members;

    //check if any of the members are from other teams or empty
    const membersAlreadyAssigned = await Employee.find({
      _id: { $in: members },
      team: { $ne: team.id },
    });

    if (membersAlreadyAssigned.filter((member) => member.team.length).length)
      throw new BadRequestError("Member already on other team");

    team.name = name || team.name;
    team.password = password || team.password;
    team.members = members || team.members;
    team.billable_hrs = billable_hrs || team.billable_hrs;
    await team.save();

    //update employee with new team
    if (members.length) {
      for (let i = 0; i < members.length; i++) {
        const employee = await Employee.findById(members[i]);
        if (!employee) throw new BadRequestError("Employee not found");
        employee.team = [team.id];
        await employee.save();
      }
    }
    // remove team from employee if not in members

    const employeeNotInMembers = [
      ...new Set([...oldTeamList.map((list) => list.toString()), ...members]),
    ].filter((member) => !members.includes(member));
    console.log(
      "🚀 ~ file: update.ts:43 ~ updateTeamHandler ~ employeeNotInMembers:",
      employeeNotInMembers,
      [...new Set([...oldTeamList.map((list) => list.toString()), ...members])]
    );
    if (employeeNotInMembers.length) {
      for (let i = 0; i < employeeNotInMembers.length; i++) {
        const employee = await Employee.findById(employeeNotInMembers[i]);
        if (!employee) throw new BadRequestError("Employee not found");
        employee.team = [];
        await employee.save();
      }
    }

    res.status(200).json({
      data: team,
    });
  } catch (error: any) {
    throw new BadRequestError(
      error.message || "Something went wrong. Debug backend!"
    );
  }
};

//  //check if any of the members are from other teams or empty
//  const memberAlreadyOnOtherTeamOrUnassigned = await Employee.find({
//   _id: { $in: members },
//   team: { $ne: team.id },
// });

// const memberAlreadyOnOtherTeam =
//   memberAlreadyOnOtherTeamOrUnassigned.filter(
//     (member) => member.team.length
//   );
// if (memberAlreadyOnOtherTeam.length)
//   throw new BadRequestError("Member already on other team");
// const oldTeamList = team.members;
// //update team
// team.name = name || team.name;
// team.password = password || team.password;
// team.members = members || team.members;
// team.billable_hrs = billable_hrs || team.billable_hrs;
// await team.save();

// //update employee with new team
// if (members.length) {
//   for (let i = 0; i < members.length; i++) {
//     const employee = await Employee.findById(members[i]);
//     if (!employee) throw new BadRequestError("Employee not found");
//     employee.team = [team.id];
//     await employee.save();
//   }
// }
// //remove team from employee if not in members

// const employeeNotInMembers = oldTeamList.filter(
//   (member) => !members.includes(member)
// );
// console.log(
//   "🚀 ~ file: update.ts:45 ~ updateTeamHandler ~ employeeNotInMembers:",
//   employeeNotInMembers
// );
// if (employeeNotInMembers.length) {
//   for (let i = 0; i < employeeNotInMembers.length; i++) {
//     const employee = await Employee.findById(employeeNotInMembers[i]);
//     if (!employee) throw new BadRequestError("Employee not found");
//     employee.team = [];
//     await employee.save();
//   }
// }
