import { actions as coursesActions } from '../../models/courses/courses.actions';
import { actions as termsActions } from '../../models/terms/terms.actions';

export default (dispatch) => ({
  getCourseSchedule: (classNumber) => {
    dispatch(coursesActions.getCourseSchedule(classNumber))
  },
  
  getTerms: () => {
    dispatch(termsActions.getTerms());
  }
});
