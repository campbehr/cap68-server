const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  post_user: process.env.MAILCHIMP_URL_POST,
  auth: process.env.MAILCHIMP_AUTH,
  port: process.env.PORT,
};
