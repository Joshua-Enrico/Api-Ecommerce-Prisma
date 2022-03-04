const { PrismaClient } = require('@prisma/client');
const { admin } = new PrismaClient();

/*  Esta funcion hara una busqueda de admins por ocurrencia de nombre y email
    Cualquier ocurrencia en nombre o email sera retornado */
async function searchAdmin(req, res) {
    const search = req.params.search;
    if (!search || search === "" || typeof search !== "string") {
        res.status(400).send({
            error: "Invalid search parameter",
        });
    } else {

        await admin
          .findMany({
            where: {
              OR: [
                    { name: { contains: search } },
                    { email: { contains: search } },
                  ],
            },
          })
          .then((admins) => {
            admins.length > 0
              ? res.status(200).json({
                  message: "Admins found",
                  admins,
                  code: "admins_found",
                })
              : res.status(201).json({
                  message: "No admins found",
                  code: "admins_not_found",
                });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error searching admins",
              err,
              code: "admins_search_error",
            });
          });

    }
}

module.exports = { searchAdmin };