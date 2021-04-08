async function authRouter(fastify, opts) {
  fastify.post('/', async (request, reply) => {
    const { email, username, userId } = request.body;
    if (!email || !username || !userId) {
      reply.status(400).send({ error: true, msg: 'OOPS' });
    }
  
    const token = fastify.jwt.sign({ email, username, userId }, { expiresIn: 86400 });
    reply.send({ token, email, userId });
  });
}

module.exports = authRouter;