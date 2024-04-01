function Opciones({ prefijo, order, onSelect }) {
  return (
    <button style={{ order: order }} onClick={onSelect} className={prefijo}>
      <img
        src={`https://flagcdn.com/w160/${prefijo}.png`}
        alt=""
        className={prefijo}
      />
    </button>
  );
}

export default Opciones;
