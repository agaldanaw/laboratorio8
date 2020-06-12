
export const amigosTypeDef = `

input ViewModelAmistadInput {
    amigo1: String
    amigo2: String
}


type ViewModelResponseA {
    success: Boolean
}

type ViewModelResponseD {
  deleted: String,
  deleted2: String,
  success: Boolean
}

type ViewModelResponseQ {
  amigos1ra:[ViewModelResponseSubQ1]
  amigos2da:[ViewModelResponseSubQ2]
  success: Boolean
}

type ViewModelResponseSubQ1 {
  amigo1: Int
}

type ViewModelResponseSubQ2 {
  amigo2: Int
}


`;

export const amigosQueries = `
    AmigosInfo(id: Int!): ViewModelResponseQ!
`;

export const amigosMutations = `
    NewAmistad(model: ViewModelAmistadInput!): ViewModelResponseA!
    DeleteAmistad(amigo1: Int!,amigo2: Int!): ViewModelResponseD!

`;
