export const symbols = {
  ADD_COURSE: Symbol('BUILDER:ADD_COURSE')
};

export const actions = {
  addCourse: (course) => ({
    type: symbols.ADD_COURSE,
    course: course
  }),
};
