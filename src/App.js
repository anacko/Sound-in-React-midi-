import './App.css';
import FullPiano from './FullPiano';
import MidiSounds from './MidiSounds';
import SimonButtons from './SimonButtons';

export default function App() {

  return (
    <div className="App">
      <h1>Hello React World</h1>
      <MidiSounds instrument={173} pitches={[60]} duration={0.6}/>
      <SimonButtons />
      <h1>Buttons for Simon uses the Full Piano template, instrument 124:</h1>
      <FullPiano />
    </div>
  );
}