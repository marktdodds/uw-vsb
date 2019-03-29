import endpoints from '../../config/endpoints.config'

export default {
  getTerms: () => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.terms().list()
    ), {
      method: 'GET'
    })
  },
  
  getCoursesForTerm: (termId) => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.terms().term(termId).courses()
    ), {
      method: 'GET'
    })
  },
  
  getCourseScheduleForTerm: (termId, subject, catalogNumber) => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.terms().term(termId).subject(subject).catalogNumber(catalogNumber).schedule()
    ), {
      method: 'GET'
    })
  },
  
}
