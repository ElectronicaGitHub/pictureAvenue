var Searchpanel = require('./searchpanel');
var Workspanel = require('./workspanel');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="main">
				<Searchpanel></Searchpanel>
				<Workspanel></Workspanel>
			</div>
		);
	}
});