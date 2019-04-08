import { helpers } from './index';

export default {
  loaded: {
    coursesForTerm: (terms, id) => {
      return terms.availableCourses.hasOwnProperty(id);
    },
    courseInformation: (courses, course) => {
      return courses.hasOwnProperty(course.subject) &&
        courses[course.subject].hasOwnProperty(course.catalogNumber);
    },
    courseScheduleForTerm: (terms, course, termId) => {
      return terms.hasOwnProperty(termId) &&
        terms[termId].hasOwnProperty(course.subject) &&
        terms[termId][course.subject].hasOwnProperty(course.catalogNumber);
    }
  },
  
  classes: {
    overlap: (date1, date2) => {
      const c1st = helpers.timeToInteger(date1['start_time']);
      const c1et = helpers.timeToInteger(date1['end_time']);
      const c2st = helpers.timeToInteger(date2['start_time']);
      const c2et = helpers.timeToInteger(date2['end_time']);
      const c1Days = helpers.splitDays(date1['weekdays']);
      const c2Days = helpers.splitDays(date2['weekdays']);
      return c1Days.some(d => c2Days.includes(d)) && ((c2st <= c1st && c1et <= c2et) ||
        (c1st <= c2st && c2et <= c1et) ||
        (c1st <= c2st && c2st <= c1et) ||
        (c1st <= c2et && c2et <= c1et));
    }
  }
}
