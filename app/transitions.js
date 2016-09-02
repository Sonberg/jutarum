export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('rapports'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  
  this.transition(
    this.fromRoute('rapports'),
    this.toRoute('rapport'),
    this.use('toUp'),
    this.reverse('toUp')
  );

  this.transition(
    this.hasClass('tab'),
    this.use('fade')
  );

};
