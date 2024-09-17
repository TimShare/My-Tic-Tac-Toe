export default function Square({ value, setSquareValue }) {
  return (
    <button
      style={{ color: value ? "#61dafb" : "#282c34" }}
      onClick={setSquareValue}
    >
      {value || "-"}
    </button>
  );
}
