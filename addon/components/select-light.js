import Ember from 'ember';
import layout from '../templates/components/select-light';

export default Ember.Component.extend({
  layout,
  tagName: 'select',
  attributeBindings: ['disabled', 'tabindex'],

  disabled: false,
  tabindex: null,
  placeholder: '',
});
