import { Roles } from '@src/types/Role';
import errors from '../models/errors';
import { NextFunction, Request, Response } from 'express';
import { ExpressRequest } from '@src/types/ExpressRequest';
const { ForbiddenError, UnauthorizedError } = errors;

function requireRoles(role: Roles) {
  return (req: ExpressRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new UnauthorizedError('User is not authorized please login'));
    }
    // role value is in a ascending order so for every role all values above it can access too.
    if (user.role < role) {
      return next(new ForbiddenError(`Role not permitted to perform this action`));
    }
    next();
  };
}

const requireVoAdmin = requireRoles(Roles.VoAdmin);
const requireOrgAdmin = requireRoles(Roles.OrgAdmin);
const requireMasterAdmin = requireRoles(Roles.MasterAdmin);

export default {
  requireVoAdmin,
  requireOrgAdmin,
  requireMasterAdmin,
  requireRoles,
};
