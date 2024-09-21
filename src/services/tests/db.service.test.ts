// import { vi } from 'vitest';
import { Sequelize } from 'sequelize';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
// import { config } from '@/config';
import models from '@src/models';
import logger from '@src/services/logger.service';
import dbService from '@src/services/db.service';

vi.mock('sequelize');
vi.mock('fs');
vi.mock('path');
vi.mock('../config');
vi.mock('../models');
// vi.mock('./logger.service');

global.process.exit = vi.fn() as any;

describe('dbService', () => {
  const spyOnDbAuthenticate = vi.spyOn(dbService.db.sequelize, 'authenticate');
  const spyOnLoggerInfo = vi.spyOn(logger, 'info');
  const spyOnLoggerError = vi.spyOn(logger, 'error');

  afterEach(() => {
    vi.clearAllMocks();
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
      // const initModel = vi.fn().mockReturnValue('model');
      const initModel = vi.fn().mockReturnValue('model');

      const mockModels = {
        group: initModel,
        user: initModel,
      };

      await dbService.defineModels(mockModels);

      expect(initModel).toHaveBeenCalledTimes(2);
      expect(dbService.db.group).toBeDefined();
      expect(dbService.db.user).toBeDefined();
    });
  });
});
