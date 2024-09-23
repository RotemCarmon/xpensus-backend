import { Op } from 'sequelize';
import { Group } from '@src/types/Group';
import dbService from '@src/services/db.service';
import { Criteria } from '@src/types/Common';
const { db } = dbService;

async function getGroups(filterBy = {}): Promise<Group[]> {
  const criteria = buildCriteria(filterBy);
  const groups = await db.group.findAll(criteria);
  return groups;
}

async function getGroupById(groupId: number): Promise<Group | null> {
  const group = await db.group.findByPk(groupId);
  return group;
}

async function createGroup(group: Group): Promise<Group> {
  return db.group.create(group);
}

export const groupService = {
  getGroups,
  getGroupById,
  createGroup
};

function buildCriteria(filter: any) {
  const criteria: Criteria = {
    where: {},
    order: [],
  };

  if (filter.sort) {
    // sort = {key: string, direction: ASC | DESC}
    criteria.order = [[filter.sort.key, filter.sort.direction]];
  }

  if (filter.name) {
    criteria.where.name = {
      [Op.iLike]: `%${filter.name}%`,
    };
  }

  if (filter.description) {
    criteria.where.description = filter.description;
  }

  if (filter.createdBy) {
    criteria.where.createdBy = filter.createdBy;
  }
  if (filter.status) {
    criteria.where.status = filter.status;
  }

  return criteria;
}
