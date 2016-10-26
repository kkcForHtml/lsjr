define(function (require,exports,module) {
	require('jquery-1.11.3');
	var p = {
		_init:function () {
			
		},
		test:function () {
			$('#indusId').change(function () {
				alert($(this).val()) 
			})
		}
	}
	module.exports = p;
})
