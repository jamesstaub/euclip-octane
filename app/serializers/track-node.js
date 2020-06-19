import ApplicationSerializer from './application';

export default class TrackNodeSerializer extends ApplicationSerializer {
  attrs =  {
    nodeUUID: { serialize: false },
    parentMacro: { serialize: false },
  }
}