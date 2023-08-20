import Slider from "./Slider";

const section = [
  { title: "Crime movies", Query: "Marvel" },
  { title: "Spider-Man movies", Query: "Spider-Man" },
];

const HomeSection = () => {
  return (
    <main>
      {section.map((mov) => (
        <Slider query={mov.Query} title={mov.title} />
      ))}
    </main>
  );
};

export default HomeSection;
