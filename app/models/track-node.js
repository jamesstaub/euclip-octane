import Model from '@ember-data/model';
import DS from 'ember-data';
const { belongsTo, hasMany, attr } = DS;

export default class TrackNodeModel extends Model {
  @belongsTo('track') track;
  @hasMany('track-control') trackControls;

  @attr('string') defaultControlInterface;
  @attr('string') nodeUUID;
  @attr('string') nodeType;
  @attr('number') order;


  
  /**
   * cache default interface so a user can use the dropdown menu to change a node's individual controls,
   * without it getting overwritten every time the script get loaded (which happens constantly)
   * 
   * FIXME probably still a bug here when you load saved controls from the API
   */
  async updateDefaultControlInterface(defaultControlInterface) {
    this.set('defaultControlInterface', defaultControlInterface);
    
    if (this._defaultControlInterface !== this.defaultControlInterface) {
      this.get('trackControls').forEach((trackControl) => {
        trackControl.set('interfaceName', defaultControlInterface);
        trackControl.save();
      });
    }
    
    this._defaultControlInterface = this.defaultControlInterface;
  }

}
