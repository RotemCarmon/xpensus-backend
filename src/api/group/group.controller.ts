import { NextFunction, Request, Response } from 'express';
import errors from '@error';
import { groupService } from './group.service';
const { BadRequestError } = errors;

async function getGroups(req: Request, res: Response, next: NextFunction) {
  try {
    const filterBy = req.query;
    const groups = await groupService.getGroups(filterBy);
    res.json(groups);
  } catch (error: any) {
    next(new BadRequestError(error.message));
  }
}

async function getGroupById(req: Request, res: Response, next: NextFunction) {
  try {
    const { groupId } = req.params;

    const group = await groupService.getGroupById(Number(groupId));
    res.json(group);
  } catch (error: any) {
    next(new BadRequestError(error.message));
  }
}

async function createGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const group = req.body;
    const newGroup = await groupService.createGroup(group);
    res.json(newGroup);
  } catch (error: any) {
    next(new BadRequestError(error.message));
  }
}

export default {
  getGroups,
  getGroupById,
  createGroup
};
