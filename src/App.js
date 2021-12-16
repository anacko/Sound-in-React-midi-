import './App.css';
import MidiSounds from './MidiSounds';

export default function App() {

  return (
    <div className="App">
      <h1>Hello React World</h1>
      <MidiSounds instrument={173} pitches={[60]} duration={0.6}/>
    </div>
  );
}