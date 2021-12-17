import { Component } from 'react';
import MIDISounds from 'midi-sounds-react';


class SimonButtons extends Component {
	constructor(props) {
		super(props);
		this.midiNotes=[];
		this.state = { selectedInstrument: 124, echo: 0, status:'?'};
	}
	componentDidMount() {
    this.envelopes=[];		
    this.midiSounds.setEchoLevel(0);		
		this.startListening();
	}
	createSelectItems() {
		if (this.midiSounds) {
			if (!(this.items)) {
				this.items = [];
				for (let i = 0; i < this.midiSounds.player.loader.instrumentKeys().length; i++) {
					this.items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + this.midiSounds.player.loader.instrumentInfo(i).title}</option>);
				}
			}
			return this.items;
		}
	}
	keyDown(n=0,v){
		this.keyUp(n);
		var volume=1;
		if(v){
			volume=v;
		}
		this.envelopes[n]=this.midiSounds.player.queueWaveTable(this.midiSounds.audioContext,
			this.midiSounds.equalizer.input,
			window[this.midiSounds.player.loader.instrumentInfo(this.state.selectedInstrument).variable],
			  0, n, 9999,volume);
		this.setState(this.state);
	}
	keyUp(n){
		if(this.envelopes){
			if(this.envelopes[n]){
				this.envelopes[n].cancel();
				this.envelopes[n]=null;
				this.setState(this.state);
			}
		}
	}
	pressed(n){
		if(this.envelopes){
			if(this.envelopes[n]){
				return true;
			}
		}
		return false;
	}
	onMIDIOnStateChange(event) {
		this.setState({status:event.port.manufacturer + ' ' + event.port.name + ' ' + event.port.state});
	}
	requestMIDIAccessSuccess(midi){
		console.log(midi);
		var inputs = midi.inputs.values();
		for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
			input.value.onmidimessage = this.midiOnMIDImessage.bind(this);
		}
		midi.onstatechange = this.onMIDIOnStateChange.bind(this);
	}
	requestMIDIAccessFailure(e){
		console.log('requestMIDIAccessFailure', e);
		this.setState({status:'MIDI Access Failure'});
	}
	startListening(){
		this.setState({status:'waiting'});
		if (navigator.requestMIDIAccess) {
			navigator.requestMIDIAccess().then(this.requestMIDIAccessSuccess.bind(this), this.requestMIDIAccessFailure.bind(this));
		} else {
			this.setState({status:'navigator.requestMIDIAccess undefined'});
		}
	}
  render() {
    return (
      <div>	
		<table align="center">
				<tbody>
					<tr>
						<td style={{"background-color": "yellow"}} onMouseDown={(e)=>this.keyDown(1+12*4)} onMouseUp={(e)=>this.keyUp(1+12*4)} onMouseOut={(e)=>this.keyUp(1+12*4)}>11</td>
						<td style={{"background-color": "green"}} onMouseDown={(e)=>this.keyDown(4+12*3)} onMouseUp={(e)=>this.keyUp(4+12*3)} onMouseOut={(e)=>this.keyUp(4+12*3)}>30</td>
						<td style={{"background-color": "red"}} onMouseDown={(e)=>this.keyDown(9+12*3)} onMouseUp={(e)=>this.keyUp(9+12*3)} onMouseOut={(e)=>this.keyUp(9+12*3)}>33</td>
						<td style={{"background-color": "blue"}} onMouseDown={(e)=>this.keyDown(4+12*4)} onMouseUp={(e)=>this.keyUp(4+12*4)} onMouseOut={(e)=>this.keyUp(4+12*4)}>37</td>
					</tr>
				</tbody>
			</table>
		<MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[this.state.selectedInstrument]} />	
		  </div>
    );
  }
}

export default SimonButtons;