import axios from 'axios'
import './App.css';

function App() {

  const apiCall = () => {
    axios.get('http://localhost:8080').then((data) => {
      console.log(data)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <buttton onClick={apiCall}>Make API Call</buttton>
      </header>
    </div>
  );
}

export default App;
