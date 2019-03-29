export const symbols = {
  GET_TERMS: Symbol('TERMS:GET_TERMS'),
  RECEIVED_TERMS: Symbol('TERMS:RECEIVED_TERMS'),
  
  GET_COURSES_FOR_TERM: Symbol('TERMS:GET_COURSES_FOR_TERM'),
  RECEIVED_COURSES_FOR_TERM: Symbol('TERMS:RECEIVED_COURSES_FOR_TERM'),
  
  GET_COURSE_SCHEDULE_FOR_TERM: Symbol('TERMS:GET_COURSE_SCHEDULE_FOR_TERM'),
  RECEIVED_COURSE_SCHEDULE_FOR_TERM: Symbol('TERMS:RECEIVED_COURSE_SCHEDULE_FOR_TERM'),
  
};

export const actions = {
  
  /*
  * Terms list
   */
  getTerms: () => ({
    type: symbols.GET_TERMS,
  }),
  
  receivedTerms: (response) => ({
    type: symbols.RECEIVED_TERMS,
    response: response
  }),
  
  /*
  * Courses for term
   */
  getCoursesForTerm: (termId) => ({
    type: symbols.GET_COURSES_FOR_TERM,
    termId: termId
  }),
  
  receivedCoursesForTerm: (response, termId) => ({
    type: symbols.RECEIVED_COURSES_FOR_TERM,
    response: response,
    termId: termId
  }),
  
  /*
  * Specific course schedule for a term
   */
  getCourseScheduleForTerm: (termId, subject, catalogNumber) => ({
    type: symbols.GET_COURSE_SCHEDULE_FOR_TERM,
    termId: termId,
    subject: subject,
    catalogNumber: catalogNumber
  }),
  
  receivedCourseScheduleForTerm: (response, termId, subject, catalogNumber) => ({
    type: symbols.RECEIVED_COURSE_SCHEDULE_FOR_TERM,
    termId: termId,
    response: response,
    subject: subject,
    catalogNumber: catalogNumber
  }),
  
  
  
  
  
};
