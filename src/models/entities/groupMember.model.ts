import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { GroupMember as GroupMemberAttributes, GroupMemberStatus } from '../../types/GroupMember';
import dbService from '@src/services/db.service';

interface GroupMemberCreationAttributes extends Optional<GroupMemberAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class GroupMember extends Model<GroupMemberAttributes, GroupMemberCreationAttributes> implements GroupMemberAttributes {
  id!: number;
  groupId!: number;
  userId!: number | null;
  invitationId!: number | null;
  status!: GroupMemberStatus;
  joinedAt!: Date | null;
  leftAt!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export const initModel = (sequelize: Sequelize): typeof GroupMember => {
  GroupMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: dbService.db.group,
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: dbService.db.user,
          key: 'id',
        },
      },
      invitationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: dbService.db.groupInvitation,
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM(),
        values: Object.values(GroupMemberStatus),
        allowNull: false,
        defaultValue: GroupMemberStatus.INVITED,
      },
      joinedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      leftAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'GroupMember',
      tableName: 'group_member',
      timestamps: true,
    }
  );

  return GroupMember;
};
