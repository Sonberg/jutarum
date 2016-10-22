define('client/components/mission-report-tag-filter/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ["menu-margin"],
    subject: ['Engelska', 'Svenska', 'Naturvetenskap'],

    semester: ['Vårterminen 2015', 'Hösttreminen 2015', 'Vårterminen 2016'],

    klass: ['Åk 1', 'Åk 2', 'Åk 3'],

    _jQuery: (function () {
      _ember['default'].$(".subject").select2({
        minimumResultsForSearch: Infinity
      });

      _ember['default'].$(".semester").select2({
        minimumResultsForSearch: Infinity
      });

      _ember['default'].$(".klass").select2({
        minimumResultsForSearch: Infinity
      });
    }).on("didInsertElement").observes("selected")
  });
});