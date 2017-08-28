import React from 'react';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';
import PubNubReact from 'pubnub-react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userID: Math.round(Math.random() * 1000000).toString(),
      history: [],
    };

    this.PubNubReact = new PubNubReact({
      publishKey: 'pub-c-16087bca-e20e-4ab4-9047-725901d50ffe',
      subscribeKey: 'sub-c-070667ae-8848-11e7-953d-ce3f2a1d1460'
    });

    this.sendMessage = (message) => {
      // for now this will let us know things work.  `console` will give us a
      // warning though
      console.log('sendMessage', message);
      this.PubNubReact.publish({
        channel: 'ReactChat',
        message: message,
      });
    }
    this.replyMessage = (message) => {
      fetch('/chat')
         .then(res => res.json())
         .then(users => console.log({ users }));
      console.log('replyMessage', message);
      // this.PubNubReact.publish({
      //   channel: 'ReactChat',
      //   message: message,
      // });
    }

  }

  componentWillMount() {
    this.PubNubReact.init(this);
    this.PubNubReact.subscribe({
      channels: ['ReactChat'],
      withPresence: true
    });

    this.PubNubReact.getMessage('ReactChat', (message) => {
      console.log("message is:", message);
      this.setState({
        history: this.state.history.concat(message.message)
      })
      console.log(this.state.history);
    });

  }

  componentDidMount() {

    fetch('/users')
       .then(res => res.json())
       .then(users => console.log({ users }));


  }

  render() {
    return (
      <div>
        <ChatHistory history={ this.state.history } />
        <ChatInput userID={ this.state.userID } sendMessage={ this.sendMessage } replyMessage={this.replyMessage}/>
      </div>
    );
  }
}

export default App;
