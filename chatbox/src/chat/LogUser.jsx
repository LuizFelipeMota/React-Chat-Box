import React, {Component} from 'react'

class LogUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: ''
        }
    }
    //Update username
    handleChange = e => {
        this.setState({username: e.target.value});
    }

    //Set the callback function passed by the props.
    setUser(e){
        e.preventDefault();
        this.props.setUser(this.state.username);
    }

    render(){
        return (
            <div className='user-login'>
                <h1>Insert your username</h1>
                <form onSubmit={(e) => this.setUser(e)}>
                    <input id='user' type='text' placeholder='Username' onChange={(e) => this.handleChange(e)} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default LogUser;