import Header from "../components/Header";
import logo from "../assets/images/logo.svg";

export default function Home() {
  return (
    <div className="App">
      <Header logo={logo} code={"Hello"} />
    </div>
  );
}
