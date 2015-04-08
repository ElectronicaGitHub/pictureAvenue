React = require('../libs/react/react-with-addons');
$ = require('jquery');
ConnectNode = require('./connect-node')();
moment = require('moment');
Router = require('./router');
// Wrappers = {};
// Modules = {};
pa.conf = {};
pa.conf.bucket = 'pictureave';
pa.conf.region = 'eu-central-1';
pa.conf.columnWidth = 285;
pa.conf.makeImageUrl = function(image) {
	return 'https://s3.' + pa.conf.region + '.amazonaws.com/' + pa.conf.bucket + '/' + image
}
pa.app = require('./modules/pa_app');

React.render(
	React.createElement(pa.app),
	$('body')[0]
);

// initModule = function(name, tag, mclass, appendTo, constructor) {
// 	Modules[name] = {
// 		tag : tag,
// 		mclass : mclass,
// 		appendTo : appendTo,
// 		constructor : constructor
// 	}
// 	console.log('module', name, 'initialized');
// }

// initModule('header', 'header', null, null, require('./modules/header'));
// initModule('searchpanel', 'div', 'searchpanel', 'main', require('./modules/searchpanel'));
// initModule('workspanel', 'div', 'workspanel', 'main', require('./modules/workspanel'));
// initModule('footer', 'footer', null, null, require('./modules/footer'));
// initModule('adminPanel', 'div', 'adminPanel', null, require('./modules/admin'));

// console.log(Modules);

// createModules = function() {
// 	for (i in Modules) {

// 		var selector = (Modules[i].mclass) 
// 		? '.' + Modules[i].tag
// 		: Modules[i].tag;

// 		// если такого модуля еще нет
// 		if (!$(selector).length) {
// 			// задаем враппер модуля
// 			Wrappers[i] = $('<' + Modules[i].tag + '></' + Modules[i].tag + '>');
// 			if (Modules[i].mclass) {
// 				Wrappers[i].addClass(Modules[i].mclass)
// 			}
// 			// если есть куда добавлять
// 			if (Modules[i].appendTo) {
// 				var selector = '.' + Modules[i].appendTo;
// 				// если куда добавлять еще не создан 
// 				if (!$(selector).length) {
// 					// создаем его как враппер
// 					Wrappers[selector] = $('<div></div>')
// 						.addClass(Modules[i].appendTo);
// 					$('body').append(Wrappers[selector]);
					
// 					console.log(Wrappers[selector])
// 				} 
// 				Wrappers[selector].append(Wrappers[i]);
// 			// если добавлять некуда добавляем в BODY
// 			} else {
// 				$('body').append(Wrappers[i]);
// 			}
// 		}

// 	}	
// }

// createModules();
