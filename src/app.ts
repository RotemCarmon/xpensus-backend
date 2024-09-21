import * as moduleAlias from 'module-alias';

// --- Register aliases ---
moduleAlias.addAliases({
  '@src': __dirname, // Assuming your dist structure mirrors your src structure
  '@logger': __dirname + '/services/logger.service', // Adjust the path as needed
});

import app from './server';
import logger from './services/logger.service';

const port = process.env.PORT || 3535;
app.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});
