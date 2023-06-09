import DispatcherClass from "./DispatcherClass";

export const metaDataDispatcherFactory = (container) => new MetaDataDispatcher(container)

export class MetaDataDispatcher extends DispatcherClass{
    constructor(container){
        super()
        this.url = new URL('metaData', this.baseUrl)
    }

    async getMetaDataByType(type){
        try{
            const req = this.apiRequestModel().setHttpMethod('GET')
            this.url.search = new URLSearchParams({type})
            return await this.fetch(this.url, {...req})
        } catch(e){
            console.log(e)
            gtag('event', 'exception',{
                'description':e.message,
                'method':'metaDataDispatcher.getMetaDataByType' 
            })
        }
    }
}