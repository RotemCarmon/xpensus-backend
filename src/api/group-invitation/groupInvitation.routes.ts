import express from 'express';
import groupInvitationController from './groupInvitation.controller';
import requireAuthToken from '@src/middlewares/require-auth-token.middleware';

const router = express.Router();

router.post('/invite', requireAuthToken, groupInvitationController.invite);
router.get('/accept', (req, res) => {
  console.log('Group invitation accepted with token:', req.query.token);
  res.send('Group invitation accepted');
});
export default router;
