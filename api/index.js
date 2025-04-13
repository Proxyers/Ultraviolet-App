import { createBareServer } from '@mercuryworkshop/bare-mux';
import { createServer } from 'node:http';
import { uv } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { createTransport } from '@mercuryworkshop/epoxy-transport';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const server = createBareServer('/bare/');
uv(server, {
prefix: '/',
bare: server,
publicPath: join(__dirname, '../public'),
transport: createTransport()
});

export default function handler(req, res) {
server.emit('request', req, res);
}
