import {
  TEST
  } from '../actions/types';
  
  const initialState = {
    bot: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
    //   case LOGS_ERROR:
    //     console.error(action.payload);
    //     return {
    //       ...state,
    //       error: action.payload
    //     };
      default:
        return state;
    }
  };
  