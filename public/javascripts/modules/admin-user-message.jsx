module.exports = React.createClass({
	getInitialState : function() {
		return {
			show : false,
			text : '',
			color : ''
		}
	},
	componentDidMount: function () {
	    $(document).on('admin', function(evt, data) {
	    	if (data.action == 'showUserMessage') {
	    		console.log('ok shousermessage');
				this.setState({
					show : true,
					text : data.message,
					color : data.color
				});
				setTimeout(function() {
					this.setState({
						show : false
					});
				}.bind(this), 2000);
	    	}
	    }.bind(this));
	},
	render: function() {
		var cx = React.addons.classSet;
		classes = cx({
			'adminPanel-UserMessage' : true, 
			'green' : this.state.color == 'green',
			'red' : this.state.color == 'red'
		})
		var um = this.state.show ? <div key={ this.color } className={ classes }>{ this.state.text }</div>
			: ''
		return (
			<div>
				{ um }	
			</div>
		)
	}
});
