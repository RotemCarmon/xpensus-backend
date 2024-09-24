import { Criteria, FilterAttributes } from '@src/types/Common';
import { User } from '@src/types/User';
import { UserModel } from '@src/models';
import { FindOptions } from 'sequelize';

async function getUserBy(filter: FilterAttributes): Promise<UserModel | null> {
  const criteria = createCriteria(filter);
  return UserModel.findOne(criteria as FindOptions<User>);
}

async function getUserById(id: string): Promise<UserModel | null> {
  return UserModel.findByPk(id);
}

async function createUser(user: any): Promise<UserModel> {
  return UserModel.create(user);
}

export const userService = {
  getUserById,
  getUserBy,
  createUser,
};

function createCriteria(filter: FilterAttributes) {
  const criteria: Criteria = {
    where: {},
    order: [],
  };
  if (filter.email) {
    criteria.where.email = filter.email;
  }
  return criteria;
}
