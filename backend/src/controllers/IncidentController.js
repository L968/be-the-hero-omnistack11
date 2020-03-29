const connection = require('../database/connection');

module.exports = {

    async index(req, res){
        const { page = 1 } = req.query;

        const [count] = await connection('incident').count();

        const incidents = await connection('incident')
        .select(['incident.*',
                 'ong.name',
                 'ong.email',
                 'ong.whatsapp',
                 'ong.city',
                 'ong.uf'
                ])
        .join('ong', 'ong.id', '=', 'incident.ong_id')
        .limit(5)
        .offset((page - 1) * 5);

        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidents);
    },

    async create(req, res){
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    },

    async delete(req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incident')
        .select('ong_id')
        .where('id', id)
        .first();

        if (!incident) {
            return res.status(400).json({ error: 'No Incident found with this ID' });
        }

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }else {
            await connection('incident').where('id', id).del();
        }

        return res.status(204).send();
    }
};