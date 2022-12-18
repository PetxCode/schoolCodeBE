// import { google } from "googleapis";
// import googleOAuth from "passport-google-oauth20";
// import passport from "passport";
// import schoolModel from "../model/schoolModel";

// const GoogleStrategy = googleOAuth.Strategy;

// const GOOGLE_SECRET = "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";
// const GOOGLE_ID =
//   "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
// const GOOGLE_REFRESHTOKEN =
//   "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";
// const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

// const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

// oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

// const url: string = "http:localhost:2244";
// const accessToken = await oAuth.getAccessToken();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_ID,
//       clientSecret: GOOGLE_SECRET,
//       callbackURL: "http://www.example.com/auth/google/callback",
//     },
//     function ({ accessToken, refreshToken: GOOGLE_REFRESHTOKEN, profile, cb }) {
//       schoolModel.create({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
