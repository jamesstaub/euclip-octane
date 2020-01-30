import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('user', { path: '/' }, function () {
    this.route('my-projects', { path: '/' });
    this.route('new');
    this.route('creator', { path: '/:user_id' }, function() {
      this.route('project', { path: '/:slug' }, function() {});
      this.route('projects');
    });
  });
  this.route('login');
});
