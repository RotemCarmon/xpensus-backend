import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { GroupInvitation as GroupInvitationAttributes, GroupInvitationStatus } from '../../types/GroupInvitation';
import { User } from './user.model';
import { Group } from './group.model';

interface GroupInvitationCreationAttributes extends Optional<GroupInvitationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'status'> {}

export class GroupInvitation extends Model<GroupInvitationAttributes, GroupInvitationCreationAttributes> implements GroupInvitationAttributes {
  public id!: number;
  public email!: string;
  public groupId!: number;
  public userId!: number | null;
  public isRegistered!: boolean;
  public acceptedAt!: Date | null;
  public declinedAt!: Date | null;
  public expiresAt!: Date;
  public token!: string;
  public status!: GroupInvitationStatus;
  public invitedBy!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate() {
    GroupInvitation.belongsTo(Group, { foreignKey: 'groupId' });
    GroupInvitation.belongsTo(User, { foreignKey: 'userId' });
    GroupInvitation.belongsTo(User, { as: 'invitedByUser', foreignKey: 'invitedBy' });
  }
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
        allowNull: false,
        references: {
          model: Group,
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
      },
      invitedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
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
      expiresAt: {
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
