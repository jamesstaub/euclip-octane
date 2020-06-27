import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TrackContainerComponent extends Component {
  @service router

  @action
  async deleteTrack() {
    this.args.track.destroyAndCleanup();
  }

  @action
  async duplicateTrack() {
    this.args.track.duplicate();
  }

  @action
  updateTrackSequence(idx) {
    //if sequence is different than euclidean output 
    // manually override sequence
    console.log('TODO manually set seq', idx);
    
    // TODO throttle save with task?
    // this.args.track.save();
  }

}
