
import './App.css';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <div className="App">
      <h1 style={{"paddingLeft":"10px"}}>Shadowrun Character Generator</h1>
      <Dashboard className='dashboard'/>
    </div>
  );
}

export default App;
