import express from 'express';
import groupController from './group.controller';

const router = express.Router();

router.get('/', groupController.getGroups);
router.get('/:groupId', groupController.getGroupById);

export default router;
