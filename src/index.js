// @flow
import app from './app';
import getPort from './helpers/getPort';

const port: number = getPort();

app.listen(port, (): Server => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
