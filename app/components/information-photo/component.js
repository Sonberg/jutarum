import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["information-photo"],
  attributeBindings: ["contenteditable"],
  contenteditable: false,
  url: null,
  placeholder: "+"
});
