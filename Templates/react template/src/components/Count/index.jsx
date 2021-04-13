import { increment, incrementAsync } from '../../redux/actions/count'
import { connect } from 'react-redux'
import React, { Component } from 'react'

//UI component
class Count extends Component {
    increment = () => {
        const {value} = this.inputNumber
        this.props.increment(value*1)
    }
    incrementAsync = () => {
        const {value} = this.inputNumber
        this.props.incrementAsync(value*1,1000)
    }
    render() {
        return (
            <div>
                <h1>Count: {this.props.count}</h1>
                <input type="number" ref={c => this.inputNumber = c}/>
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.incrementAsync}>Async+</button>&nbsp;
            </div>    
        )
    }
}


// function mapStateToProps(state){
//     return {count:state}
// }

// function mapDispatchToProps(dispatch){
//     return {action1:(data)=>{dispatch(createAction(data))},
//             action2:(data, time)=>{dispatch(createAsynAction(data, time))}
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Count)

//use connect create container
export default connect(
    state => ({count:state.count}),
    {   
        increment,
        incrementAsync
    }
)(Count)

