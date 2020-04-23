import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import compression from 'compression';
import * as sapper from '@sapper/server';

import { v4 as uuidv4 } from 'uuid';

const { PORT } = process.env;
const app = express();

app.use(function (req, res, next) {
  res.locals.nonce = uuidv4();
  next();
});

app.use(function (req, res, next) {
  res.setHeader('X-Webmongo', 'Ad finitium.');
  next();
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        `'self'`,
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'localhost:10000'  // dev server (hot reloading, etc. )
      ],
      scriptSrc: [
        `'self'`,
        (req, res) => `'nonce-${res.locals.nonce}'`,
        `blob:`  // workaround for sapper + rollup/shimport generating blob: imports
      ]
    }
  }
}));

app.use(bodyParser.json());
app.use(compression({ threshold: 0 }));
app.use(express.static('static'));
app.use(sapper.middleware());

app.listen(PORT);

export default app;
