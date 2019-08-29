import { KitesInstance } from '@kites/core';
import { Express } from '@kites/express';

/**
 * Routes management
 *
 * @param {kites} kites
 */
function appRoutes(kites: KitesInstance) {
  kites.on('express:config', (app: Express) => {
    kites.logger.info('Configure page views ...');

    // quick setup
    app.get('/', (req, res) => res.view('index'));
    app.get('/admin', (req, res) => res.view('admin'));
    app.get('/about', (req, res) => res.view('about'));
  });
}

export {
  appRoutes,
};
