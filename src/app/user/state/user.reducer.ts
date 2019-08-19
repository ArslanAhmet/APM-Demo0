import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserActions, UserActionTypes } from "./user.actions";

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


export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.ToggleUserCode:
      return {
        ...state,
        showUserCode: action.payload
      };
    default:
      return state;
  }
}
