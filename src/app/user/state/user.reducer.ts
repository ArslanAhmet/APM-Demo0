export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_USER_CODE':
      console.log('existing user state' + JSON.stringify(state));
      console.log('action user payload:' + action.payload);
      return {
        ...state,
        showUserCode: action.payload
      };
    default:
      return state;
  }
}
