import fastify from 'fastify';
import gpt3 from './responseClients/gpt3';

const app = fastify();

app.get('/chat/:from_id/:query', async (request, reply) => {
    //@ts-ignore
    const { from_id, query } = request.params;
    const response = await gpt3(from_id, query);
    return response;
});

app.listen({port: 5001, host: "0.0.0.0"}, (err, address) => {
    if (err) throw err;
    console.log(`Server listening at ${address}`);
});
