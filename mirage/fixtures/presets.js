import onstepScript from "../factories/onstep-script";

const lfos = [
  {
    title: 'modulate sampler',
    description: '',
    initScript: 
`__()
  .sampler({
    id: this.id,
    path: this.filepath,
    ui: 'multislider',
  })
  .channelStrip()
  .connect('#mixer');

  __('#lfo-1').remove();
  __().lfo({
    id: 'lfo-1',
    type: 'sine', // sine, sawtooth, square, triangle, pink
    frequency: 1, // Hz
    gain: 2,// LFO amplitude (max value for speed)
    modulates:'speed'
  }).connect(this.samplerSelector);

  __('#lfo-1').start();

`,
    onstepScript:
`if (data) {
  this.playSample(index);
  __('#lfo-1').connect(this.samplerSelector);
}`
  }
];

const synths = [
  {
    title: 'synth ADSR',
    initScript:
`
// TODO: automatically clean up oscillators and LFOs to avoid need for .remove()
__('.my-sines').remove();
__('.my-envelopes').remove();

__().channelStrip({ id:'sineMixer' }).connect('#mixer');

// create 8 sine waves in a loop, each with an ADSR for envelop control
// connect them to the channel strip macro created above
for (var i = 0; i < 8; i++) {
  __().sine({
    id: 'sin-' + i,
    class: 'my-sines',
  })
  .adsr({
    class: 'my-envelopes'
  })
  .connect('#sineMixer')  
}
`,
    onstepScript:
`if (data) {
  __('.my-sines').start();

  // select all the adsr nodes, then call the method adsr() with "trigger" and array of 
  // attack(sec), decay(sec), sustain(gain), release(sec)
  __('.my-envelopes').adsr('trigger', [0.25, 0.1, 0.1, 1]);
  
  // loop over the 8 sine waves and change their frequency to a random note in a minor scale
  for (var i = 0; i < 8; i++) {
    var note = __.random_scale('minor', 3, 6);
    __('#sin-'+i).attr({ frequency: note });
  }
}

`
  }
]

const presets = [...lfos, ...synths];
export default presets