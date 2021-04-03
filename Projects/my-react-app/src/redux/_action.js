import {CONST1} from './constant';
import store from './store';

export const createAction = data => ({type: CONST1,data});

export const createAsynAction = (data, time) => {
    return () =>{
        setTimeout(() => {
            store.dispatch(createAction(data))
        }, time);
    }
}
