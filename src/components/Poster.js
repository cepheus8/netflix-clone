const Poster = ({ poster, translate }) => {
  return (
    <img
      src={poster}
      alt="movie poster"
      width="145px"
      style={{
        opacity: 0.7,
        transform: `translate(-${translate * 100}%)`,
        transitionProperty: "transform",
        transitionDuration: "1s",
      }}
    />
  );
};

export default Poster;
