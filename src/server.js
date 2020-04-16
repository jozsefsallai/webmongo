import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT } = process.env;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(compression({ threshold: 0 }));
app.use(express.static('static'));
app.use(sapper.middleware());

app.listen(PORT);

export default app;
