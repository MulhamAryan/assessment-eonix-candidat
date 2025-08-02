
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="container">
        <header className="text-center my-5">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="mt-3">
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="btn btn-primary"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;