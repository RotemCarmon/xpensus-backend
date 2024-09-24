import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Group as GroupAttributes, GroupStatus } from '../../types/Group';
import { User } from './user.model';
import { GroupMember } from './groupMember.model';
import { GroupInvitation } from './groupInvitation.model';

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public color?: string;
  public image?: string;
  public status!: GroupStatus;
  public createdBy!: number;
  public createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Group.belongsToMany(User, { through: GroupMember, as: 'members', foreignKey: 'groupId', otherKey: 'userId' });
    Group.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
    Group.hasMany(GroupInvitation, { foreignKey: 'groupId' });
  }
}

export const initModel = (sequelize: Sequelize): typeof Group => {
  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(GroupStatus),
        allowNull: false,
        defaultValue: GroupStatus.ACTIVE,
      },
      createdBy: {
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      tableName: 'groups',
    }
  );

  return Group;
};
