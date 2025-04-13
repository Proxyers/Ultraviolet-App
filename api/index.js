import { createServer } from "node:http";
import { join } from "node:path";
import { hostname } from "node:os";
import wisp from "wisp-server-node";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

// 引入静态资源路径
import { publicPath } from "ultraviolet-static";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const fastify = Fastify();

// 注册静态资源
fastify.register(fastifyStatic, {
root: publicPath,
decorateReply: true,
});
fastify.register(fastifyStatic, {
root: uvPath,
prefix: "/uv/",
decorateReply: false,
});
fastify.register(fastifyStatic, {
root: epoxyPath,
prefix: "/epoxy/",
decorateReply: false,
});
fastify.register(fastifyStatic, {
root: baremuxPath,
prefix: "/baremux/",
decorateReply: false,
});

export default async function handler(req, res) {
await fastify.ready(); // 确保插件已注册
fastify.server.emit("request", req, res);
}
