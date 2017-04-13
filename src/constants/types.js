
export type Action =
    { type: 'CARDS_RECEIVED', data: Array<string> }
  | { type: 'PROFILE_RECEIVED', data: { name: string }}
  | { type: string } // =(

export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action
                                | ThunkAction
                                | PromiseAction
                                | Array<Action>
                        ) => any;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
