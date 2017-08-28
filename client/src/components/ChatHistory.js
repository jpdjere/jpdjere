import * as React from 'react';

const ChatHistory = (props) => {

  // we’ll use the curly braces to output the result of the array map, since we’ll
  //  be returning JSX in our array map.Wrap the <li> so that it looks like so:
  //It’s important to add a ‘key’ attribute to the list item.
  // Whenever you repeat values in JSX, React needs a unique identifier so that it can apply updates as needed to that DOM element.
  // Since our messages have a timestamp down to the millisecond, this should be adequate.


    return (
        <ul className="collection">
        { props.history.map((messageObj) => {
          let imgURL = '//robohash.org/' + messageObj.Who +'?set=set2&bgset=bg2&size=70x70';
          let messageDate = new Date(messageObj.When);
          let messageDateTime = messageDate.toLocaleDateString() +' at ' + messageDate.toLocaleTimeString();
          return (
          <li className="collection-item avatar" key={ messageObj.When }>
            <img src={ imgURL } alt={ messageObj.Who } className="circle" />
            <div className="title">Anonymous robot #{ messageObj.Who }</div>
            <div>{ messageObj.What }</div>
            <div className="message-date">{ messageDateTime }</div>
          </li>
        ); })
       }
      </ul>
    );

}

export default ChatHistory;
