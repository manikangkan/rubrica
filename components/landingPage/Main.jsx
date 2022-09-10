const Main = ({ setIsAuthModalOpen }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-2">
        <h1>
          Rubric creation & evolution
          <span className="font-normal"> made easy</span>
        </h1>
        <p>
          Create rubric with a simple drag and drop interface, evalute, automate
          and evolve.
        </p>
      </div>
      <button
        className="rounded-full text-lg"
        onClick={() => setIsAuthModalOpen(true)}>
        Get started now
      </button>
    </div>
  );
};

export default Main;