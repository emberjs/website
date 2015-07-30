$(function() {
  var faqQuestions = $('#faq-questions').find('li');

  if (faqQuestions.length) {

    faqQuestions.on('click', function(e){
      e.preventDefault();
      var answerAnchor = $(this).find('a').attr('href');
      $('html, body').animate({ scrollTop:  $(answerAnchor).offset().top - 20 }, 'slow');
    });
  }

});