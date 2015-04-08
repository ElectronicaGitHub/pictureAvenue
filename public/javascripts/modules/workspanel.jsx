// React = require('../../libs/react/react-with-addons');
$ = require('jquery');

module.exports = React.createClass({
	displayName : 'workspanel',
	getInitialState : function() {
		return {
			works : null,
			elementsInRow : null,
			lastElementsInRow : null
		}
	},
	elementsInRowCalc : function() {
		var w;

		if ($("body").height() > $(window).height()) {
			w = $(window).innerWidth();
	    } else {
			w = $(window).innerWidth() - 20;
	    }

		var elW = pa.conf.columnWidth;
		var n = ~~(w/elW);
		var actualW = n * elW;
		var diffW = w - actualW;
		var margins = diffW/2;
		
		if (this.state.elementsInRow != n) {
			this.setState({
				elementsInRow : n
			});
		}
		$('.workspanel').css({
			'padding-left': margins,
			'padding-right': margins
		});
		this.imgSizer();
	},
	componentDidMount: function () {
		$(window).resize(function() {
			this.elementsInRowCalc();
		}.bind(this));
		
		this.elementsInRowCalc();

	    $.ajax({
	      	method : 'GET', 
	      	url : 'api/works',
	      	success : function(data) {
	      		console.log(data);
	      		if (this.isMounted()) {
		      		this.setState({
		      			works : data
		      		});
	      		}
	      		this.imgSizer();
	      	}.bind(this),
	      	error : function(data) {
	      		console.log(data);
	      	}
	    });
	},
	imgSizer : function() {
		if (this.state.lastElementsInRow != this.state.elementsInRow) {
			console.log('sizer doesnt match');
			var si = setInterval(function() {
				var oneIsNone = false;
				var works = $('.workspanel .work-image-wrapper');
					works.each(function(n, el) {
						lh = $(el).find('img').height();
						if (lh == 0) {
							oneIsNone = true;
						}
						$(el).height(lh);
						$(el).find('img').load(function() {
							lhp = this.clientHeight;
							if (lhp == 0) {
								oneIsNone = true;
							}
							$(el).height(lhp);
						});
					});
				if (works.length && !oneIsNone) {
					console.log('interval cleared');
					clearInterval(si);
				}
			}, 100);
			this.setState({
				lastElementsInRow : this.state.elementsInRow
			});		
		}
	},
	selectWork : function(work) {
		console.log(work);
		location.hash = 'w=' + btoa(work._id);
	},
	render : function() {

		var colNumber = this.state.elementsInRow;
		var columns = [];
		for (var i = 0; i < colNumber; i++) {
			columns[i] = [];
		}

		self = this;

		if (this.state.works) {
			this.state.works.map(function(el, n) {
				elementCol = (n % colNumber);
				var lu = el.user.name + ' ' + el.user.surname;
				
				elem = ( 
						<div className="work" key={ el._id } onClick={ self.selectWork.bind(null, el) }>
							<div className="work-image-wrapper">
								<span className="work-views-likes-panel">
									<i className="fa fa-heart-o"></i>
									<span className="likes">{ el.likes }</span>
									<i className="fa fa-eye"></i>
									<span className="views">{ el.views }</span>
								</span>
								<img src={ pa.conf.makeImageUrl(el.image) }/>
							</div>
							<div className="work-infoPanel">
								<div className="work-title">{ el.title }</div>
								<div className="work-user">{ lu }</div>
							</div>
						</div>
				)
				columns[elementCol].push(elem);
			});
			columns = columns.map(function(el, n) {
				return ( 
					<div className="works-column">
						{ el }
					</div>
				)
			})
		}
		console.log(columns);

		return (
			<div className="workspanel">
				{ columns }
			</div>
		)
	}
})