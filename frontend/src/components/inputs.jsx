export default function Inputs(props) {
  const { value } = props;

  return <input type="button" id={value} value={value} />;
}
