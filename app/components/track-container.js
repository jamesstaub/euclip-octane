import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TrackContainerComponent extends Component {
  @service router

  @action
  async deleteTrack() {
    const projectTracks = this.args.track.get('project.tracks');
    await this.args.track.destroyAndCleanup();
    this.router.transitionTo('user.creator.project.track', projectTracks.firstObject);
  }

  @action
  updateTrackSequence(value, sequencer) {
    //if sequence is different than euclidean output 
    this.args.track.set('customSequence', sequencer.matrix.pattern[0]);
    
    // TODO throttle save with task?
    // this.args.track.save();
  }
}