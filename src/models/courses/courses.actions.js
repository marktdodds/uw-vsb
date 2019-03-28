export const symbols = {
  GET_COURSE_SCHEDULE: Symbol('COURSES:GET_COURSE_SCHEDULE'),
  RECEIVED_COURSE_SCHEDULE: Symbol('COURSES:RECEIVED_COURSE_SCHEDULE'),
};

export const actions = {
  
  getCourseSchedule: (classNumber) => ({
    type: symbols.GET_COURSE_SCHEDULE,
    classNumber: classNumber
  }),
  
  receivedTerms: (data) => ({
    type: symbols.RECEIVED_COURSE_SCHEDULE,
    data: data
  })
  
};
