window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

window.oncontextmenu = function () {
    return false;
 }

function moveUpDown(){
    const topDownBtn = document.getElementById('top-down-btn');
    var top  = window.pageYOffset || document.documentElement.scrollTop;
    console.log(top)
    if (top < 800) 
        topDownBtn.href = "#bottom-footer";
    else
        topDownBtn.href = "#top-header";
}


$(document).keydown(function(e){
    if(e.which === 124 ){ // F12 
        return false;
    }

    if(e.which === 112){
        var btn = document.getElementById("search-btn")
        btn.click();
        return false;
    }
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {pageLanguage: 'en'},
      'google_translate_element'
    );
  }