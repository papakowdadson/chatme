const MessageCard = ({ message, name }) => {
  let trimmed = name.trim().toLowerCase();
  let isUser = false;
  if (message.user == trimmed) {
    isUser = true;
  }

  return (
    <>
      {console.log(`chat message ${message.text}`)}
      <div>
        <p>{message.text}</p>
        <h5>{message.user}</h5>
        {/* <p>testiin</p> */}
      </div>
    </>
  );
};

export default MessageCard;
