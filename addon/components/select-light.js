import Ember from 'ember';
import layout from '../templates/components/select-light';

const { computed, get } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'select',
  attributeBindings: ['name', 'id', 'disabled', 'tabindex'],

  value: null,
  name: null,
  id: null,
  disabled: false,
  tabindex: null,
  placeholder: '',
  disablePlaceholder: false,
  options: [],
  valueKey: 'value',
  displayKey: 'label',

  isDeepOptions: computed('options', 'valueKey', 'displayKey', function() {
    let valueKey = get(this, 'valueKey');
    let displayKey = get(this, 'displayKey');
    let firstOptionValue = get(this, `options.0.${valueKey}`);
    let firstOptionDisplay = get(this, `options.0.${displayKey}`);
    return !(firstOptionValue === undefined && firstOptionDisplay === undefined);
  }),
});
