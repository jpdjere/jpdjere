import * as React from 'react';

export default class ChatInput extends React.Component {

  constructor(props){
    super(props);

    this.onSubmit = (e) => {
      e.preventDefault();
      // Check if the message is empty
      const message = this.refs.txtMessage.value;
      if (message.length === 0) {
        return;
      }
      // Build a message object and send it
      const messageObj = {
        Who: this.props.userID,
        What: message,
        When: new Date().valueOf(),
      };
      this.props.sendMessage(messageObj);

      // Clear the input field and set focus
      this.refs.txtMessage.value = '';
      this.refs.txtMessage.focus();
    };
    this.userID=props.userID;
    this.imgURL = '//robohash.org/' + props.userID + '?set=set2&bgset=bg2&size=70x70';

  }



  componentDidMount() {
    this.refs.txtMessage.focus();
  }


  render() {
    return (
      <footer className="teal">
        <form className="container" onSubmit={ this.onSubmit }>
          <div className="row">
            <div className="input-field col s10">
              <i className="prefix mdi-communication-chat" />
              <input type="text" ref="txtMessage" placeholder="Type your message" />
              <span className="chip left">
                <img src={ this.imgURL } alt="Robot 1"/>
                <span>Anonymous robot #{ this.userID }</span>
              </span>
            </div>
            <div className="input-field col s2">
              <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                <i className="mdi-content-send" />
              </button>
            </div>
          </div>
        </form>
      </footer>
    );
  }
}
