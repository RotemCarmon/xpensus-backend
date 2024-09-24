import { FindOptions, Op } from 'sequelize';
import { Group } from '@src/types/Group';
import { Criteria } from '@src/types/Common';
import { GroupModel } from '@src/models';

async function getGroups(filterBy = {}): Promise<Group[]> {
  const criteria = buildCriteria(filterBy);
  const groups = await GroupModel.findAll(criteria as FindOptions<Group>);
  return groups;
}

async function getGroupById(groupId: number): Promise<Group | null> {
  const group = await GroupModel.findByPk(groupId);
  return group;
}

async function createGroup(group: Group): Promise<Group> {
  return GroupModel.create(group);
}

export const groupService = {
  getGroups,
  getGroupById,
  createGroup,
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
