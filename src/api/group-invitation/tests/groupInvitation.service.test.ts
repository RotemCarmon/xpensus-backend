import { groupInvitationService } from '../groupInvitation.service';
import { GroupInvitationModel } from '@src/models';
import * as utils from '@src/services/utils/common';
import * as dateFns from 'date-fns';

vi.mock('./user.service');
vi.mock('./groupMember.service');
vi.mock('./invitation.service');
vi.mock('date-fns');

describe('groupInvitationService', () => {
  describe('createInvitation', () => {
    test('should create invitation', async () => {
      const token = 'token';
      const date = new Date();
      const email = 'test@test.com';

      const spyOnCreateGroupInvitation = vi.spyOn(GroupInvitationModel, 'create').mockImplementation(() => {});
      vi.spyOn(utils, 'generateUniqueToken').mockReturnValue('token');
      vi.spyOn(dateFns, 'subWeeks').mockReturnValue(date);

      await groupInvitationService.createInvitation({
        groupId: 1,
        userId: 1,
        email,
        invitedBy: 1,
      });

      expect(spyOnCreateGroupInvitation).toHaveBeenCalledWith({
        groupId: 1,
        invitedBy: 1,
        userId: 1,
        email,
        token,
        isRegistered: true,
        expiresAt: date,
      });
    });
  });
});
