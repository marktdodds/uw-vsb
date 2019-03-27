export const symbols = {
  DUMMY_REQ: Symbol('DUMMY_REQ')
};

export const actions = {
  dummyReq: () => ({
    type: symbols.DUMMY_REQ,
    someData: 'asdasdasd'
  }),
};
