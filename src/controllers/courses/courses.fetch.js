import endpoints from './courses.endpoints'

export default {
  loadCourseSchedule: (classNumber) => {
    return fetch(endpoints.uWaterlooApi.construct(
      endpoints.uWaterlooApi.courses().classNumber(classNumber).schedule()
    ), {
      method: 'GET'
    })
  }
}
