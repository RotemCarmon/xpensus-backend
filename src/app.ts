import * as moduleAlias from 'module-alias';

// --- Register aliases ---
moduleAlias.addAliases({
  '@src': __dirname,
  '@logger': __dirname + '/services/logger.service',
  '@error': __dirname + '/models/errors',
});

import app from './server';
import logger from './services/logger.service';

const port = process.env.PORT || 3535;
app.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});
