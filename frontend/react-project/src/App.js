
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="container">
            <header className="text-center my-5">
                <img src={logo} className="App-logo" alt="logo" />
                {/* Utilisation de classes Bootstrap */}
                <div className="alert alert-primary" role="alert">
                    Un exemple avec Bootstrap
                </div>
                {/* Utilisation de classes Tailwind */}
                <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                    Un exemple avec Tailwind
                </div>
                {/* Mélange des deux */}
                <button className="btn btn-primary mt-4 hover:bg-blue-700 transform hover:scale-105 transition-transform">
                    Un bouton avec les deux
                </button>
            </header>
        </div>
    );
}

export default App;