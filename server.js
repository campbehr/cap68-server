const express = require("express");
const fetch = require("node-fetch");
// const { post_user, auth, port } = require("./config");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Signup Route
app.get("/", (req, res) => res.send("Hello CAP68"));

app.post("/signup", (req, res) => {
  const {
    airline,
    base,
    check,
    city,
    email,
    fName,
    lName,
    message,
    password,
    phone,
    position,
    registration,
    retirement,
    state,
    street,
    zip,
  } = req.body;

  if (check || password) {
    res.redirect("/404");
    return;
  }

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          AIRLINE: airline,
          BASE: base,
          CITY: city,
          FNAME: fName,
          LNAME: lName,
          MSG: message,
          PHONE: phone,
          POSITION: position,
          REGISTERED: registration,
          RETIREMENT: retirement,
          STATE: state,
          STREET: street,
          ZIP: zip,
        },
      },
    ],
  };
  res.send(data);

  const postData = JSON.stringify(data);

  fetch(process.env.MAILCHIMP_URL_POST, {
    method: "POST",
    headers: {
      Authorization: process.env.MAILCHIMP_AUTH,
    },
    body: postData,
  })
    .then(res.statusCode === 200)
    .catch((err) => console.log(err));
});

app.listen(
  process.env.PORT,
  console.log(`Server started on ${process.env.PORT}`)
);
