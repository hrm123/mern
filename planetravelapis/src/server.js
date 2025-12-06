const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const launchesRouter = require('./routes/launches');
const planetsRouter = require('./routes/planets');
const customersRouter = require('./routes/customers');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const graphqlDetails = require('./routes/graphql');
const { default: helmet } = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20')
const app = express();
const path = require('path');
const cookieSession = require('cookie-session')
require('dotenv').config();
const productsModel = require('./products/products.model');
const ordersModel = require('./orders/orders.model');
const customersModel = require('./customers/customers.model');
const reviewsModel = require('./reviews/reviews.model');


const AUTH_OPTIONS =
{
	callbackURL: '/auth/google/callback',
	clientID: process.env.CLIENT_ID, // config.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET
}

function verifyCallback(acccessToken, refreshToken, profile, done) {
	// console.log(`Google profile:${profile}`);
	done(null, profile); //passport now knows this user is now signed in - accessToken will get the user password for the password based authentication.. where you need to verify the password (?)
}

// passport-google-oauth20 Strategy
const google_auth_strategy = new Strategy(
	AUTH_OPTIONS,
	verifyCallback
)

passport.serializeUser((user, done) => { // called when user session state is being saved to cookie to be sent back to the browser.. gets the 'google' profile object
	// console.log(`serializeUser called with ${user}`);
	done(null, user.id); // first argument is errors, if any. second argument is the result
})

passport.deserializeUser((id, done) => { // when cookie with session state is sent from web browser
	// console.log(`deserializeUser called with ${id}`);
	// User.findById(id).then(user => {
	// done(null,user); // first argument is errors, if any. second argument is the value as exists in the cookie. The same will be set to req.session
	// })

	done(null, id);

});

if (process.env.NODE_ENV === 'production') {
	app.use(helmet({
		// Standard, more secure CSP for production
		contentSecurityPolicy: {
			directives: {
				// Only allow scripts from your own domain
				'script-src': ["'self'"],
				'style-src': ["'self'"],
				// 'connect-src' is needed for API calls
				'connect-src': ["'self'", 'https://your-api-domain.tld'],
			},
		},
	}));
} else {
	// Use a customized, less-strict CSP for development
	app.use(helmet({
		contentSecurityPolicy: {
			directives: {
				// Allows the GraphQL Playground to load inline scripts and styles
				'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net", "https://embeddable-sandbox.cdn.apollographql.com"],
				'style-src': ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
				'img-src': ["'self'", "data:", "https://cdn.jsdelivr.net", "https://apollo-server-landing-page.cdn.apollographql.com"],
				'connect-src': ["'self'", 'https://your-api-domain.tld', "https://sandbox.embed.apollographql.com"],
				'frame-src': ["'self'", "https://sandbox.embed.apollographql.com"],
			},
		},
	}));
}


// make Apollo server respond to /graphql endpoint
const server = new ApolloServer({
	schema: graphqlDetails.schema
});

server.start().then(() => {
	app.use('/graphql', cors(), express.json(), expressMiddleware(server, {
		context: async ({ req }) => {
			return {
				rootValue: {
					products: productsModel.getAllProducts(true),
					orders: ordersModel.getAllOrders(true),
					customers: customersModel.getAllCustomers(true),
					reviews: reviewsModel.getAllReviews(true),
				}
			};
		},
	}));
});

app.use(cookieSession({
	name: 'planetravel_session',
	maxAge: 24 * 60 * 60 * 1000, // 1 day session expiry
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

// Mount routes under /apis base URL
app.use('/apis', launchesRouter);
app.use('/apis', planetsRouter);
app.use('/apis', customersRouter);



// add middleware to check for authenticated users - if we add at root leevl then all endpoints are authenticated
app.use((req, res, next) => {
	const isLoggedIn = true; // TODO
	if (!isLoggedIn) {
		return res.status(401).json({
			error: "not logged in"
		});
	}
	next();
})

//to authenticate only certain endpoints, we add middleware to only those endpoints

function checkLoggedIn(req, res, next) {
	// console.log('current user is:', req.user); // we are just storing google user profile ID here ti minimize cookie size
	const isLoggedIn = req.user;
	if (!isLoggedIn) {
		return res.status(401).json({
			error: "not logged in"
		});
	}
	next();
}


//call back url for google auth social sign on - 'google' parameter => we are using google strategy
app.get('/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failure',
		successRedirect: '/', //  home page
		session: true,
	}),
	(req, res) => {
		//also could res.redirect instead of giving the failureRedirect and sucessRedirect property
		// console.log('Google called us back')
	});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

//logout end point for all providers
app.get('/auth/logout', (req, res) => {
	req.logout(); // function exposed by passport. This will clear session cookies etc. and remove req.user property.
	return res.redirect('/');
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', "public", 'index.html'));
});

app.get('/failure', (req, res) => {
	res.send('failed to sign on')
});


app.get('/auth/google',
	passport.authenticate('google', {
		scope: ['email']
	}));

// secret end point is only for authenticated users 
app.get('/secret', checkLoggedIn, (req, res) => {
	return res.send('your secret value is 42');
});



app.get('/*', (req, res, next) => {
	if (req.path.startsWith('/graphql')) {
		return next();
	}
	res.sendFile(path.join(__dirname, '..', "public", 'index.html'));
});

const PORT = process.env.PORT || 8000;

// Export app for testing. Only listen when run directly.
if (require.main === module) {
	app.listen(PORT, () => {
		// console.log(`Server is running on port ${PORT}`);
	});
}

module.exports = app;