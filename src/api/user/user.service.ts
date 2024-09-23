import dbService from '@src/services/db.service';
import { Criteria, FilterAttributes } from '@src/types/Common';

async function getUserBy(filter: FilterAttributes) {
  const criteria = createCriteria({ filter });
  return dbService.db.user.findOne(criteria);
}

async function getUserById(id: string) {
  return dbService.db.user.findByPk(id);
}

async function createUser(user: any) {
  return dbService.db.user.create(user);
}

export const userService = {
  getUserById,
  getUserBy,
  createUser
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
