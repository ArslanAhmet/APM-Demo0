import { Product } from "../product";
import * as fromRoot from "../../state/app.state";
import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.actions";

export interface State extends fromRoot.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ""
};

const getProductFeatureState = createFeatureSelector<ProductState>("products");

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      currentProductId ? state.products.find( p => p.id === currentProductId) : null
    }
  }

);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

export function reducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: action.payload
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: "",
          productCode: "New",
          description: "",
          starRating: 0
        }
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };
    default:
      return state;
  }
}
