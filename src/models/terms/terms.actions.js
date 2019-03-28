export const symbols = {
  GET_TERMS: Symbol('TERMS:GET_TERMS'),
  RECEIVED_TERMS: Symbol('TERMS:RECEIVED_TERMS'),
  
  GET_COURSES_FOR_TERM: Symbol('TERMS:GET_COURSES_FOR_TERM'),
  RECEIVED_COURSES_FOR_TERM: Symbol('TERMS:RECEIVED_COURSES_FOR_TERM'),
};

export const actions = {
  
  getTerms: () => ({
    type: symbols.GET_TERMS,
  }),
  
  receivedTerms: (response) => ({
    type: symbols.RECEIVED_TERMS,
    response: response
  }),
  
  
  getCoursesForTerm: (termId) => ({
    type: symbols.GET_COURSES_FOR_TERM,
    termId: termId
  }),
  
  receivedCoursesForTerm: (response, termId) => ({
    type: symbols.RECEIVED_COURSES_FOR_TERM,
    response: response,
    termId: termId
  }),
  
  
};
