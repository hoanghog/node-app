require('dotenv').config();
require('express-async-errors');

import express from 'express';
import config from 'config';
import ActuatorService from './services/actuator-service';
import actuator from 'express-actuator';

import Redis from './lib/redis';

import redisRouter from './routes/redis-router';

export const routes: string[] = [];

async function start() {
  await Redis.redisInitialization();

  const PORT = 3001;
  const app = express();
  const port = config.get<string>('server.port') || PORT;
  app.use(
    actuator({
      basePath: '/mngmt',
      infoGitMode: 'full',
      customEndpoints: [
        {
          id: 'readiness',
          controller: async (req, res) => {
            try {
              await ActuatorService.isReady();
              res.sendStatus(200);
            } catch (e) {
              res.sendStatus(502);
            }
          }
        },
        {
          id: 'liveness',
          controller: async (req, res) => {
            try {
              await ActuatorService.isReady();
              res.sendStatus(200);
            } catch (e) {
              res.sendStatus(502);
            }
          }
        }
      ]
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '50mb' }));

  app.use('/redis', redisRouter);


  app.listen(port);
  console.log(`Listenning on ${port} port.`);
}

start();
