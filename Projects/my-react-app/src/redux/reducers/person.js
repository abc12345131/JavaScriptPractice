import { ENTER } from '../constant'

const initState = []

export default function personReducer (preState=initState,action) {
    const {type,data} = action;
    switch (type) {
        case ENTER:
            return [data, ...preState]
        default:
            return preState
    }

}
