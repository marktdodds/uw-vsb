import endpoints from '../../config/endpoints.config'

export default {
  getCourseSchedule: (classNumber) => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.courses().classNumber(classNumber).schedule()
    ), {
      method: 'GET'
    })
  },
  
}
