import { styled } from "styled-components";
import DefaultLayout from "../layouts/DefaultLayout";
import Image from "../components/Image";
import text from "../assets/images/text.png";
import arrow from "../assets/images/arrow.png";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { RadioInput, SubmitButton } from "../components/Form";

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const P = styled.p`
  color: white;
  font-family: Abeezee;
  font-size: 30px;
  font-weight: 100;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
  margin-left: 2%;
`;

const Label = styled.label`
  color: white;
  font-size: x-large;
  font-family: "ABeeZee", sans-serif;
  font-weight: lighter;
  font-style: normal;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export default function Criar() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <ContentContainer>
        <Image
          source={text}
          style={{ marginTop: "10%", marginLeft: "5%", marginBottom: "5%" }}
        />
      </ContentContainer>
      <span>
        <a href="/menu">
          <Image
            source={arrow}
            style={{ width: "46px", height: "46px", marginLeft: "1%" }}
          />
        </a>
      </span>
      <Formik
        initialValues={{ difficulty: "0", mode: "true" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const difficultyInt = parseInt(values.difficulty);
          const modeBool = values.mode === "true";
          console.log({ difficulty: difficultyInt, mode: modeBool });
          navigate("/game", {
            state: { difficulty: difficultyInt, mode: modeBool },
          });
        }}
        validationSchema={Yup.object({
          difficulty: Yup.number()
            .required("Dificuldade é obrigatória")
            .oneOf([0, 1, 2], "Dificuldade inválida"),
          mode: Yup.boolean().required("Modo é obrigatório"),
        })}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <P>Dificuldade</P>
            <LabelContainer>
              <RadioInput
                type="radio"
                id="facil"
                name="difficulty"
                value="0"
                onChange={handleChange}
                checked={values.difficulty === "0"}
              />
              <Label htmlFor="facil">Fácil</Label>
            </LabelContainer>
            <LabelContainer>
              <RadioInput
                type="radio"
                id="medio"
                name="difficulty"
                value="1"
                onChange={handleChange}
                checked={values.difficulty === "1"}
              />
              <Label htmlFor="medio">Médio</Label>
            </LabelContainer>
            <LabelContainer>
              <RadioInput
                type="radio"
                id="dificil"
                name="difficulty"
                value="2"
                onChange={handleChange}
                checked={values.difficulty === "2"}
              />
              <Label htmlFor="dificil">Difícil</Label>
            </LabelContainer>

            <P>Modo</P>
            <LabelContainer>
              <RadioInput
                type="radio"
                id="single"
                name="mode"
                value="true"
                onChange={handleChange}
                checked={values.mode === "true"}
              />
              <Label htmlFor="single">Individual</Label>
            </LabelContainer>
            <LabelContainer>
              <RadioInput
                type="radio"
                id="multi"
                name="mode"
                value="false"
                onChange={handleChange}
                checked={values.mode === "false"}
              />
              <Label htmlFor="multi">Equipa</Label>
            </LabelContainer>
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "50px",
                height: "50px",
                marginTop: "2%",
                marginLeft: "10%",
                borderRadius: "5px",
              }}
            >
              Criar
            </SubmitButton>
          </form>
        )}
      </Formik>
    </DefaultLayout>
  );
}
