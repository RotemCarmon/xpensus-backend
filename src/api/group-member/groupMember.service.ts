import dbService from '@src/services/db.service';
import { GroupMember, GroupMemberCreationAttributes } from '@src/types/GroupMember';
const { db } = dbService;

async function createGroupMember(memberToCreate: GroupMemberCreationAttributes): Promise<GroupMember> {
  return db.groupMember.create(memberToCreate);
}

export const groupMemberService = {
  createGroupMember,
};
