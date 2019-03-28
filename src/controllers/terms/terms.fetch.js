import endpoints from '../../config/endpoints.config'

export default {
  getTerms: () => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.terms().list()
    ), {
      method: 'GET'
    })
  }
  
}
