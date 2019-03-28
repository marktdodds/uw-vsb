export const symbols = {
  GET_TERMS: Symbol('TERMS:GET_TERMS'),
  RECEIVED_TERMS: Symbol('TERMS:RECEIVED_TERMS'),
};

export const actions = {
  
  getTerms: () => ({
    type: symbols.GET_TERMS,
  }),
  
  receivedTerms: (response) => ({
    type: symbols.RECEIVED_TERMS,
    response: response
  })
  
};
