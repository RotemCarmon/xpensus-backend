var config: Config;
import { Config } from './Config';
import { dev } from './dev';
import { prod } from './prod';

if (process.env.NODE_ENV === 'production') {
  config = prod;
} else {
  config = dev;
}

export default config;
