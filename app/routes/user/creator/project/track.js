import Route from '@ember/routing/route';

export default class UserCreatorProjectTrackRoute extends Route {
  async model(params) {
    const slug = this.modelFor('user.creator.project').slug;
    let model;
    if (slug) {
      try {
        model = await this.store.findRecord('track', params.track_id, {adapterOptions: { slug } });
      } catch (error) {
        this.transitionTo('user.creator.project');
      }
    }
    return model;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    this.controllerFor('user.creator.project').set('activeTrack', model);
  }
}
