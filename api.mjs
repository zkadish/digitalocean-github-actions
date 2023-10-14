#!/usr/bin/env node

import Fastify from 'fastify';
const fastify = Fastify({
  logger: true
});
let die = false;
const id = Math.floor(Math.random()*1000);

fastify.get('/', async () => ({ api: 'happy response', id }));

fastify.get('/health', async (_req, reply) => {
  if (die) {
    reply.code(503).send({ status: 'shutdown' });
  } else {
    reply.code(200).send({ status: 'ok' });
  }
});

// Run the server!
fastify.get('/shutdown', async () => {
  die = true;
  return { shutdown: true };
});

fastify.listen({ port: 80 }, (err, address) => {
  if (err) throw err
  console.log(`Server is now listening on ${address}`);
})
