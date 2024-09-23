import logger from '@src/services/logger.service';
import dbService from '@src/services/db.service';
import { Model } from 'sequelize';

vi.mock('sequelize');
vi.mock('fs');
vi.mock('path');
vi.mock('../config');
vi.mock('../models');

global.process.exit = vi.fn() as any;

describe('dbService', () => {
  const spyOnDbAuthenticate = vi.spyOn(dbService.db.sequelize, 'authenticate');
  const spyOnLoggerInfo = vi.spyOn(logger, 'info');
  const spyOnLoggerError = vi.spyOn(logger, 'error');

  afterEach(() => {
    vi.clearAllMocks();
  });
  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('connect', () => {
    test('should authenticate with the database', async () => {
      await dbService.connect();

      expect(spyOnDbAuthenticate).toHaveBeenCalled();
      expect(spyOnLoggerInfo).toHaveBeenCalledWith('[ DB SERVICE ] Database connected successfully!');
    });

    test('should log an error and exit process if authentication fails', async () => {
      spyOnDbAuthenticate.mockRejectedValue(new Error('Authentication failed'));
      const spyOnExitProces = vi.spyOn(process, 'exit');

      await dbService.connect();

      expect(spyOnDbAuthenticate).toHaveBeenCalled();
      expect(spyOnLoggerError).toHaveBeenCalledWith('[ DB SERVICE ] Unable to connect to the database: Authentication failed');
      expect(spyOnExitProces).toHaveBeenCalled();
    });
  });

  describe('defineModels', () => {
    test('should initialize all models', async () => {
      const initModel = vi.fn().mockReturnValue({
        belongsToMany: vi.fn(),
        belongsTo: vi.fn(),
        hasMany: vi.fn(),
      } as unknown as Model);

      const mockModels = {
        group: initModel,
        user: initModel,
        groupInvitation: initModel,
        groupMember: initModel,
      };

      await dbService.defineModels(mockModels);

      expect(initModel).toHaveBeenCalledTimes(4);
      expect(dbService.db.group).toBeDefined();
      expect(dbService.db.user).toBeDefined();
    });
  });
});
