export function HomePage({ history }) {
  const onGoToTaskApp = () => {
    history.push('/task');
  };

  return (
    <section className="home-page-section flex space-evenly">
      <div className="home-page-img-div flex justify-center">
        <img
          src={require('../assets/img/robot.jpg')}
          alt="home-page-img"
          className="home-page-img"
        />
      </div>
      <div className="home-page-btn-div">
        <button className="home-page-btn btn" onClick={onGoToTaskApp}>
          Start Demo
        </button>
      </div>
    </section>
  );
}
