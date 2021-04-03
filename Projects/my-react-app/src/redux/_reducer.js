
const initState = 0

export default function Reducer (preState=initState,action) {
    const {type,data} = action;
    switch (type) {
        case 'const1':
            return preState + data
        default:
            return preState
    }

}
