import React, { Component } from 'react';
import Chat from './chat/Chat';
import LogUser from './chat/LogUser';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chat_ready: false,
      username: ''
    }
  }
  //After user fill the username chat_ready becomes true and initiate the chatbox.
  setUser(username){
    this.setState({username: username, chat_ready: true})
  }
  render() {
    return (
      <div className="App">
      {this.state.chat_ready ? (
        <Chat username={this.state.username}/>
      ) : (
        <LogUser setUser={(e) => {this.setUser(e)}}/>
      )}  
      </div>
    );
  }
}

export default App;
