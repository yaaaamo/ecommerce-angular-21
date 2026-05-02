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


  // Sert les fichiers statiques (JS bundlés, CSS, images). 
  // Le index: false est crucial: il empêche Express de servir automatiquement index.html pour la route /, 
  // ce qui laisse passer les requêtes vers le SSR.

  server.use(express.static(browserDistFolder, {maxAge: '1y', index: false,}));

  client.connect()
    .then(client => {
			db = client.db("ECOMMERCE");
		
      server.get('/api/homepage', async (_, res) => {
        console.log('/api/homepage');
        let docs = await db.collection("rayons").find().toArray();
        res.json(docs);

      });

      server.get('/api/products', async (_, res) => {
        console.log('/api/products');
        let documents = await db.collection("articles").find().toArray();
        res.json(documents);
      });

      server.get('/api/catalogue/:rayon/:marque/:prixMax', async (req, res) => {
        console.log('/api/catalogue', req.params);
        const filtre: any = {};
        if (req.params.rayon !== '*')  filtre.rayon  = req.params.rayon;
        if (req.params.marque !== '*') filtre.marque = req.params.marque;
        filtre.prix = { $lte: parseFloat(req.params.prixMax) };

        const documents = await db.collection("articles")
          .find(filtre, { projection: { _id: 0 } })
          .toArray();
        res.json(documents);
      });

      // Endpoint catch-all SSR
      server.get('{*splat}', async (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req;
        console.log("Route SSR :", req.params.splat);
        console.log("SSR catch-all hit:", req.originalUrl);

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