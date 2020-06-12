import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
console.log(URL);

    /*
export const usersQueries = `
    UserInfo:(id: String!): ViewModelUser!
    UploadFile(model: ViewModelUploadFile!): ViewModelResponse!
    Login(model: ViewModelLogin!): ViewModelResponse!
    ValidateToken(token: String!): ViewModelResponse!
    RequestPasswordChange(email: String!): ViewModelResponse!
`;

export const usersMutations = `
    Register(model: ViewModelUser!): ViewModelResponse!
    Verify(id: String!): ViewModelResponse!
    DeleteUser(id: String!): ViewModelResponse!
    EditUser(model: ViewModelUser!,id: String!): ViewModelResponse!
    ChangePasswordUser(model: ViewModelPassword!, id: String!): ViewModelResponse!
    ChangePassword(model: ViewModelPassword!,id: String!, token: String!): ViewModelResponse!
`;

*/


const resolvers = {
	Query: {
		UserInfo: (_, {id}) =>
			getRequest(`${URL}UserInfo/${id}`, ''),
        UploadFile: (_, { model }) =>
            generalRequest(`${URL}UploadFile`, 'POST', model),
        Login: (_, { model }) =>
            generalRequest(`${URL}Login`, 'POST', model),
        ValidateToken: (_, { token }) =>
            generalRequest(`${URL}ValidateToken/${token}`, 'GET'),
        RequestPasswordChange: (_, { email }) =>
            generalRequest(`${URL}RequestPasswordChange/${email}`, 'POST'),
        ExistUser: (_, {email}) =>
			getRequest(`${URL}ExistUser/${email}`, ''),
    },

	Mutation: {
		Register: (_, { model }) =>
			generalRequest(`${URL}Register`, 'POST', model),
        Verify: (_, { id }) =>
			generalRequest(`${URL}Verify/${id}`, 'GET'),
        DeleteUser: (_, { id }) =>
            generalRequest(`${URL}DeleteUser/${id}`, 'DELETE'),
        EditUser: (_, { model, id }) =>
			generalRequest(`${URL}EditUser/${id}`, 'PUT', model),
        ChangePasswordUser: (_, { model, id }) =>
			generalRequest(`${URL}ChangePasswordUser/${id}`, 'PUT', model),
        ChangePassword: (_, { model, id, token }) =>
            generalRequest(`${URL}ChangePassword/${id}/${token}`, 'PUT', model),
        
	}
};

export default resolvers;
