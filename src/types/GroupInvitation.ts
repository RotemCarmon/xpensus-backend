export interface GroupInvitation {
  id: string;
  email: string;
  groupId: number;
  userId: number | null;
  isRegistered: boolean;
  acceptedAt: Date | null;
  declinedAt: Date | null;
  expiredAt: Date;
  token: string;
  status: GroupInvitationStatus;
  invitedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum GroupInvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired',
}
