// import React from 'react';
// import styles from './ClientSocket.css';

// function ClientSocket() {
//   return (
//     <div className={styles.normal}>
//       Component: ClientSocket
//     </div>
//   );
// }

import React, { Component } from 'react';
import styles from './ClientSocket.css';

//require('socket.io-client')('服务端ip+端口')
const socket = require('socket.io-client')('http://localhost:3000');


class ClientSocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages:[],
    }

    socket.on('message', (message)=>{
      this.updateMsg(message);
    });
  }

  // 发送新消息
  updateMsg(message) {
    let { messages } = this.state;
    messages.push(message);
    this.setState({ messages: messages });
  }

  handleChange = (e) => {
    this.setState({message: e.target.value});
  }

  handleSubmit = (e) => {
    const { message } = this.state;

    if (message) {
      socket.emit('message', message);
      this.setState({ message:'' });
    }
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleSubmit();
    }
    return false;
  }

  render() {
    const { message, messages } = this.state;

    return(
      <div>
        <ul id="messages">
          {
            messages.map((item, index) => <li className="message-content" key={index}>{item}</li>)
          }
        </ul>
        <div className="input-box">
          <input id="m" type="text" placeholder="按回车提交" value={message} onKeyPress={this.handleKeyPress} onChange={this.handleChange}/>
          <button type="button" onClick={this.handleSubmit}>提交</button>
        </div>
      </div>
    )
  }
}

export default ClientSocket;
