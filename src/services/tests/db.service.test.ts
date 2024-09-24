import logger from '@logger';
import dbService from '@src/services/db.service';
import * as modelsIndex from '@src/models';

vi.mock('sequelize');
vi.mock('fs');
vi.mock('path');
vi.mock('../config');
vi.mock('@logger');

global.process.exit = vi.fn() as any;

describe('dbService', () => {
  const spyOnDbAuthenticate = vi.spyOn(dbService.sequelize, 'authenticate');
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

    test('should initialize models after authenticating with the database', async () => {
      const spyOnInitModels = vi.spyOn(modelsIndex, 'initModels');
      await dbService.connect();

      expect(spyOnInitModels).toHaveBeenCalled();
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


});
