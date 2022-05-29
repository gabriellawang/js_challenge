import {default as React, createContext, Reducer, useReducer} from "react";

export enum ACTIONS {
  UPDATE_BASKET
};

export type ItemOption = {
  optionId: string;
  title: string;
  isRequired: boolean;
  value: string[];
  selectUpTo: number;
};

export type MenuItem = {
  itemId: number;
  itemName: string;
  description: string;
  imagePath: string;
  unitPrice: number;
  options: ItemOption[];
};

export type BasketItem = {
  itemId: number;
  itemName: string;
  unitPrice: number;
  selectedOptions: string[],
  quantity: number;
};

type Action =
  | {type: ACTIONS.UPDATE_BASKET; value: BasketItem[]};

export type State = {
  basketList: BasketItem[];
};

type TopPageState = {
  state: State;
  dispatch: {
    updateBasket: (basketList: BasketItem[]) => void;
  }
};

const initialState: State = {
  basketList: []
};

const initialTopPageState: TopPageState = {
  state: initialState,
  dispatch: {
    updateBasket: function (): void {
      return;
    }
  }
};

export const TopPageContext = createContext<TopPageState>(initialTopPageState);

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_BASKET:
      return {...state, basketList: action.value};
    default:
      return state;
  }
};

type Props = { children?: React.ReactNode };

export const TopPageProvider: React.ComponentType = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const updateBasket = (basketList: BasketItem[]): void => {
    dispatch({type: ACTIONS.UPDATE_BASKET, value: basketList});
  }
  
  return (
    <TopPageContext.Provider
      value={{
        state: state,
        dispatch: {
          updateBasket
        }
      }}
    >
      {children}
    </TopPageContext.Provider>
  );
}