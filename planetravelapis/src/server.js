const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const launchesRouter = require('./routes/launches');
const planetsRouter = require('./routes/planets');
const customersRouter = require('./routes/customers');
const { default: helmet } = require('helmet');
const passport = require('passport');
const {Strategy} = require('passport-google-oauth20')
const app = express();
const path = require('path');
const cookieSession = require('cookie-session')
require('dotenv').config();



const AUTH_OPTIONS = 
{
    callbackURL: '/auth/google/callback',
    clientID: process.env.CLIENT_ID, // config.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}


// passport-google-oauth20 Strategy
const google_auth_strategy = new Strategy(
    AUTH_OPTIONS,
    verifyCallback
)

passport.serializeUser((user,done) => { // called when user session state is being saved to cookie to be sent back to the browser
	console.log(`serializeUser called with ${user}`);
	done(null,user); // first argument is errors, if any. second argument is the result
})

passport.deserializeUser((obj,done)=>{ // when cookie with session state is sent from web browser
	console.log(`deserializeUser called with ${obj}`);
	done(null,obj); // first argument is errors, if any. second argument is the value as exists in the cookie. The same will be set to req.session
});

app.use(helmet()); // helmet protects endpoints against common code security issues

app.use(cookieSession({
	name: 'planetravel_session',
	maxAge: 24*60*60*1000, // 1 day session expiry
	// signing the cookie to keep it secret from anyone other than web server. changing this will invalidate existing sessions
	// 'new sessions' get the second parameter of key array
	keys: [process.env.COOKIE_KEY_ROTATE, process.env.COOKIE_KEY_NEW], 
}))
// use passport middleware to authenticate using oAuth & to use session
app.use(passport.initialize()) 
app.use(passport.session()) // check session is correct (use secret key). call deserializeUser handler
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
 


passport.use('google', google_auth_strategy);





function verifyCallback(acccessToken, refreshToken, profile, done) {
	console.log(`Google profile:${profile.name}`);
	done(null, profile); //passport now knows this user is now signed in - accessToken will get the user password for the password based authentication.. where you need to verify the password (?)
}

// Mount routes under /apis base URL
app.use('/apis', launchesRouter);
app.use('/apis', planetsRouter);
app.use('/apis', customersRouter);



// add middleware to check for authenticated users - if we add at root leevl then all endpoints are authenticated
app.use((req,res,next) => {
	const isLoggedIn = true; // TODO
	if(!isLoggedIn) {
		return res.status(401).json({
			error: "not logged in"
		});
	}
	next();
})

//to authenticate only certain endpoints, we add middleware to only those endpoints

function checkLoggedIn(req,res,next)  {
	const isLoggedIn = true; // TODO
	if(!isLoggedIn) {
		return res.status(401).json({
			error: "not logged in"
		});
	}
	next();
}


//call back url for google auth social sign on - 'google' parameter => we are using google strategy
app.get('/auth/google/callback',
 passport.authenticate ('google', {
	failureRedirect: '/failure',
	successRedirect: '/', //  home page
	session: true,
}),
 (req,res) =>{
	//also could res.redirect instead of giving the failureRedirect and sucessRedirect property
	console.log('Google called us back')
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); 

//logout end point for all providers
app.get('/auth/logout', (req,res) => {
    
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"public", 'index.html'));
});

app.get('/failure', (req, res) => {
	res.send('failed to sign on')
});


app.get('/auth/google',
passport.authenticate('google', {
	scope: ['email']
}));

// secret end point is only for authenticated users 
app.get('/secret',checkLoggedIn, (req,res) => {
	return res.send('your secret value is 42');
});



const PORT = process.env.PORT || 8000;

// Export app for testing. Only listen when run directly.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;