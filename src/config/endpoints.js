import { secrets } from './index';

export default {
  uWaterlooApi: new function () {
    const _root = this;
    _root.base = () => 'https://api.uwaterloo.ca/v2';
    
    _root.courses = () => new function () {
      const _courses = this;
      _courses.base = () => _root.base() + '/courses';
      _courses.courseId = (courseId) => `${_courses.base()}/${courseId}`;
      
      _courses.classNumber = (classNumber) => new function () {
        const _classNumber = this;
        _classNumber.schedule = () => `${_courses.base()}/${classNumber}/schedule`;
      }();
      
      _courses.subject = (subject) => new function () {
        const _subject = this;
        _subject.base = () => `${_courses.base()}/${subject}`;
        
        _subject.catalog_number = (catalog_number) => new function () {
          const _catalog_number = this;
          _catalog_number.base = () => `${_subject.base()}/${catalog_number}`;
          _catalog_number.schedule = () => `${_catalog_number.base()}/schedule`;
          _catalog_number.prerequisites = () => `${_catalog_number.base()}/prerequisites`;
          _catalog_number.examSchedule = () => `${_catalog_number.base()}/examschedule`;
        }();
      }();
    }();
    
    _root.terms = () => new function () {
      const _terms = this;
      _terms.base = () => _root.base() + '/terms';
      _terms.list = () => `${_terms.base()}/list`;
      
      _terms.term = (term) => new function () {
        const _term = this;
        _term.base = () => `${_terms.base()}/${term}`;
        
        _term.courses = () => `${_term.base()}/courses`;
        _term.examSchedule = () => `${_term.base()}/examschedule`;
        _term.enrollment = () => `${_term.base()}/enrollment`;
        _term.importantDates = () => `${_term.base()}/importantdates`;
        _term.infoSessions = () => `${_term.base()}/infosessions`;
        
        _term.subject = (subject) => new function () {
          const _subject = this;
          _subject.base = () => `${_term.base()}/${subject}`;
          _subject.schedule = () => `${_subject.base()}/schedule`;
          _subject.enrollment = () => `${_subject.base()}/enrollment`;
          _subject.catalog_number = (catalog_number) => new function () {
            const _catalog_number = this;
            _catalog_number.base = () => `${_subject.base()}/${catalog_number}`;
            _catalog_number.schedule = () => `${_catalog_number.base()}/schedule`;
          }();
        }();
      }();
    }();
    
    _root.construct = (url) => `${url}.json?key=${secrets.uWaterlooOpenDataKey}`;
  }(),
};
