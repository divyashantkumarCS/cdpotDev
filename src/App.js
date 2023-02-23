import './App.css';
import BodyContainer from './components/BodyContainer';
import Navigation from './components/Navigation';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <Navigation/>
      <BodyContainer/>
    </div>
  );
}

export default App;
