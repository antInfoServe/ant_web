const apiRequestModelFactory = (container) => new ApiRequestModel(container)

class ApiRequestModel {
    constructor() {
        this.method = ''
        this.headers = {
            "content-type": "application/json",
            authorization: null
        }
        this.mode = 'cors'
        this.body = null
    }

    setHttpMethod(method) {
        if (['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].indexOf(method) > -1) {
            this.method = method
            return this
        }
        throw new Error('invalid http method')
    }

    setAuth(token) {
        this.headers.authorization = token
        return this
    }

    setBody(obj) {
        if (typeof obj == 'object') {
            this.body = JSON.stringify(obj)
            return this
        }
        throw new Error('invalid request body object')
    }

    setBodyNull() {
        this.body = null
        return this
    }
}

export {
    apiRequestModelFactory,
    ApiRequestModel
}

