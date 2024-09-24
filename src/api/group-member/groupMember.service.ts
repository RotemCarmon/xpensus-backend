import { GroupMemberModel } from '@src/models';
import { GroupMember, GroupMemberCreationAttributes } from '@src/types/GroupMember';

async function createGroupMember(memberToCreate: GroupMemberCreationAttributes): Promise<GroupMember> {
  return GroupMemberModel.create(memberToCreate);
}

export const groupMemberService = {
  createGroupMember,
};
