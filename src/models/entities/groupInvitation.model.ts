import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { GroupInvitation as GroupInvitationAttributes, GroupInvitationStatus } from '../../types/GroupInvitation';
import dbService from '@src/services/db.service';

interface GroupInvitationCreationAttributes extends Optional<GroupInvitationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class GroupInvitation extends Model<GroupInvitationAttributes, GroupInvitationCreationAttributes> implements GroupInvitationAttributes {
  public id!: string;
  public email!: string;
  public groupId!: number;
  public userId!: number | null;
  public isRegistered!: boolean;
  public acceptedAt!: Date | null;
  public declinedAt!: Date | null;
  public expiredAt!: Date;
  public token!: string;
  public status!: GroupInvitationStatus;
  public invitedBy!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export const initModel = (sequelize: Sequelize): typeof GroupInvitation => {
  GroupInvitation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
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
      invitedBy: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: dbService.db.user,
          key: 'id',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRegistered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      acceptedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      declinedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM(),
        values: Object.values(GroupInvitationStatus),
        allowNull: false,
        defaultValue: GroupInvitationStatus.PENDING,
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
      modelName: 'GroupInvitation',
      tableName: 'group_invitation',
      timestamps: true,
    }
  );

  return GroupInvitation;
}
