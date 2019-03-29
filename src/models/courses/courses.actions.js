export const symbols = {
  GET_COURSE_INFORMATION: Symbol('COURSES:GET_COURSE_INFORMATION'),
  RECEIVED_COURSE_INFORMATION: Symbol('COURSES:RECEIVED_COURSE_INFORMATION'),
};

export const actions = {
  
  /*
  * Specific course information for a specific course
   */
  getCourseInformation: (subject, catalogNumber) => ({
    type: symbols.GET_COURSE_INFORMATION,
    subject: subject,
    catalogNumber: catalogNumber
  }),
  
  receivedCourseInformation: (response) => ({
    type: symbols.RECEIVED_COURSE_INFORMATION,
    response: response
  }),
  
};
