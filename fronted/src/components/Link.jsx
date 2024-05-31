const Link = ({ url, text }) => {
  return (
    <a
      className="App-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
};
export default Link;
