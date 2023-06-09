import Container from './container'

//components
import { WithLandingPage } from './components/landingPage/WithLandingPage.jsx'
import { ComingSoonPage } from './components/utils/ComingSoon'
import { SearchBox } from './components/utils/SearchBox'

//models
import { apiRequestModelFactory } from './model/apiRequestModel'

//dispatchers
import { metaDataDispatcherFactory } from './dispatcher/metaDataDispatchr'
import { searchDispatcherFactory } from './dispatcher/searchDispatcher'

import { staticText } from './utils/staticText'
import { dummyData } from './utils/dummyData'


import { auth, signOut, googleProvider, signInWithRedirect, onAuthStateChanged, getCredential, getRedirectResult } from './firebase'
import { useNavigate } from "react-router-dom";
import Typesense from 'typesense'

const tsClient = new Typesense.Client({
    'nodes': [{
        'host': 'mf39bxg0pa4ji2ztp-1.a1.typesense.net',
        'port': '443', 
        'protocol': 'https'
      }],
      'apiKey': '7UofTqTr7vq04GSHPIyWaLSnSltQv855',
      'connectionTimeoutSeconds': 5
})

const c = new Container()

c.setComponent('staticText', staticText)
c.setComponent('dummyData', dummyData)
c.setComponent('ComingSoonPage', ComingSoonPage)
c.setComponent('SearchBox', SearchBox)


c.setInternalModule('apiRequestModel', apiRequestModelFactory)
c.setInternalModule('metaDataDispatcher', metaDataDispatcherFactory)
c.setInternalModule('searchDispatcher', searchDispatcherFactory)

c.setExternalModule('auth', auth)
c.setExternalModule('signOut', signOut)
c.setExternalModule('googleProvider', googleProvider)
c.setExternalModule('signInWithRedirect', signInWithRedirect)
c.setExternalModule('onAuthStateChanged', onAuthStateChanged)
c.setExternalModule('getCredential', getCredential)
c.setExternalModule('getRedirectResult', getRedirectResult)
c.setExternalModule('useNavigate', useNavigate)
c.setExternalModule('tsClient', tsClient)

const LandingPage = WithLandingPage(c.getContainer())

export {
    LandingPage,
}


