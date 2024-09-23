import { NextFunction, Response } from 'express';
import { groupInvitationService } from './groupInvitation.service';
import errors from '@error';
import { ExpressRequest } from '@src/types/ExpressRequest';
const { InternalError } = errors;

async function invite(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const { groupId, userEmail } = req.body;
    const user = req.user;
    const invitation = await groupInvitationService.invite({ groupId, userEmail, invitedBy: user });
    res.json(invitation);
  } catch (error: any) {
    next(new InternalError(error.message));
  }
}

export default {
  invite,
};
