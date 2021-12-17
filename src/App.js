import './App.css';
import FullPiano from './FullPiano';
import MidiSounds from './MidiSounds';
import SimonButtons from './SimonButtons';

export default function App() {

  return (
    <div className="App">
      <h3>Component 1:</h3>
      <p>Simple sound - Instrument 124</p>
      <MidiSounds instrument={124} pitches={[60]} duration={0.6}/>
      <h3>Component 2:</h3>
      <p>More sophisticated component, a Full Piano</p>
      <p>(That has a default for instrument 124: Marimba!)</p>
      <FullPiano />
      <h3>Component 3:</h3>
      <p>Four colored buttons using the Full Piano template, instrument 124:</p>
      <SimonButtons />
      <p>Small, but that's the one we need for Simon.</p>
    </div>
  );
}