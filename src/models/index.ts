import { Sequelize } from 'sequelize';

import { Group, initModel as initGroupModel } from './entities/group.model';
import { User, initModel as initUserModel } from './entities/user.model';
import { GroupMember, initModel as initGroupMemberModel } from './entities/groupMember.model';
import { GroupInvitation, initModel as initGroupInvitationModel } from './entities/groupInvitation.model';

export function initModels(sequelize: Sequelize) {
  const groupModel = initGroupModel(sequelize);
  const userModel = initUserModel(sequelize);
  const groupInvitationModel = initGroupInvitationModel(sequelize);
  const groupMemberModel = initGroupMemberModel(sequelize);

  groupModel.associate?.();
  userModel.associate?.();
  groupInvitationModel.associate?.();
  groupMemberModel.associate?.();
}

export { GroupMember as GroupMemberModel, Group as GroupModel, User as UserModel, GroupInvitation as GroupInvitationModel };
