import { createBareServer } from '@mercuryworkshop/bare-mux';
import { createServer } from 'node:http';
import { uv } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { createTransport } from '@mercuryworkshop/epoxy-transport';
import fastifyStatic from '@fastify/static'; // 如果需要支持静态文件

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const server = createBareServer('/bare/');
uv(server, {
prefix: '/',
bare: server,
publicPath: join(__dirname, '../public'), // 确保 public 文件夹存在并且有静态资源
transport: createTransport()
});

// 注册静态文件插件（如果需要）
fastify.register(fastifyStatic, {
root: join(__dirname, '../public'),
prefix: '/public/',
});

export default function handler(req, res) {
server.emit('request', req, res);
}
