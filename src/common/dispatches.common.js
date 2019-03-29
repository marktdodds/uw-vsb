import { actions as coursesActions } from '../models/courses/courses.actions';
import { actions as termsActions } from '../models/terms/terms.actions';

export default (dispatch) => ({
  
  getCourseSchedule: (classNumber) => {
    dispatch(coursesActions.getCourseSchedule(classNumber))
  },
  
  /*
  * Common dispatches for uWaterloo API /terms endpoint
   */
  getTerms: () => {
    dispatch(termsActions.getTerms());
  },
  
  getCoursesForTerm: (termId) => {
    dispatch(termsActions.getCoursesForTerm(termId));
  },
  
  getCourseScheduleForTerm: (termId, subject, catalogNumber) => {
    dispatch(termsActions.getCourseScheduleForTerm(termId, subject, catalogNumber))
  },

  getCourseInformation: (subject, catalogNumber) => {
    dispatch(coursesActions.getCourseInformation(subject, catalogNumber))
  }
  
});
