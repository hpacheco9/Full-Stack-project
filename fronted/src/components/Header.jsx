import Link from "./Link.jsx";

export default function Header({ logo, code }) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Edit {code} and save to reload.</p>
      <Link url="https://reactjs.org" text="Learn React" />
    </header>
  );
}
