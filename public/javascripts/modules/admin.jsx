// React = require('../../libs/react/react-with-addons');
LensedStateMixin = require('react-lensed-state');
$ = require('jquery');

var UserMessage = require('./admin-user-message');
var FavoritesView = require('./admin-favorites-view');
var AllPicturesView = require('./admin-all-pictures-view');
var AddPictureView = require('./admin-add-pictures-view');

module.exports = React.createClass({
    displayName: 'AdminPanel',
    getInitialState : function() {
    	return {
    		view : 'addPicture'
    	}
    },
    componentDidMount: function () {
    	var element = $(this.getDOMNode());
		$(document).on('admin', function(event, data) {
			if (data.action == 'open') {
				$(element).addClass('active');
				setTimeout(function() {
					$('.main').hide(0);
				}, 500);
				console.log('open admin panel submission');
			}
		})  
    },
    closeAdmin : function() {
    	var element = $(this.getDOMNode());
    	$(element).removeClass('active');
    	$('.main').show(0);
    },
    changeView : function(view) {
    	this.setState({
    		view : view
    	});
    },
    render: function () {
        return (
            <div className="adminPanel">
            	<div className="adminPanel-Header">
					<span>
						<div className="adminPanel-Hello">Привет, Филипп.</div>
					</span>
            	</div>
				<div className="adminPanel-Content">
					<div className="adminPanel-Navigation">
						<div onClick={ this.changeView.bind(null, 'addPicture') }>Добавить картину</div>
						<div onClick={ this.changeView.bind(null, 'allPictures') }>Мои картины</div>
						<div onClick={ this.changeView.bind(null, 'favorites') }>Понравившееся</div>
					</div>
					<div className="adminPanel-View">
						<UserMessage></UserMessage>
						<AddPictureView view={this.state.view}></AddPictureView>
						<AllPicturesView view={this.state.view}></AllPicturesView>
						<FavoritesView view={this.state.view}></FavoritesView>
					</div>
				</div>
				
				<span className="adminPanel-CloseButton fa fa-times" onClick={this.closeAdmin}></span>

            </div>
        );
    }
});

