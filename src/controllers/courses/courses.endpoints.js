import secrets from '../../config/secrets.config'


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
      };
      
      _courses.subject = (subject) => new function () {
        const _subject = this;
        _subject.base = () => `${_courses.base()}/${subject}`;
        
        _subject.catalogNumber = (catalogNumber) => new function () {
          const _catalogNumber = this;
          _catalogNumber.base = () => `${_subject.base()}/${catalogNumber}`;
          _catalogNumber.schedule = () => `${_catalogNumber.base()}/schedule`;
          _catalogNumber.prerequisites = () => `${_catalogNumber.base()}/prerequisites`;
          _catalogNumber.examSchedule = () => `${_catalogNumber.base()}/examschedule`;
        }
      };
    };
    
    _root.construct = (url) => `${url}.json?key=${secrets.uWaterlooOpenDataKey}`;
  },
}
