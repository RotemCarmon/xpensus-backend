export interface GroupMember {
  id: number;
  groupId: number;
  userId: number
  status: MemberStatus;
  joinedAt: Date;
  leftAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum MemberStatus {
  INVITED = 'invited',
  JOINED = 'joined',
  DECLINED = 'declined',
  REMOVED = 'removed',
  LEFT = 'left',
  PENDING_REGISTRATION = 'pending_registration',
  ADMIN = 'admin',
}
