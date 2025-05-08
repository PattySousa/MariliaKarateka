  /* JS do galeria.html - desenvolvido por Patrícia Sousa*/

  $(document).ready(function () {
    let currentIndex = 0;
    const totalItems = $('#carousel li').length;
  
    $('#next').click(function (e) {
      e.preventDefault();
      if (currentIndex < totalItems - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });
  
    $('#prev').click(function (e) {
      e.preventDefault();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalItems - 1;
      }
      updateCarousel();
    });
  
    function updateCarousel() {
    // Pega a largura atual do container, que muda conforme o dispositivo
    const containerWidth = $('.carousel-container').width();
    const offset = -currentIndex * containerWidth;
    $('#carousel').css('transform', 'translateX(' + offset + 'px)');
    });
  }