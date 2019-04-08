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
    
  }
}
