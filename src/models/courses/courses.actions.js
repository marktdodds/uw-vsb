export const symbols = {
  GET_COURSE_INFORMATION: Symbol('COURSES:GET_COURSE_INFORMATION'),
  RECEIVED_COURSE_INFORMATION: Symbol('COURSES:RECEIVED_COURSE_INFORMATION'),
};

export const actions = {
  
  /*
  * Specific course information for a specific course
   */
  getCourseInformation: (subject, catalog_number) => ({
    type: symbols.GET_COURSE_INFORMATION,
    subject: subject,
    catalog_number: catalog_number
  }),
  
  receivedCourseInformation: (response) => ({
    type: symbols.RECEIVED_COURSE_INFORMATION,
    response: response
  }),
  
};
