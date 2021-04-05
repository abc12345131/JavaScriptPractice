import { INCREMENT } from '../constant';
import store from '../store';

export const createAction = data => ({type:INCREMENT,data});

export const createAsynAction = (data, time) => {
    return () => {
        setTimeout(() => {
            store.dispatch(createAction(data))
        }, time);
    }
}
