import React, {Component} from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            message: '',
            fromMe: false,
            messages: [],
            typing: 'Type your message here'
        }

        this.socket = io('localhost:8989')

        this.socket.on('RECEIVED_MESSAGE', (data) => {
            this.addMessage(data);
        })

        this.socket.on('RECEIVED_TYPING', (data) => {
            this.setState({typing: data.typing ? 'Typing....' : 'Type your message here'});
        })
    }

    sendMessage = e => {
        e.preventDefault();

        //Send the message to the other sockets.
        const msg_object = {
            username: this.state.username,
            message: this.state.message,
        }
        this.socket.emit('SEND_MESSAGE', msg_object);

        //"fromMe" defines if the message was sent from the current user.
        msg_object.fromMe = true;
        this.addMessage(msg_object);
        this.setState({message: ''});
    }

    //Update the messages array with all the messages that were sent
    addMessage = data => {
        this.setState({messages: [...this.state.messages, data], typing: 'Type your message here'});
    }

    handleChange(e){
        //Update the state with the message and send to the other sockets that the user is typing.
        this.setState({message: e.target.value});
        this.socket.emit('TYPING', {
            typing: e.target.value !== '' ? true : false
        })
    }

    componentDidUpdate(){
        //If there is a new message, scroll to bottom
        const objDiv = document.getElementById('message-list');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render(){
        return(
            <React.Fragment>
                <div className="message-box" id="message-list">
                    {this.state.messages.map((msg,i) => {
                        return (
                            <div key={i} className={`message-${msg.fromMe ? 'me' : 'other'}`}>{msg.username}:{msg.message}</div>
                        )
                    })}
                </div>
                <div className='message-input'>
                    <input id='msg' autoComplete='off' value={this.state.message} onChange={e => this.handleChange(e)}
                        onKeyUp={e => {e.keyCode === 13 ? this.sendMessage(e) : null}} placeholder={this.state.typing}/>
                </div>
            </React.Fragment>
        )
    }
}

export default Chat;