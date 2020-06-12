/*
vmuser:  public Guid Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmedPassword { get; set; }
        public string Country { get; set; }
        public string Picture { get; set; }
        public byte[] ImageBytes { get; set; }
        public int TotalGames { get; set; }
        public int WonGames { get; set; }
        public int LostGames { get; set; }

    VMupload:
    public byte[] File { get; set; }
        public string FileName { get; set; }

    VMPAssword:
    public string Password { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmedNewPassword { get; set; }

    VMresponse:
        public bool Error { get; set; } Boolean
        public string Response { get; set; }
        public ViewModelUser User { get; set; }
        public object Token { get; set; }
        public string Uri { get; set; }
    VMLogin
     public string UserName { get; set; }
        public string Password { get; set; }
*/

export const usersTypeDef = `
type ViewModelUser {
    id: String
    name: String
    lastName: String
    userName: String
    email: String
    password: String
    confirmedPassword: String
    country: String!
    picture: String!
    imageBytes: String
    totalGames: Int
    wonGames: Int
    lostGames: Int
}
input ViewModelUserInput {
    Name: String!
    LastName: String!
    UserName: String!
    Email: String!
    Password: String!
    ConfirmedPassword: String!
    Country: String!
    Picture: String!
} 

input ViewModelUploadFile {
    File: String!
    FileName: String!
}

input ViewModelPassword {
    Password: String!
    NewPassword: String!
    ConfirmedNewPassword: String!
}

type ViewModelResponse {
    error: Boolean
    response: String
    user: ViewModelUser
    token: String
    uri: String
}

input ViewModelLogin {
    Password: String!
    UserName: String!
}
`;

export const usersQueries = `
    UserInfo(id: String!): ViewModelResponse!
    UploadFile(model: ViewModelUploadFile!): ViewModelResponse!
    Login(model: ViewModelLogin!): ViewModelResponse
    ValidateToken(token: String!): ViewModelResponse!
    RequestPasswordChange(email: String!): ViewModelResponse!
    ExistUser(email: String!): ViewModelResponse!
`;

export const usersMutations = `
    Register(model: ViewModelUserInput!): ViewModelResponse!
    Verify(id: String!): ViewModelResponse!
    DeleteUser(id: String!): ViewModelResponse!
    EditUser(model: ViewModelUserInput!,id: String!): ViewModelResponse!
    ChangePasswordUser(model: ViewModelPassword!, id: String!): ViewModelResponse!
    ChangePassword(model: ViewModelPassword!,id: String!, token: String!): ViewModelResponse!
`;
