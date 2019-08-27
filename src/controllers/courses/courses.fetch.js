import { endpoints } from '../../config';


export default {
  
  getCourseInformation: (subject, catalog_number) => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.courses().subject(subject).catalog_number(catalog_number).base()
    ), {
      method: 'GET'
    })
  }
  
}
