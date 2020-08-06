// to be sure the types are consistent for the whole app they will be stored here
// as constants and imported to the reducers/action creators

const UserActionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",
};

export default UserActionTypes;
