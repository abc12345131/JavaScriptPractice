import { EnthusiasmAction } from '../actions';
import { StoreState } from '../types';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants';


const initialState: StoreState ={
    languageName: 'abc',
    enthusiasmLevel: 123
}

export const todoReducer = (state: StoreState=initialState, action: EnthusiasmAction): StoreState => {
    switch (action.type) {
      case INCREMENT_ENTHUSIASM:
        return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
      case DECREMENT_ENTHUSIASM:
        return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
      default:
        return state;
    }
}
