import { helpers } from './index';

export default {
  loaded: {
    coursesForTerm: (terms, id) => {
      return terms.availableCourses.hasOwnProperty(id);
    },
    courseInformation: (courses, course) => {
      return courses.hasOwnProperty(course.subject) &&
        courses[course.subject].hasOwnProperty(course.catalog_number);
    },
    courseScheduleForTerm: (terms, course, termId) => {
      return terms.hasOwnProperty(termId) &&
        terms[termId].hasOwnProperty(course.subject) &&
        terms[termId][course.subject].hasOwnProperty(course.catalog_number);
    }
  },
  
  classes: {
    overlap: (date1, date2) => {
      if (date1['is_tba'] || date2['is_tba']) return true;
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
    },
    match: (c1, c2) => {
      return c1['subject'] === c2['subject'] && c1['catalog_number'] === c2['catalog_number'] && c1['class_number'] === c2['class_number'];
    },
    isLecture: (c1) => {
     return c1['section'].includes('LEC')
    }
  },
  courses: {
    match: (c1, c2) => {
      return c1['subject'] === c2['subject'] && c1['catalog_number'] === c2['catalog_number'];
    }
  }
};
