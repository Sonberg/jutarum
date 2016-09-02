import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["menu-margin"],
  subject: [
    'Engelska',
    'Svenska',
    'Naturvetenskap'
  ],

  semester: [
    'Vårterminen 2015',
    'Hösttreminen 2015',
    'Vårterminen 2016'
  ],

  klass: [
    'Åk 1',
    'Åk 2',
    'Åk 3'
  ],


  _jQuery: function () {
    Ember.$(".subject").select2({
  minimumResultsForSearch: Infinity
});

    Ember.$(".semester").select2({
      minimumResultsForSearch: Infinity
    });

    Ember.$(".klass").select2({
      minimumResultsForSearch: Infinity
    });

}.on("didInsertElement").observes("selected"),
});
