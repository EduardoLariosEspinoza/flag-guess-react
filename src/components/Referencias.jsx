function Referencias({ children, url }) {
  return (
    <a href={url} target="_blank" className="referencias">
      {children}
    </a>
  );
}

export default Referencias;
