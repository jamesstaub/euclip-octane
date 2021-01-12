import Component from '@glimmer/component';
import { action } from '@ember/object';
import TrackNodeModel from '../models/track-node';
import { tracked } from '@glimmer/tracking';
import {
  inject as controller
} from '@ember/controller';

export default class TrackFooterContainerComponent extends Component {
  @tracked controlUi;
  @tracked visibleNodeIdx;
  
  @controller('user.creator.project') project;

  constructor() {
    super(...arguments);
    this.maxSteps = 64;
    this.setTabs();
  }

  get validTrackNodes() {
    //dont try to render if record has no corresponding AudioNode
    return TrackNodeModel.validTrackNodes(this.args.track);
  }

  get trackNodesForControls() {
    // all nodes except the children of channelStrip maco
    return this.validTrackNodes.filterBy('parentMacro', undefined);
  }

  get channelStripTrackNodes() {
    // the children of channelStrip maco
    return this.validTrackNodes.filterBy('parentMacro');
  }

  // FIXME using firstObject here seems to cause a bug where, when a gain multislider node is deleted, the channelStrips gain 
  // flashes into a multislider for a second. investigate 
  get channelStripGainControl() {
    return TrackNodeModel.channelStripNode(this.args.track, 'gain')?.trackControls?.firstObject;
  }

  get channelStripPannerControl() {
    return TrackNodeModel.channelStripNode(this.args.track, 'panner')?.trackControls?.firstObject;
  }

  get trackNodesTabs() {    
    return this.trackNodesForControls.map((trackNode, idx) => {
      return {
        label: trackNode.nodeType,
        order: trackNode.order,
        value: idx, // the node index sets which tab is visible with template logic
      }
    }).sortBy('order')
  }

  @action
  setUi(key, val) {
    this[key] = val;
  }

  @action
  setTabs() {
    if (this.project.leftSidebarOpen) {
      this.controlUi = 'source'
    } else if (!this.controlUi) {
      this.controlUi = 'controls'
    }
    this.visibleNodeIdx = 0;
  }

  @action
  updateControl(trackControl, value) {
    trackControl.setValue(value);
    trackControl.saveTrackControl.perform();
  }
}
