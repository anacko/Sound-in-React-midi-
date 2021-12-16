import { Component } from 'react';
import MIDISounds from 'midi-sounds-react';

class MidiSounds extends Component {
  
  render() {
    return (<>
      <button onClick={() => this.midiSounds.playChordNow(this.props.instrument, this.props.pitches, this.props.duration)}>Play</button>
      <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[this.props.instrument]} />	 
    </>);
  }
}

export default MidiSounds;