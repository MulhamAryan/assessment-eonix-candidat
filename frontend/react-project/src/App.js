import React from 'react';
import './App.css';
import IpList from './components/IpList';

function App() {
    return (
        <div className="App">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">Gestionnaire d'IPs</span>
                </div>
            </nav>
            <IpList />
        </div>
    );
}

export default App;