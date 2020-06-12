export const canvasTypeDef = `

type ViewModelCanvas{
    drawingHistorial : [ViewModelHistorial]
    _id: String
    _v: Int
}

type ViewModelHistorial {
    coord_x: Int
    coord_y: Int
    color_r: Int
    color_g: Int
    color_b: Int
    evt_type: String
}

type ViewModelOneCanvasResponse {
    err: Boolean
    message: String
    drawingHistorial: ViewModelCanvas
}

type ViewModelAllCanvasResponse {
    err: Boolean
    message: String
    drawingHistorials: [ViewModelCanvas]
}

type ViewModelCanvasResponse {
    err: Boolean
    message: String
    canvas: ViewModelCanvas
}

type ViewModelDeleteResponse {
    err: Boolean
    message: String
}

input ViewModelUpdateCanvasInput {
    evt_type: String!
    request_user_id: Int!
    allowed_user_id: Int!
    coord_x: Int!
    coord_y: Int!
    color_r: Int!
    color_g: Int!
    color_b: Int!
}
`;

export const canvasQueries = `
    getAllHistorials: ViewModelAllCanvasResponse!
    getHistorialsById(id: String!): ViewModelOneCanvasResponse!
`;

export const canvasMutations = `
    updateCanvas(model: ViewModelUpdateCanvasInput!, id: String!): ViewModelCanvasResponse!
    createCanvas: ViewModelCanvasResponse!
    DeleteCanvas(id: String!): ViewModelDeleteResponse!
`;
