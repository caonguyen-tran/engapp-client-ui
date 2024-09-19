import * as SecureStore from 'expo-secure-store';

export const DispatchReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
          SecureStore.setItem("access-token", action.payload)
          return action.payload;
        case 'LOGOUT':
          SecureStore.setItem("access-token", null)
          return null;
      }
};