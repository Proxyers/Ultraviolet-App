// api/index.js
import Fastify from 'fastify';
import { join } from 'path';
import fastifyStatic from '@fastify/static';

// 创建 Fastify 实例
const fastify = Fastify({
logger: true
});

// 注册静态文件插件
fastify.register(fastifyStatic, {
root: join(__dirname, 'public'), // 假设您有一个 'public' 文件夹用于存放静态文件
prefix: '/public/', // 所有静态文件的 URL 路径前缀
});

// 根路径请求处理
fastify.get('/', async (request, reply) => {
return { message: 'Welcome to Ultraviolet!' }; // 根路径返回欢迎消息
});

// 其他示例路由
fastify.get('/hello', async (request, reply) => {
return { message: 'Hello, World!' }; // 示例：自定义路径返回消息
});

// 启动 Fastify 服务
const start = async () => {
try {
await fastify.listen(3000);
console.log('Server listening at http://localhost:3000');
} catch (err) {
fastify.log.error(err);
process.exit(1);
}
};

// 启动 Fastify
start();

export default fastify;
