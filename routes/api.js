var Work = require('../models/Work');
var multiparty = require('multiparty');
var fs = require('fs');
var AWS = require('aws-sdk');

var bucketName = 'pictureave';

AWS.config.update({
	accessKeyId: "AKIAJ5CA7KDRZEVJDXAA",
    secretAccessKey: "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"
})
AWS.config.region = 'eu-central-1';

var s3 = new AWS.S3({
	signatureVersion: 'v4'
});

function api(express) {

	var router = express.Router();

	router.post('/image/create', function(req, res, next) {

		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {

     		var file = files.file[0];
     		var fileSize = file.size;

     		if (fileSize > 200000) {
     			res.status(395).json({
     				error : 'Изображение больше 200 КБ.'
     			})
     		} else {
	     		var path = file.path;
	     		// var name = file.originalFilename;
	     		var name = makeID();
	     		console.log('name', name);

	     		fs.readFile(path, function(err, file_buffer) {
		            var params = {
		                Bucket: bucketName,
		                Key: name,
		                Body: file_buffer
		            };

		            s3.putObject(params, function (perr, pres) {
		                if (perr) {
		                    console.log("Error uploading data: ", perr);
		                    removeFile(path, function() {
			                    res.status(404).json(perr);
		                    })
		                } else {
		                    console.log("Successfully uploaded data");
		                    removeFile(path, function() {
			                    res.json({
			                    	// url : 'https://s3.' + AWS.config.region + '.amazonaws.com/' + bucketName + '/' + name
			                    	image : name
			                    });
		                    })
		                }
		            });
		        });
     		}

		});

		removeFile = function(file, cb) {
			fs.unlink(file, function(err) {
            	if (err) throw err;
            	console.log('file in path', file, 'successfully deleted');
            	cb();
            });
		}
	});

	router.get('/work/:id', function(req, res, next) {
		var _id = req.params.id;
		Work.findById(_id, function(err, result) {
			if (err) return next(err);
			res.json({
				work : result
			});
		});
	});

	router.post('/work/create', function(req, res, next) {
		req.body.image_url = req.body._id + req.body.image_url;
		req.body.tags = req.body.tags.split(',').map(function(el) {
			return el.trim();
		});
		work = new Work(req.body);
		work.save(function(err, result) {
			if (err) {
				console.log(err);
				return next(err);
			}
			console.log(result);
			res.json({
				success: 'Ваша работа успешно добавлена'
			});
		});
	});

	router.delete('/work/remove/:id', function(req, res, next) { 
		Work.findByIdAndRemove(req.params.id, function(err, results) {
			if (err) return next(err);
			console.log(results);
			var image = results.image;
			params = {
				Bucket : 'pictureave',
				Key : image
			};

			s3.deleteObject(params, function(s3err, s3res) {
				if (s3err) return next(s3err);
				console.log('Изображение отвязано', s3res);

				res.json({
					success: 'Ваша работа успешно удалена'
				});
			});
		});
	});

	router.get('/works', function(req, res, next) {
		Work.find()
			.sort({
				date : -1
			})
			.populate('user')
			.exec(function(err, results) {
			if (err) return next(err);
			res.json(results);
		});
	});

	return router;
}

var makeID = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  	}
  	var d = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4(); 
    return d;
};

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

module.exports = api;