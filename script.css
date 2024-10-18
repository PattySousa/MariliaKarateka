$(document).ready(function(){
    let currentIndex = 0;
    const totalItems = $('#carousel li').length;
  
    $('#next').click(function(e) {
      e.preventDefault();
      if (currentIndex < totalItems - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });
  
    $('#prev').click(function(e) {
      e.preventDefault();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalItems - 1;
      }
      updateCarousel();
    });
  
    function updateCarousel() {
      const offset = -currentIndex * 100;
      $('#carousel').css('transform', 'translateX(' + offset + '%)');
    }
  });
  
  /* JS do galeria.html - desenvolvido por Patrícia Sousa*/