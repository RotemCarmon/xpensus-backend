import { initModel as groupInitModel } from './entities/group.model';
import { initModel as userInitModel } from './entities/user.model';
import { initModel as groupMemberInitModel } from './entities/groupMember.model';
import { initModel as groupInvitationInitModel } from './entities/groupInvitation.model';

export default {
  group: groupInitModel,
  user: userInitModel,
  groupInvitation: groupInvitationInitModel,
  groupMember: groupMemberInitModel,
};
