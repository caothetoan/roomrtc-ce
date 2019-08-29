import { KitesFactory, KitesInstance } from '@kites/core';
import Express from '@kites/express';
import Rest from '@kites/rest';
import { UserService } from './api';

import { MongoDbServerDev, appRoutes } from './content/extensions';

async function bootstrap() {
  const app = await KitesFactory
    .create({
      loadConfig: true,
      providers: [
        UserService,
        // TextService,
      ],
    })
    .use(Express)
    .use(Rest)
    .use(appRoutes)
    .use(MongoDbServerDev)
    .ready((kites: KitesInstance) => {
      kites.logger.info('Extra config app when ready!');

      kites.express.app.use((err, req, res, next) => {
        console.error('Error: ', err);
        res.status(500).json(err.message);
      });
    })
    .init();

  app.logger.info(`Server started!`);
}

bootstrap();
