var Header = require('./header');
var Footer = require('./footer');
var WorkModal = require('./workModal');
var Fullsearch = require('./fullsearch');
var AdminPanel = require('./admin');

module.exports = React.createClass({
	render: function() {
		var adm = pa.user 
			? <AdminPanel></AdminPanel>
			: '';
		return (
			<div className="pa-app">
				{ adm }
				<Header></Header>
				<Fullsearch></Fullsearch>
				<Footer></Footer>
				<WorkModal></WorkModal>
			</div>
		);
	}
});
