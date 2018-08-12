/**
 * @author Mohit Negi
 */
require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var methodOverride = require("method-override");
var twilio = require("twilio");
const { ObjectID } = require("mongodb");
const path = require('path');


var { mongoose } = require("./DB/mogoose");
var { User } = require("./model/User");
var { Message } = require("./model/Message");

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, ".." , "/views"));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");


console.log();
var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTH_TOKEN;
var client = new twilio(accountSid, authToken);

//ROUTES

/**
 * @routes   GET /
 * @desc     render the homepage.
 * @access   Public
 */
app.get("/", (req, res) => {
  res.render("homepage");
});


/**
 * @routes   GET /contacts
 * @desc     fetches the contact from database and renders contacts page
 * @access   Public
 */
app.get("/contacts", (req, res) => {
  User.find().then(
    users => {
      res.render("contacts", { users });
    },
    e => {
      res.status(400).send(e);
    }
  );
});



/**
 * @routes   GET /contacts/newcontac
 * @desc     render form to the screen for adding new contact
 * @access   Public
 */
app.get("/contacts/newcontact", (req, res) => {
  res.render("addcontactsform");
});



/**
 * @routes   POST /contacts
 * @desc     add contact information to the User Database and redirect to /contacts
 * @access   Public
 */
app.post("/contacts", (req, res) => {
  console.log(req.body);
  let {
    firstName,
    lastName,
    areaCode,
    phoneNo,
    email,
    city,
    country
  } = req.body;
  var user = new User({
    firstName,
    lastName,
    areaCode,
    phoneNo,
    email,
    city,
    country
  });
  user
    .save()
    .then(doc => console.log(doc))
    .then(() => res.redirect("/contacts"))
    .catch(e => {
      res.render('error', {e});
    });
});



/**
 * @routes   GET /contacts/:id
 * @desc     fetches a specific user and renders profile to the screen.
 * @access   Public
 */
app.get("/contacts/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    res.render("profile", { user });
  });
});



/**
 * @routes   GET /contacts/:id/edit
 * @desc     renders a form to Update a specific contact.
 * @access   Public
 */
app.get("/contacts/:id/edit", (req, res) => {
  User.findById(req.params.id).then(user => {
    res.render("editcontactsform", { user });
  });
});



/**
 * @routes   PUT /contacts/:id
 * @desc     renders a form to Update a specific contact.
 * @access   Public
 */
app.put("/contacts/:id", (req, res) => {
  var contacts = req.body;
  User.findByIdAndUpdate(req.params.id, contacts).then((user) => {
    res.redirect(`/contacts/${req.params.id}`);
  }).catch(e => {
    res.render('error', {e})
  })
});



/**
 * @routes   DELETE /contacts/:id
 * @desc     Deletes a specific contact.
 * @access   Public
 */
app.delete("/contacts/:id", (req, res) => {
  var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
  User.findByIdAndRemove(id).then((user) => {
    if(!user)
        return res.status(404).send()
    res.redirect(`/contacts`);
}).catch((err) => {
  res.render('error', {e})
});
});



/**
 * @routes   GET /contacts/:id/sendMessage
 * @desc     renders a form to the screen to send the OTP to a specific user
 * @access   Public
 */
app.get("/contacts/:id/sendMessage", (req, res) => {
  User.findById(req.params.id).then(user => {
    res.render("sendMessage", { user });
  });
});



/**
 * @routes   POST /contacts/:id/sendMessage
 * @desc     sends OTP to the user and adds the log to the HISTORY
 * @access   Public
 */
app.post("/contacts/:id/sendMessage", (req, res) => {
  var message = req.body.Message;
  User.findById(req.params.id).then(user => {
    var to = `+${user.areaCode}${user.phoneNo}`;
    client.messages
      .create({
        body: message,
        to: to,
        from: "+14125737306"
      })
      .then(messages => {
        let { sid, dateCreated, to } = messages;
        let sender = messages.from;
        let message = new Message({
          sid,
          dateCreated,
          to,
          sender
        });
        message.save().then(() => res.redirect("/contacts"));
      })
      .catch(e => {
        res.render('error', {e});
      });
  });
});



/**
 * @routes   GET /historylog
 * @desc     fetches the massage log from the database and render historylog.ejs
 * @access   Public   
 */
app.get("/historylog", (req, res) => {
  Message.find().then(messages => {
    res.render("historylog", { messages });
  });
});


app.listen(port, () => console.log(`started on port ${port}`));
module.exports = { app };
