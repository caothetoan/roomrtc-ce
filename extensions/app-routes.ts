import { KitesInstance } from '@kites/core';
import { Express } from '@kites/express';

/**
 * Routes management
 *
 * @param {kites} kites
 */
function AppRoutes(kites: KitesInstance) {
  kites.on('express:config', (app: Express) => {
    kites.logger.info('Configure page views ...');

    // quick setup
    app.get('/', (req, res) => res.view('index'));
    app.get('/admin', (req, res) => res.view('admin'));
    app.get('/about', (req, res) => res.view('about'));

    // live channel or conference room
    app.get('/live/:channel', (req, res) => res.view('live'));

    // error handler
    app.use((err, req, res, next) => {
      kites.logger.error('Error: ', err);
      res.status(500).json(err.message);
    });
  });

  /**
   * Cấu hình file tĩnh
   */
  kites.on('express:config:static', async (app: Express) => {
    const e = await import('express');
    app.use(e.static('build/client'));
  });
}

export {
  AppRoutes,
};
