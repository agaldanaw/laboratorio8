import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
console.log(URL);


const resolvers = {
	Query: {
		AmigosInfo: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET')
    },

	Mutation: {
		NewAmistad: (_, { model }) =>
			generalRequest(`${URL}`, 'POST', model),
        DeleteAmistad: (_, { amigo1,amigo2 }) =>
            generalRequest(`${URL}/${amigo1}/${amigo2}`, 'DELETE'),

	}
};

export default resolvers;
