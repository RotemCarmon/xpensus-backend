
import config from '../config';
import loggerService from '@src/services/logger.service';

import { createClient } from 'redis';

let isInitialized = false;

export const redisClient = createClient({
    url: config.redis.url
})


async function init() {
    if (isInitialized) {
        return;
    }
    try {
        // Add logging to understand the connection process
        loggerService.debug('Initializing Redis Client...');

        redisClient.on('connect', () => {
            loggerService.info(`[ REDIS SERVICE ] Redis connected`);
        });

        redisClient.on('ready', () => {
            loggerService.debug('[ REDIS SERVICE ] Redis client ready');
        });

        redisClient.on('end', () => {
            loggerService.debug('[ REDIS SERVICE ] Redis connection closed');
        });

        redisClient.on('reconnecting', (delay) => {
            loggerService.debug(`[ REDIS SERVICE ] Reconnecting to Redis in ${delay}ms`);
        });

        redisClient.on('error', (error) => {
            loggerService.error(`[ REDIS SERVICE ] Redis error: ${error.message}`);
        });

        // Explicitly wait for the client to be ready
        await redisClient.connect();

        isInitialized = true;
        return 'success';
    } catch (err: any) {
        loggerService.error(`[ REDIS SERVICE ] Unable to connect to Redis: ${err.message}`);
        return 'failure';
    }
}

const setTokenOnBlackList = (key: string, ttl: number) => {
    return redisClient.set(key, 'blacklisted', { EX: ttl })
}

const getTokenFromBlackList = (key: string) => {
    return redisClient.get(key)
}

export default {
    init,
    setTokenOnBlackList,
    getTokenFromBlackList
};