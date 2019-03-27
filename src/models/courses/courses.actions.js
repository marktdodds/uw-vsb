export const symbols = {
  LOAD_COURSE_SCHEDULE: Symbol('COURSES:LOAD_COURSE_SCHEDULE'),
  RECEIVED_COURSE_SCHEDULE: Symbol('COURSES:RECEIVED_COURSE_SCHEDULE'),
};

export const actions = {
  
  loadCourseSchedule: (classNumber) => ({
    type: symbols.LOAD_COURSE_SCHEDULE,
    classNumber: classNumber
  }),
  
  receivedCourseSchedule: (data) => ({
    type: symbols.RECEIVED_COURSE_SCHEDULE,
    data: data
  })
  
};
