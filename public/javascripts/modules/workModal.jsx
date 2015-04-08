module.exports = React.createClass({
	getInitialState : function() {
		return {
			showed : false,
			workToShow : {}
		}
	},
	show : function(id) {
		$.get('/api/work/' + id)
			.success(function(data) {
				this.setState({
					workToShow : data.work
				});
			}.bind(this))
			.error(function(data) {
			})
		$('.fader').addClass('show');
		$('.workmodal').addClass('show');
		setTimeout(function() {
			$('.fader').addClass('onScreen');
			$('.workmodal').addClass('onScreen');
			this.setState({
				showed : true
			});
		}.bind(this));

		
	},
	hide : function() {
		console.log('hideModal');
		$('.fader').removeClass('onScreen');
		$('.workmodal').removeClass('onScreen');
		setTimeout(function() {
			$('.fader').removeClass('show');
			$('.workmodal').removeClass('show');
		}, 100);
		this.setState({
			showed : false
		});
	},
	componentDidMount : function() {

		$(document).on('workmodal', function(evt, data) {
			console.log(data);
			if (data.action == 'show') {
				this.show(data.workid);
			}
			if (data.action == 'hide') {
				this.hide();
			}
		}.bind(this));
		
		$(document).on('click', '.fader, .workmodal-closebutton', function() {
			if (this.state.showed) {
				window.history.back();
			}
		}.bind(this));
	},
	render: function() {
		if (this.state.workToShow.tags) {
			var tags = this.state.workToShow.tags.map(function(el) {
				return <span className="workmodal-eachtag">{ el }</span>
			});
		}
		return (
			<div>
				<div className="workmodal">
					<div className="workmodal-closebutton"><i className="fa fa-times"></i></div>
					<div className="workmodal-img-wrapper">
						<span className="workmodal-img-helper"></span>
						<img src={ pa.conf.makeImageUrl(this.state.workToShow.image) }/>
					</div>
					<div className="workmodal-info-wrapper">
						<p className="workmodal-title">{ this.state.workToShow.title }</p>
						<p className="workmodal-misc">
							<span className="workmodal-likes">
								<i className="fa fa-heart-o"></i>
								<span>{ this.state.workToShow.likes }</span>
							</span>
							<span className="workmodal-views">
								<i className="fa fa-eye"></i>
								<span>{ this.state.workToShow.views }</span>
							</span>
						</p>
						<p className="workmodal-description">{ this.state.workToShow.description }</p>
						<p className="workmodal-tags">{ tags }</p>
					</div>
				</div>
				<div className="fader"></div>
			</div>
		);
	}
});