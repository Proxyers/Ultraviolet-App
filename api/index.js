import { createServer } from "node:http";
import { hostname } from "node:os";
import wisp from "wisp-server-node";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

import { publicPath } from "ultraviolet-static";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const fastify = Fastify({
serverFactory: (handler) => {
return createServer()
.on("request", (req, res) => {
res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
handler(req, res);
})
.on("upgrade", (req, socket, head) => {
if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
else socket.end();
});
},
});

fastify.register(fastifyStatic, {
root: publicPath,
decorateReply: true,
});

fastify.get("/uv/uv.config.js", (req, res) => {
return res.sendFile("uv/uv.config.js", publicPath);
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
await fastify.ready();
fastify.server.emit("request", req, res);
}
