module.exports = React.createClass({
	getInitialState : function() {
		return {
			works : null,
			elementsInRow : null,
			lastElementsInRow : null
		}
	},
	componentWillReceiveProps: function (nextProps) {
	    if (nextProps.view == 'allPictures') {
	    	console.log(nextProps);
		    this.imgSizer(true); 
	    }  
	},
	componentDidMount: function () {
		$(window).resize(function() {	
			this.elementsInRowCalc();
		}.bind(this));
		
		this.elementsInRowCalc();

	    $(document).on('admin', function(evt, data) {
			if (data.action == 'updateAllWorks') {
				console.log('reload Admin All works signal');
				this.loadWorks();
			}
		}.bind(this));
		this.loadWorks();
	},
	imgSizer : function(force) {
		console.log('img Sizer');
		if (this.state.lastElementsInRow != this.state.elementsInRow || force) {
			// console.log('sizer doesnt match');
			var si = setInterval(function() {
				var works = $('.AllPicturesView .work-image-wrapper');
				if (works.length) {
					works.each(function(n, el) {
						lh = $(el).find('img').height();
						$(el).height(lh);
						$(el).find('img').load(function() {
							// console.log('loaded');
							$(el).height(this.clientHeight);
						});
					});
					clearInterval(si);
				}
			}, 100);
			this.setState({
				lastElementsInRow : this.state.elementsInRow
			});		
		}
	},
	elementsInRowCalc : function() {
		var w;

		if ($('.AllPicturesView').height() > $(window).height()) {
			w = $('.AllPicturesView').innerWidth();
	    } else {
			w = $('.AllPicturesView').innerWidth() - 20;
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
		$('.AllPicturesView').css({
			'padding-left': margins,
			'padding-right': margins
		});
		this.imgSizer();
	},
	loadWorks : function() {
		$.ajax({
	      	method : 'GET', 
	      	url : 'api/works',
	      	success : function(data) {
	      		console.log('ADMIN/WORKS/GET/', data);
	      		if (this.isMounted()) {
		      		this.setState({
		      			works : data
		      		});
		      		this.forceUpdate();
	      		}
	      		this.imgSizer();
	      	}.bind(this),
	      	error : function(data) {
	      		console.log(data);
	      	}
	    });
	},
	removeWork : function(id) {
		$.ajax({
			method : 'DELETE',
			url: 'api/work/remove/' + id,
			success : function(data) {
				console.log(data);
				var new_works = this.state.works.filter(function(el) {
					if (el._id != id) {
						return el;
					}
				});
				this.setState({
					works : new_works
				});
				$(document).trigger('globalEvent', {
					group : 'admin',
					action : 'showUserMessage',
					message : data.success,
					color : 'green'
				});
				this.imgSizer(true);
			}.bind(this),
			error: function(data) {
				console.log(data);
			}
		});
	},
	render: function() {
		self = this;
		var cx = React.addons.classSet;
		var classes = cx({
			'adminEachView' : true,
			'AllPicturesView' : true,
			'view-hidden' : this.props.view != 'allPictures'
		});

		

		var colNumber = this.state.elementsInRow;
		var columns = [];
		for (var i = 0; i < colNumber; i++) {
			columns[i] = [];
		}

		if (this.state.works) {
			this.state.works.map(function(el, n) {
				elementCol = (n % colNumber);
				
				elem = ( 
						<div className="work" key={ el._id }>
							<div className="work-removeMark" onClick={ self.removeWork.bind(null, el._id) }>
								<i className="fa fa-times"></i>
							</div>
							<div className="work-editMark">
								<i className="fa fa-pencil"></i>
							</div>
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
								<div className="work-user">Антонов Филипп</div>
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

		return (
			<div className={ classes }>
				{ columns }
			</div>
		)
	}
});