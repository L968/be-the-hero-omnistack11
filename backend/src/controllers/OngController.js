const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async index(req, res){
        const ongs = await connection('ong').select('*');

        return res.json(ongs);
    },

    async create(req, res){
        const { name, email, whatsapp, city, uf } = req.body;
        // const id = crypto.randomBytes(4).toString('HEX');
        const id = generateUniqueId();

        await connection('ong').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return res.json({ id });
    },
};