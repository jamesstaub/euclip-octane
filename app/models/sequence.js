
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import E from '../utils/euclidean';
import { isEmpty } from '@ember/utils';
export default class SequenceModel extends Model {
  @tracked hits;
  @tracked steps;
  @tracked offset;

  @belongsTo('track') track;

  // euclidean rhythm params (should eventually move to a Sequence model)
  @attr('number', {
    defaultValue() { return 0 }
  }) hits

  @attr('number', {
    defaultValue() { return 8 }
  }) steps

  @attr('number', {
    defaultValue() { return 0 }
  }) offset

  @attr() customSequence

  get sequence() {
    if (isEmpty(this.customSequence)) {
      return E(this.hits, this.steps, this.offset)
    } else {
      return this.customSequence;
    }
  }
}