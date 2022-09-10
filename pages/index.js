import Navbar from "../components/landingPage/Navbar";
import Main from "../components/landingPage/Main";

const LandingPage = () => {
  return (
    <div className="max-w-7xl mx-auto h-screen overflow-hidden">
      <Navbar />
      <Main />
    </div>
  );
};

export function getServerSideProps() {
  return {
    props: { title: "Rubrica - 21st century rubric builder" },
  };
}

export default LandingPage;
