<script type="text/javascript">
$(document).ready(function() {

  $('#faq-search').show();
  $('#toc').hide();
  $('li.faq-item p').hide();

  var options = {
    valueNames: [ 'faq-section', 'faq-title' ]
  };
  
  var questionList = new List('faq', options);

	$('#filter-category').change(function() {			
		var category = $(this).val().toString();

		if (category == 'none') {
	        questionList.filter();
	    }
	    else {
	        questionList.filter(function(item) {
	            if (item.values().question_category == category) {
	                return true;
	            }
	            else {
	                return false;
	            }
	        });
	    }
        return false;		
  	});
  	
  	$(document).on('click', 'li.faq-item', function() {
      $(this).data('state', 'open').addClass('open');
      $(this).find('p').fadeIn();
  	});

});
</script>

<h1 class="text-center">Frequently Asked Questions</h1>

<div class="text-center">
  <input id="faq-search" class="search" placeholder="Search Questions">
</div>