import endpoints from '../../config/endpoints.config'

export default {
  
  getCourseInformation: (subject, catalogNumber) => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.courses().subject(subject).catalogNumber(catalogNumber).base()
    ), {
      method: 'GET'
    })
  }
  
}
