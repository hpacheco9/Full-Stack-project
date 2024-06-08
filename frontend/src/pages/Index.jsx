import Header from "../components/Header.jsx";
import logo from "../assets/react.svg";
import DefaultLayout from "../layouts/DefaultLayout.jsx";

export default function Index() {
    return (
        <DefaultLayout>
            <Header logo={logo} code={<code>src/App.js</code>} />
        </DefaultLayout>
    )
}