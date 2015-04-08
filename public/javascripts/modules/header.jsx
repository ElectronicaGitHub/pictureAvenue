// React = require('../../libs/react/react-with-addons');
$ = require('jquery');

module.exports = React.createClass({
	displayName : 'header',
	openAdmin : function() {
		$(document).trigger('globalEvent', {
			group : 'admin',
			target : 'adminPanel',
			action : 'open'
		});
	},
	render : function() {
		var hdr;
		if (!pa.user) 
			hdr =  (
				<header>
					<div className="admin-button">
						<span>Авторизоваться</span>
						<div className="admin-button-dropdown">
							<a href="/auth/vkontakte"><div className="admin-button-auth-method"><i className="fa fa-vk"></i>Через Вконтакте</div></a>
							<a href="/auth/vkontakte"><div className="admin-button-auth-method"><i className="fa fa-facebook"></i>Через Фейсбук</div></a>
						</div>
					</div>
				</header>
			)
		else {
			var imgStyle = {
				backgroundImage : 'url(' + pa.user.avatar + ')'
			}
			hdr = (
				<header>
					<div className="admin-button extended">
						<span className="admin-button-openadmin" onClick={ this.openAdmin }>Мой кабинет</span>
						<a href="/auth/exit"><span className="admin-button-exit">Выйти</span></a>
					</div>

					<div className="admin-userinfo">
						<span className="admin-button-avatar" style={ imgStyle }></span>
						<span className="admin-button-username">{ pa.user.name + ' ' + pa.user.surname }</span>
					</div>
				</header>
			)
		}
		return hdr
	}
})
