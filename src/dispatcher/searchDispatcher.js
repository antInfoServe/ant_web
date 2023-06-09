export const searchDispatcherFactory = (container) => new SearchDispatcher(container)

export class SearchDispatcher {
    constructor(con) {
        this.tsClient = con.tsClient
        this.result
    }

    async getCountryList(searchString) {
        try {
            if (searchString !== null && searchString.length > 1) {
                this.result = await this.tsClient.collections('countries').documents().search({
                    'q': searchString,
                    'query_by': 'country_name'
                })
            } else {
                return []
            }
            if (this.result !== null && this.result.hits.length > 0) {
                return this.result.hits.map(obj => obj.document.country_name)
            }
            return []
        } catch (e) {
            console.log(e)
            gtag('event', 'exception',{
                'description':e.message,
                'method':'searchDispatcher.getCountryList' 
            })
        }
    }

    async getCityList(searchString){
        try{
            if(searchString !== null && searchString.length >1){
                this.result = await this.tsClient.collections('cities').documents().search({
                    'q':searchString,
                    'query_by':'city_name'
                })
            } else{
                return []
            }
            if (this.result !== null && this.result.hits.length > 0) {
                return this.result.hits.map(obj => obj.document.city_name+', '+obj.document.state_name+', '+obj.document.country_name)
            }
            return []
        }catch(e){
            console.log(e)
            gtag('event', 'exception',{
                'description':e.message,
                'method':'searchDispatcher.getCityList' 
            })
        }
    }
}