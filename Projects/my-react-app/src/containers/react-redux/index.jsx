import CountUI from '../../components/Count';
import { createAction, createAsynAction} from '../../redux/count_action';
import { connect } from 'react-redux';

// function mapStateToProps(state){
//     return {count:state}
// }

// function mapDispatchToProps(dispatch){
//     return {action1:(data)=>{dispatch(createAction(data))},
//             action2:(data, time)=>{dispatch(createAsynAction(data, time))}
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(CountUI)

export default connect(
    state => ({count:state}),
    {   
        action1:createAction,
        action2:createAsynAction
    }
)(CountUI)

