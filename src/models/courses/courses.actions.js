export const symbols = {
  LOOKUP_COURSE: Symbol('LOOKUP_COURSE')
};

export const actions = {
  lookupCourse: (semester, subject, courseNum) => ({
    type: symbols.LOOKUP_COURSE,
    semester: semester,
    subject: subject,
    courseNum: courseNum
  }),
};
