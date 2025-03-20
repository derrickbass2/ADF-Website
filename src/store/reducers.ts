import { combineReducers } from '@reduxjs/toolkit';

// Define your reducers here
const exampleReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Combine your reducers
const rootReducer = combineReducers({
  example: exampleReducer,
  // Add other reducers here as needed
});

export default rootReducer;