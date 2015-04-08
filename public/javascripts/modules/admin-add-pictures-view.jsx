module.exports = React.createClass({
	mixins: [LensedStateMixin],
	getInitialState : function() {
		return {
			work : {
				image_url : null,
				image : null,
				title : '',
				description : '',
				width : '',
				height : '',
				tags : '',
				user : pa.user._id
			}
		}
	},
	clearWork : function() {
		this.setState({
			work : {
				image_url : null,
				image : null,
				title : '',
				description : '',
				width : '',
				height : '',
				tags : '',
				user : pa.user._id
			}
		})
	},
	clickImitation : function() {
		$('#admin-image-file-input').click();
	},
	uploadImage : function() {
		self = this;
		console.log('image loader on change');
		window.input = $('#admin-image-file-input');
		var fd = new FormData();
		fd.append("file", input[0].files[0])
		fd.append("name", "philip");
		console.log(fd);
		$.ajax({
			type : 'POST',
			url : 'api/image/create',
			data: fd,
			cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                // console.log("success");
                // console.log(data);
                var newState = React.addons.update(self.state, {
                	work : {
                		image_url : { 
                			$set : pa.conf.makeImageUrl(data.image)
                		},
                		image : {
                			$set : data.image
                		}
                	}
                });
				self.setState(newState);
            },
            statusCode : {
				395 : function(data) {
	            	var err = JSON.parse(data.responseText);
	            	console.log(err);
	            	$(document).trigger('globalEvent', {
						group : 'admin',
						action : 'showUserMessage',
						message : err.error,
						color : 'red'
					});
				}
            },
            error: function(data) {
            }
		})

	},
	createWork : function() {
		$.ajax({
			type : 'POST',
			url: 'api/work/create',
			data : this.state.work,
			success: function(data) {
				console.log(data);
				$(document).trigger('globalEvent', {
					group : 'admin',
					action : 'showUserMessage',
					message : data.success,
					color : 'green'
				});
				$(document).trigger('globalEvent', {
					group : 'admin',
					action : 'updateAllWorks'
				});
				this.clearWork();

			}.bind(this), 
			error : function(data) {
				console.log('error', data);
			}
		});
	},
	render: function() {
		var cx = React.addons.classSet;
		var classes = cx({
			'adminEachView' : true, 
			'addPictureView' : true,
			'view-hidden' : this.props.view != 'addPicture'
		});

		var image = this.state.work.image_url 
			? 	<div>
					<div className="adminPanel-LoadAnotherPhoto" onClick={ this.clickImitation }>Изменить изображение</div>
					<div className="adminPanel-imgWrapper">
						<img src={ this.state.work.image_url }/>
					</div>
				</div>
			: <div className="adminPanel-ImageFileLoadBlock" onClick={ this.clickImitation }></div>
		return (
			<div className={classes}>
				<div className="adminPanel-FormInfo">
					<div className="row">
						<input className="big" 
							valueLink={ this.linkState('work.title') }
							placeholder="Название картины"/>
					</div>
					<div className="row">
						<textarea className="big" 
							valueLink={ this.linkState('work.description') }
							placeholder="Описание картины"></textarea>
					</div>
					<div className="row">
						<input className="dimensions" 
							valueLink={ this.linkState('work.width') }
							placeholder="Ширина в см."/>
						<input className="dimensions" 
							valueLink={ this.linkState('work.height') }
							placeholder="Высота в см."/>
					</div>
					<div className="row">
						<input className="big" 
							valueLink={ this.linkState('work.tags') }
							placeholder="Теги"/>
					</div>
					<div className="row">
						<button className="adminPanel-CreateButton" onClick={ this.createWork }>Добавить картину</button>
					</div>
				</div>
				<div className="adminPanel-PhotoPreview">
					<input type="file" id="admin-image-file-input" onChange={ this.uploadImage }/>
					{ image }
				</div>

				
			</div>
		);
	}
});