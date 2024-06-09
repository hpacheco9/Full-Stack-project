export default function Inputs(props) {
  const { value, type, name } = props;

  return <input type={type} name={name} id={value} value={value} />;
}
