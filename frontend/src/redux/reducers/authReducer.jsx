const initialState = {
    isLoggedIn: false,
    users: null,
    token: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          isLoggedIn: true,
          users: action.payload.user,
          token: action.payload.token
        };
      case "RESET_USER":
        return{
          isLoggedIn:false,
          users:null,
          token:null
        }
      default:
        return state;
    }
  };
  
  export default authReducer;