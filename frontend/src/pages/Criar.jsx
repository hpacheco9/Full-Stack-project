import { styled } from "styled-components";
import DefaultLayout from "../layouts/DefaultLayout";
import Image from "../components/Image";
import text from "../assets/images/text.png";
import arrow from "../assets/images/arrow.png";
import Inputs from "../components/inputs";

const FormContainer = styled.div`
  margin-left: 7%;
  margin-bottom: 2%;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const P = styled.p`
  color: white;
  font-family: Abeezee;
  font-size: 40px;
  font-weight: 100;
  margin-bottom: 1%;
  position: relative;
`;

const Label = styled.label`
  color: white;
  font-size: x-large;
  font-family: "ABeeZee", sans-serif;
  font-weight: lighter;
  font-style: normal;
  margin-left: 1%;
`;

const Inputs2 = styled.input`
  padding: 10px 20px;
  font-size: large;
  height: 50px;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  transition: background-color 0.3s;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: black; /* Change background color to black when hovered */
    color: white; /* Change text color to white when hovered */
  }
`;

export default function Criar() {
  return (
    <DefaultLayout>
      <ContentContainer>
        <Image
          source={text}
          style={{
            width: "50%",
            height: "auto",
            marginTop: "19%",
            marginLeft: "2%",
          }}
        />
      </ContentContainer>
      <span>
        <a href="/src/views/menu.ejs">
          <Image
            source={arrow}
            style={{ width: "46px", height: "46px", marginLeft: "1%" }}
          />
        </a>
      </span>
      <FormContainer>
        <form>
          <P> Dificuldade </P>
          <Inputs type={"radio"} name={"op1"} value={"facil"}></Inputs>
          <Label htmlFor="facil">Fácil</Label>
          <br></br>
          <Inputs type={"radio"} name={"op1"} value={"medio"}></Inputs>
          <Label htmlFor="medio">Médio</Label>
          <br></br>
          <Inputs type={"radio"} name={"op1"} value={"difcil"}></Inputs>
          <Label htmlFor="dificl">Dificil</Label>
          <br></br>

          <P> Modo </P>
          <Inputs type={"radio"} name={"op2"} value={"individual"}></Inputs>
          <Label htmlFor="facil">Individual</Label>
          <br></br>
          <Inputs type={"radio"} name={"op2"} value={"equipa"}></Inputs>
          <Label htmlFor="medio">Equipa</Label>
          <br></br>
          <br></br>

          <Inputs2 type={"Submit"} value="Jogar"></Inputs2>
          <br></br>
          <br></br>
        </form>
      </FormContainer>
    </DefaultLayout>
  );
}
