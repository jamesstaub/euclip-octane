import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class ScriptWrapperComponent extends Component {
  @tracked scriptUi;
  @tracked editorLineCount;
  
  constructor() {
    super(...arguments);
    this.scriptUi = 'init';
  }
  
  loadPreset(preset) {
    const {initScript, onstepScript} = preset;
    if (initScript) {
      let script = this.args.track.get('initScript');
      script.set('editorContent', initScript);
      script.get('runCode').perform();
    }
    if (onstepScript) {
      let script = this.args.track.get('onstepScript');
      script.set('editorContent', onstepScript);
      script.get('runCode').perform();
    }
  }

  @action
  calculateHeight(element) {
    const { height } = element.parentElement.getBoundingClientRect();
    const heightOfNonEditorElements = 470;
    const editorLineCountMultiplier = 0.057;
    // This is a sketch approximation to dynamically set the ace-editor height based on the parent component height
    this.editorLineCount = Math.ceil((height - heightOfNonEditorElements) * editorLineCountMultiplier)
  }

  @action
  setUi(val) {
    this.scriptUi = val;
  }

  @action
  selectPreset({target}) {
    const selectionIdx = target.value;
    this.loadPreset(this.args.presets[selectionIdx]);

  }
}
