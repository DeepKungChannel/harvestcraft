
export enum Methods {
    get,
    post,
    put,
    delete,
    patch
}

export const RestAPIErrors = {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    internalServerError: 500,
    fetchError: 1000
}

export type FetchHanlderReponse = {
    status: number, 
    response: any
}