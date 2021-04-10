const fastify = require('fastify')({ logger: true });

fastify.register(require("fastify-jwt"), {
    secret: "supersecret"
});

fastify.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
});

fastify.register(require('fastify-cors'), {
    origin: '*',
});

fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://admin:password@localhost/authdb'
});

fastify.post('/auth', (req, reply) => {
    const { username, password } = req.body;

    fastify.pg.connect(onConnect);

    function onConnect(err, client, release) {
        if (err) return reply.send(err);

        client.query(
            'SELECT username, password, id FROM users WHERE username=$1 AND password=$2', [
            username, password],
            (error, result) => {
                release();

                const isInvalid = !result || !result.rows || !result.rows.length;

                if (error || isInvalid) {
                    reply.send(error || new Error('Invalid username or password'));
                    return;
                }

                const token = fastify.jwt.sign({ username, user_id: result.rows[0].id });
                reply.send({ token });
            });
    }
})

fastify.post('/register', (req, reply) => {
    const { username, password } = req.body;

    fastify.pg.connect(onConnect);

    function onConnect(err, client, release) {
        if (err) return reply.send(err);

        client.query(
            'INSERT INTO users (username, password) VALUES ($1,$2)',
            [username, password],
            (error, result) => {
                release();
                reply.send(error || result);
            }
        );
    }
});

fastify.post('/timeslot', { preValidation: [fastify.authenticate] }, (req, reply) => {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    let user_id = null;

    fastify.jwt.verify(token, (err, decoded) => {
        if (err) fastify.log.error(err);

        user_id = decoded.user_id;
        fastify.pg.connect(onConnect);
    });

    function onConnect(err, client, release) {
        if (err) return reply.send(err);
        const { value } = req.body;

        const saveSlots = (error, result) => {
            const updateSql = 'UPDATE slots SET value = $1 WHERE user_id = $2;';
            const insertSql = 'INSERT INTO slots (value, user_id) VALUES ($1, $2);';
            debugger;
            client.query(result.rows.length ? updateSql : insertSql, [value, user_id],
                (error, result) => {
                    release();
                    reply.send(error | result);
                }
            );
        };

        client.query('SELECT * FROM slots WHERE user_id=$1', [user_id], saveSlots);
    }
});

fastify.get('/timeslot', { preValidation: [fastify.authenticate] }, (req, reply) => {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];

    let user_id = null;

    fastify.jwt.verify(token, (err, decoded) => {
        if (err) fastify.log.error(err);

        user_id = decoded.user_id;
        console.log(user_id);
        fastify.pg.connect(onConnect);
    });

    function onConnect(err, client, release) {
        if (err) return reply.send(err)

        client.query(
            'SELECT id, value FROM slots WHERE user_id=$1', [user_id],
            function onResult(err, result) {
                release()
                reply.send(err || result.rows);
            }
        )
    }
});


fastify.listen(5000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
});

module.exports = fastify;
