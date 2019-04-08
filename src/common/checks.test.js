import { checks } from './index';

it('Correctly identifies overlapping classes', () => {
  const class1 = {
    'start_time': '8:30',
    'end_time': '09:00',
    'weekdays': 'TTh'
  };
  const class2 = {
    'start_time': '8:30',
    'end_time': '09:00',
    'weekdays': 'MW'
  };
  const class3 = {
    'start_time': '8:20',
    'end_time': '09:10',
    'weekdays': 'MW'
  };
  const class4 = {
    'start_time': '8:40',
    'end_time': '08:50',
    'weekdays': 'MW'
  };
  const class5 = {
    'start_time': '8:20',
    'end_time': '08:50',
    'weekdays': 'MW'
  };
  const class6 = {
    'start_time': '8:40',
    'end_time': '09:50',
    'weekdays': 'MW'
  };
  const class7 = {
    'start_time': '8:30',
    'end_time': '08:35',
    'weekdays': 'MW'
  };
  
  expect(checks.classes.overlap(class1, class2)).toEqual(false);
  expect(checks.classes.overlap(class2, class3)).toEqual(true);
  expect(checks.classes.overlap(class2, class4)).toEqual(true);
  expect(checks.classes.overlap(class2, class5)).toEqual(true);
  expect(checks.classes.overlap(class2, class6)).toEqual(true);
  expect(checks.classes.overlap(class2, class6)).toEqual(true);
  expect(checks.classes.overlap(class7, class6)).toEqual(false);
  expect(checks.classes.overlap(class7, class7)).toEqual(true);
});
