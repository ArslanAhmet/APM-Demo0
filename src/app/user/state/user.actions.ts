import { Action } from "@ngrx/store";

export enum  UserActionTypes {
  ToggleUserCode = '[User] Toggle User Code'
}

export class ToggleUserCode implements Action{
  readonly type = UserActionTypes.ToggleUserCode;
  constructor(public payload: boolean) {}
}

export type UserActions = ToggleUserCode;
