(function() {


console.log('router');

var lastHash = null;

if (!('onhashchange' in window)) {
    var oldHref = location.href;
    setInterval(function() {
        var newHref = location.href;
        if (oldHref !== newHref) {
            var _oldHref = oldHref;
            oldHref = newHref;
            hashChange.call(window, {
                'type': 'hashchange',
                'newURL': newHref,
                'oldURL': _oldHref
            });
        }
    }, 100);
} else if (window.addEventListener) {
    window.addEventListener("hashchange", hashChange, false);
}
else if (window.attachEvent) {
    window.attachEvent("onhashchange", hashChange);    
}

function hashChange(evt) {
	console.log('HASH', location.hash);
	var hash = location.hash;

	// если последний хэш равен это работа 
	// а текущий - нет, то скрываем работы
	if (lastHash && lastHash[1] == 'w' && hash[1] != 'w') {
		$(document).trigger('globalEvent', {
				group : 'workmodal',
				action : 'hide'
			});
	}

	if (hash[1] == 'w') {
		console.log('load image');
		var r = /w=(.+)/g;
		var id = atob(r.exec(hash)[1]);

		setTimeout(function() {
			$(document).trigger('globalEvent', {
				group : 'workmodal',
				action : 'show',
				workid : id
			});
		});
	}
	lastHash = hash;
}

hashChange();

})()