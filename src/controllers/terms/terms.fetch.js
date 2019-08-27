import { endpoints } from '../../config';

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
  
  getCourseScheduleForTerm: (termId, subject, catalog_number) => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.terms().term(termId).subject(subject).catalog_number(catalog_number).schedule()
    ), {
      method: 'GET'
    })
  },
  
}
