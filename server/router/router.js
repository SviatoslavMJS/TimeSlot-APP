module.exports = async function(fastify, opts) {
    fastify.get(
      "/localhost:3000/",
      {
        preValidation: [fastify.authenticate]
      },
      async function(req, res) {
         res.status(200).send({msg: "Success"});
      }
    )
  }