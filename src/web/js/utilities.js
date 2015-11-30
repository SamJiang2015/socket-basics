function QuerystringToJson() {

	// location.search gives us "?A=B&C=D"
	// slice off the '?' and split into an array of "X=Y"s
	var pairs = location.search.slice(1).split('&');

	var result = {};
	pairs.forEach(function(pair) {
		pair = pair.split('=');
		result[pair[0]] = decodeURIComponent(pair[1] || '');
	});

	return JSON.parse(JSON.stringify(result));
}