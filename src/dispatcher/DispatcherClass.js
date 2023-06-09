import {apiRequestModelFactory} from '../model/apiRequestModel'

export default class DispatcherClass{
    constructor(){
        this.baseUrl = "https://asia-south1-joyboy-ai.cloudfunctions.net/app/"
        this.apiRequestModel = () => apiRequestModelFactory()
    }

    async fetch(url, req) {
        let data
        await fetch(url, req)
            .then(res => res.json())
            .then(obj => data = obj)
            .catch(err => data = err)
        return data
    }
}