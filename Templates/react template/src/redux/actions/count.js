import { INCREMENT } from '../constant'
import store from '../store'

export const increment = data => ({type:INCREMENT,data});

export const incrementAsync = (data, time) => {
    return () => {
        setTimeout(() => {
            store.dispatch(increment(data))
        }, time);
    }
}
