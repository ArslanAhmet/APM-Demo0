import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserState {
  showUserCode: boolean;
}


const initialState: UserState = {
  showUserCode: false
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getShowUserCode = createSelector(
  getUserFeatureState,
  state => state.showUserCode
);


export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'TOGGLE_USER_CODE':
      return {
        ...state,
        showUserCode: action.payload
      };
    default:
      return state;
  }
}
