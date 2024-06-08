import { styled } from "styled-components";
import background from "../assets/images/background.jpg";

const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
`;

export default function DefaultLayout({ children }) {
  return <Container>{children}</Container>;
}
