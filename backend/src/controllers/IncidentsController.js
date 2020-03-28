const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description, value,
            value,
            ong_id
        });
        return response.json({ id });
    },
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();


        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
        ]);

        response.header('X-total-count', count['count(*)'])

        return response.json(incidents);
    },
    async delete(request, response) {
        const resut = response.status(401).json({ error: 'Operation not permited.' });
        const { id } = request.params;
        const ong_id = request.headers.authorization;


        console.log(id);
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (id == undefined || incident.ong_id == undefined) {
            console.log(resut.statusMessage)
            return resut;
        }
        if (incident.ong_id != ong_id) {
            console.log(resut.statusMessage)
            return resut;
        }
        await connection('incidents')
            .where('id', id)
            .delete();
        return response.status(204).send();
    }
}