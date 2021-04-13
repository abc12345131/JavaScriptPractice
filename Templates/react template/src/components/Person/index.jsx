import { enter } from '../../redux/actions/person'
import { connect } from 'react-redux'
import React, { Component } from 'react'

//UI component
class Person extends Component {
    enter = () => {
        const name = this.name.value
        const age = this.age.value
        this.props.enter(name, age)
        this.name.value = ''
        this.age.value = ''
    }
    render() {
        return (
            <div>
                <h1>Count: {this.props.person.length}</h1>
                <input type="text" ref={c => this.name = c}/>
                <input type="number" ref={c => this.age = c}/>
                <button onClick={this.enter}>enter</button>
                {
                    this.props.person.map( item => (
                        <li>{item.name} -- {item.age}</li>
                    ))
                }
            </div>    
        )
    }
}


//use connect create container
export default connect(
    state => ({person:state.person}),
    {   
        enter
    }
)(Person)

