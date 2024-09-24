import { subWeeks } from 'date-fns';
import config from '@src/config';
import { GroupInvitationModel } from '@src/models';
import { groupService } from '@src/api/group/group.service';
import { groupMemberService } from '../group-member/groupMember.service';
import { userService } from '../user/user.service';
import { emailService } from '@src/services/email/email.service';
import { generateUniqueToken } from '@src/services/utils/common';
import { User, UserStatus } from '@src/types/User';
import { GroupMemberCreationAttributes } from '@src/types/GroupMember';
import { GroupMemberStatus } from '@src/types/GroupMember';

export interface inviteProps {
  groupId: number;
  userEmail: string;
  invitedBy: User;
}

export interface createInvitationProps {
  groupId: number;
  userId?: number;
  email: string;
  invitedBy: number;
}

async function invite({ groupId, userEmail, invitedBy }: inviteProps) {
  const group = await groupService.getGroupById(groupId);
  if (!group) {
    throw new Error('Group not found');
  }

  const user = await userService.getUserBy({ email: userEmail, status: UserStatus.ACTIVE });

  // create invitation
  const invitation = await createInvitation({ groupId, userId: user?.id, email: userEmail, invitedBy: invitedBy?.id });
  if (!invitation) {
    throw new Error('Failed to create invitation');
  }

  // prepare group member to create
  const groupMemberToCreate: GroupMemberCreationAttributes = {
    groupId,
    invitationId: invitation.id,
    userId: null,
    status: GroupMemberStatus.INVITED,
  };

  if (user) {
    groupMemberToCreate.userId = user.id;
  } else {
    groupMemberToCreate.status = GroupMemberStatus.PENDING_REGISTRATION;
  }

  // create group member
  const groupMember = await groupMemberService.createGroupMember(groupMemberToCreate);
  if (!groupMember) {
    throw new Error('Failed to create group member');
  }

  // send email
  emailService.send({
    receiver: userEmail,
    data: {
      groupName: group.name,
      link: `${config.apiUrl}/api/group-invitation/accept?token=${invitation.token}`,
      inviter: invitedBy.email,
    },
    templateName: 'groupInvitation',
  });

  return invitation;
}

async function createInvitation({ groupId, userId, email, invitedBy }: createInvitationProps) {
  const expiresAt = subWeeks(new Date(), 1);

  const invitationToCreate = {
    groupId,
    userId,
    token: generateUniqueToken(),
    isRegistered: !!userId,
    email,
    invitedBy,
    expiresAt,
  };

  return GroupInvitationModel.create(invitationToCreate);
}

export const groupInvitationService = {
  invite,
  createInvitation,
};
