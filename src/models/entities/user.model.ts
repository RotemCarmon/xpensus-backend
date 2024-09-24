import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User as UserAttributes, UserStatus } from '../../types/User';
import { Group } from './group.model';
import { GroupMember } from './groupMember.model';
import { GroupInvitation } from './groupInvitation.model';

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public username!: string;
  public status!: UserStatus;
  public lastLoginAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate() {
    User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId', otherKey: 'groupId' });
    User.hasMany(Group, { as: 'createdGroups', foreignKey: 'createdBy' });
    User.hasMany(GroupInvitation, { foreignKey: 'userId' });
    User.hasMany(GroupInvitation, { as: 'invitedGroupInvitations', foreignKey: 'invitedBy' });
  }
}

export const initModel = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      status: {
        type: DataTypes.ENUM,
        values: Object.values(UserStatus),
        allowNull: false,
        defaultValue: UserStatus.ACTIVE,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );

  return User;
};
