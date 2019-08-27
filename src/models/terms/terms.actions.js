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
    selectedTerm: termId
  }),
  
  receivedCoursesForTerm: (response, termId) => ({
    type: symbols.RECEIVED_COURSES_FOR_TERM,
    response: response,
    selectedTerm: termId
  }),
  
  /*
  * Specific course schedule for a term
   */
  getCourseScheduleForTerm: (termId, subject, catalog_number) => ({
    type: symbols.GET_COURSE_SCHEDULE_FOR_TERM,
    selectedTerm: termId,
    subject: subject,
    catalog_number: catalog_number
  }),
  
  receivedCourseScheduleForTerm: (response, termId, subject, catalog_number) => ({
    type: symbols.RECEIVED_COURSE_SCHEDULE_FOR_TERM,
    selectedTerm: termId,
    response: response,
    subject: subject,
    catalog_number: catalog_number
  }),
  
  
  
  
  
};
