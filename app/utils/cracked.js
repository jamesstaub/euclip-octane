/**
 *  Utility functions for creating and managing state of audio nodes using the cracked library.
 *  All usage of the cracked library should occur in this file to create a decoupled interface between 
 *  Euclip and Cracked.
 * 
 * 
 */

export function getCrackedNode(uuid) {
  return __._getNode(uuid);
}

/**
 * create the custom `channelStrip` cracked macro, which is relied upon by the Track UI
 * Tracks create channel strips, which are simply a gain node and a panner node,
 * and TrackControl records can be automatically created based off of this macros ui options.
 * This ensures all new tracks have consistent volume/pan UI
 *
 */
export function defineChannelStripMacro() {
  cracked.channelStrip = function(params = {}) {
    
    __.begin('channelStrip', params).gain(1).panner().end('channelStrip');
    return cracked;
  }
}

/**
 * 
 * @param {AudioNode} node 
 * @param {string} selector 
 * 
 * Euclip's stategy for creating ids + classess on cracked nodes behind the scenes. 
 * relies on customized version of Cracked, which adds the _setNodeLookup
 * 
 * for selectors to work properly in Cracked, they need to live on the audio node's selector array 
 * and need to be a key in the _nodeLookup
 */
export function addCustomSelector(node, selector) {
  __._setNodeLookup(selector, node.getUUID());
  node.selector_array.push(selector);
}

/**
 * start the cracked `loop` at a certain interval (ms)
 */
export function startLoop(loopInterval) {
  __.loop('start');    
  __.loop(loopInterval);
}

/**
 * stop the cracked `loop` and 
 * also stop playback of all nodes
 */
export function stopLoop() {
  __.loop('stop');    
  __('*').stop();
}

/**
 * 
 * @param {String: cracked selector} nodeSelector 
 * @param {Function } callback 
 * @param {Array} array 
 * 
 * The cracked __.loop is the main sequencer that Euclip binds track scripts to
 */
export function bindSourcenodeToLoopStep(nodeSelector, callback, array) {
  __(nodeSelector).bind(
    'step', // on every crack sequencer step
    callback, // call this function (bound to component scope)
    array // passing in array value at position
  );
}

export function unbindFromSequencer(samplerSelector) {
  __(samplerSelector).unbind('step');
}

/**
 * Configuration for createing TrackControl records assigned to TrackNodes 
 * based on the supported node types in the cracked library.
 */
export function paramsForNode(nodeType) {
  switch (nodeType) {
    case 'bitcrusher':
      return ['frequency', 'bits'];
    case 'comb':
      return ['delay', 'damping', 'cutoff', 'feedback'];
    case 'compressor':
      return ['threshold', 'knee', 'ratio', 'attack', 'release'];
    case 'delay':
      return ['delay', 'damping', 'feedback', 'cutoff', 'frequency'];
    case 'gain':
      return ['gain'];
    case 'lowpass' || 'highpass' || 'bandpass' || 'allpasss' || 'notch':
      return ['frequency', 'q'];
    case 'lowshelf' || 'highshelf' || 'peaking':
      return ['frequency', 'q', 'gain'];
    case 'lfo':
      return ['frequency', 'gain'];
    case 'overdrive':
      return ['drive', 'color', 'postCut'];
    case 'panner':
      return ['pan'];
    case 'reverb':
      return ['seconds','decay', 'reverse'];
    case 'ring':
      return ['distortion', 'frequency'];
    case 'sampler':
      return ['speed', 'start', 'end', 'path'];
    case 'sine' || 'square' || 'triangle' || 'sawtooth':
      return ['frequency', 'detune'];
    default:
      return [];
  }
}

export const synthNodes = ['triangle', 'sine', 'square', 'saw'];
export const noiseNodes = ['noise', 'pink', 'white', 'brown'];