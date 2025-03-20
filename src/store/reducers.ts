import { combineReducers } from '@reduxjs/toolkit';

// Define your reducers here
const exampleReducer = (state = {}, action) => {
  // If we had specific action types, they would be handled with if/else statements
  // Example: if (action.type === 'SOME_ACTION') { return {...state, someValue: action.payload}; }
  
  // Default case - just return the state
  return state;
};

// Combine your reducers
const rootReducer = combineReducers({
  example: exampleReducer,
  // Add other reducers here as needed
});

export default rootReducer;