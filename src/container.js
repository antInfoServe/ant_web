export default class Container {
    setInternalModule(name, module){
        this[name] = () => module(this)
    }

    setModel(name, model){
        this[name] = () => model()
    }

    setExternalModule(name, module){
        this[name] = module
    }

    setUrl(name, url){
        this[name] = () => new URL(url)
    }

    setComponent(name, component){
        this[name] = component
    }

    getContainer(){
        return this
    }
}