export interface GroupMember {
  id: number;
  groupId: number;
  userId: number | null;
  invitationId: number | null;
  status: GroupMemberStatus;
  joinedAt: Date | null;
  leftAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupMemberCreationAttributes extends Omit<GroupMember, 'id' | 'createdAt' | 'updatedAt' | 'leftAt' | 'joinedAt'> {}

export enum GroupMemberStatus {
  INVITED = 'invited',
  JOINED = 'joined',
  DECLINED = 'declined',
  REMOVED = 'removed',
  LEFT = 'left',
  PENDING_REGISTRATION = 'pending_registration',
  ADMIN = 'admin',
}
