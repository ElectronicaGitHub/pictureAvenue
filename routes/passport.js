var passport = require('passport');
var VKontakteStrategy = require('passport-vkontakte').Strategy;
var User = require('../models/User');

module.exports = function(express) {

	passport.use(new VKontakteStrategy({
	    clientID:     "4714305", // VK.com docs call it 'API ID'
	    clientSecret: "hc6mmLduO3Ipnq9Mzy3J",
	    callbackURL:  "http://127.0.0.1:8080/auth/vkontakte/callback"
	}, function(accessToken, refreshToken, profile, done) {
		// console.log(profile);
		User.findOne({
			nickname : profile.username
		}, function(err, user) {
			if (user) {
				done(err, user);
			} else {
				var user = new User({
					vkontakteId: profile.id,
					nickname : profile.username, 
					name : profile.name.givenName, 
					surname : profile.name.familyName,
					gender : profile.gender,
					avatar : profile.photos[0].value
				})
				user.save(function(err, result) {
					if (err) {
						done(err, null);
					}
					done(err, user);
				})
			}
		});
	}));

	passport.serializeUser(function(user, done) {
	    done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	    done(null, obj);
	});

	router = express.Router();

	router.get('/vkontakte',
	    passport.authenticate('vkontakte'),
	    function(req, res){
	    // The request will be redirected to vk.com for authentication, so
	    // this function will not be called.
	});

	router.get('/exit', function(req, res, next) {
		req.logout();
		res.redirect('/');
	})

	router.get('/vkontakte/callback',
	    passport.authenticate('vkontakte', { failureRedirect: '/login' }),
	    function(req, res) {
	    // Successful authentication, redirect home.
	    	res.redirect('/');
	});

	return router;
}