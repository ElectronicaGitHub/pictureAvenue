module.exports = React.createClass({
	render: function() {
		var cx = React.addons.classSet;
		var classes = cx({
			'adminEachView' : true,
			'FavoritesView' : true,
			'view-hidden' : this.props.view != 'favorites'
		})
		return (
			<div className={classes}>FavoritesView</div>
		);
	}
});