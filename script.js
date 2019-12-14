$(function() {	
	var born_sorted = helper.arr.multisort(persons, ['born', 'name'], ['ASC','DESC']);
	var died_sorted = helper.arr.multisort(persons, ['died', 'name'], ['ASC','DESC']);

	var start_year = born_sorted[0]['born'];
	var end_year = died_sorted[$(died_sorted).length-1]['died'];

	for(var year = start_year; year <= end_year; year++) {
		
		var clear_year = year;

		if(year < 0) {
			clear_year = year + 'BC';
		}

		var year_box = '<div class="entry" data-year="' + year + '"><h2>' + clear_year + '</h2></div>';
		$('.timeline').append(year_box);
	}

	$(born_sorted).each(function(k, v) {
		var start = $('.entry[data-year="' + v['born'] + '"]').offset().left + 14;
		var end = $('.entry[data-year="' + v['died'] + '"]').offset().left + 14;

		var scroll_start = '';
		var scroll_end = '';

		var person_box = '<div class="person" style="left: ' + start + 'px; width: ' + (end - start) + 'px;">';
		person_box += '<div class="personbox">' + v['name'] + ' - <span class="uk-text-small uk-text-italic name">' + v['title'] + '</name></span></div>';

		$('.timeline').append(person_box);
	});
})	


if( typeof helper == 'undefined' ) {
	var helper = { } ;
}

helper.arr = {
     /**
     * Function to sort multidimensional array
     * 
     * >@param {array} [arr] Source array
     * >@param {array} [columns] List of columns to sort
     * >@param {array} [order_by] List of directions (ASC, DESC)
     * @returns {array}
     */
     multisort: function(arr, columns, order_by) {
     	if(typeof columns == 'undefined') {
     		columns = []
     		for(x=0;x<arr[0].length;x++) {
     			columns.push(x);
     		}
     	}

     	if(typeof order_by == 'undefined') {
     		order_by = []
     		for(x=0;x<arr[0].length;x++) {
     			order_by.push('ASC');
     		}
     	}

     	function multisort_recursive(a,b,columns,order_by,index) {  
     		var direction = order_by[index] == 'DESC' ? 1 : 0;

     		var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);


     		var x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
     		var y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();



     		if(x < y) {
     			return direction == 0 ? -1 : 1;
     		}

     		if(x == y)  {               
     			return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
     		}

     		return direction == 0 ? 1 : -1;
     	}

     	return arr.sort(function (a,b) {
     		return multisort_recursive(a,b,columns,order_by,0);
     	});
     }
 };