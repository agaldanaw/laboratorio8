import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
console.log(URL);

const resolvers = {
	Query: {
		getAllHistorials: (_, __,) =>
			getRequest(`${URL}historial`, ''),
        getHistorialsById: (_, { id }) =>
            getRequest(`${URL}historial/${id}`, ''),
    },

	Mutation: {
		updateCanvas: (_, { model, id }) =>
			generalRequest(`${URL}update/${id}`, 'POST', model),
        createCanvas: (_, __,) =>
			generalRequest(`${URL}historial`, 'POST'),
        DeleteCanvas: (_, { id }) =>
            generalRequest(`${URL}historial/${id}`, 'DELETE'),
        
	}
};

export default resolvers;
