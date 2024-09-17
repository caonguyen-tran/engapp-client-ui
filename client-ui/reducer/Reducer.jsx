export const DispatchReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
          return state;
        case 'LOGOUT':
          return null;
      }
};