import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';

import { Db, MongoClient } from 'mongodb';
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
let db : Db;

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const commonEngine = new CommonEngine();
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(express.static(browserDistFolder, {maxAge: '1y', index: false,}));

  client.connect()
    .then(client => {
			db = client.db("ECOMMERCE");
		
      server.get('/api/homepage', (_, res) => {
        console.log('/api/homepage');
        res.json([
          {"rayon":"Téléphonie", "promotion":0},
          {"rayon":"Informatique", "promotion":15}
        ]);
      });

      server.get('/api/products', async (_, res) => {
        console.log('/api/products');
        let documents = await db.collection("articles").find().toArray();
        res.json(documents);
      });

      server.get('{*splat}', async (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req;
        console.log("Route SSR :", req.params.splat);

        commonEngine
          .render({
            bootstrap,
            documentFilePath: indexHtml,
            url: originalUrl, /*`${protocol}://${headers.host}${originalUrl}`,*/
            publicPath: browserDistFolder,
            providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
          })
          .then((html) => res.send(html))
          .catch((err) => next(err));
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();