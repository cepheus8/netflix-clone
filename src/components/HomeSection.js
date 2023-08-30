import Slider from "./Slider";

const section = [
  { title: "Marvel", Query: "Marvel" },
  { title: "Spider-Man", Query: "Spider-Man" },
  { title: "Filmy docenione przez krytyków", Query: "Love" },
  { title: "Filmy sensacyjne", Query: "Kill" },
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
