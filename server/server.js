const fastify = require('fastify')({ logger: true });
const authRouter = require('./router/authRouter');
const router = require('./router/router');
fastify.register(require('fastify-jwt'), {
  secret: "secretKey", 
});


fastify.register(require('fastify-cors'), {
  origin: '*',
});

/**
 * Works as a body-parser for request body
 */
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
  try {
    const json = JSON.parse(body);
    done(null, json);
  } catch (err) {
    err.statusCode = 400;
    done(err, undefined);
  }
});
fastify.register(require('./middleware/auth_middleware'));
fastify.register(authRouter);
fastify.register(router);



const start = async () => {
  try {
    await fastify.listen(5000,'0.0.0.0');
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

module.exports = fastify;