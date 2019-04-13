export const symbols = {
  ADD_COURSE: Symbol('BUILDER:ADD_COURSE'),
  REMOVE_COURSE: Symbol('BUILDER:REMOVE_COURSE'),
  ENABLE_COURSE: Symbol('BUILDER:ENABLE_COURSE'),
  DISABLED_COURSE: Symbol('BUILDER:DISABLED_COURSE'),
};

export const actions = {
  addCourse: (course) => ({
    type: symbols.ADD_COURSE,
    course: course
  }),
  removeCourse: (course) => ({
    type: symbols.REMOVE_COURSE,
    course: course
  }),
  enableCourse: (course) => ({
    type: symbols.ENABLE_COURSE,
    course: course,
  }),
  disableCourse: (course) => ({
    type: symbols.DISABLED_COURSE,
    course: course,
  })
};
