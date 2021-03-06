const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// const passport = require("../../config/passport")

// User model
const User = require("../../models/User");

// Login Page
router.get("/login", (req, res) => res.send("Login"));

// Register Page
router.get("/register", (req, res) => res.send("Register"));

// Register Handle
router.post("/registerUser", (req, res) => {
    console.log("user registration")
    const { name, email, password, password2 } = req.body;
    console.log(req.body)
    let errors = [];

    // Check for required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" })
        console.log(errors);
    }

    // Check to see if passwords match
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match." })
        console.log(errors);
    }

    // Check password length is at least 6 characters long
    if (password.length < 6) {
        errors.push({ msg: "Password needs to be at least 6 characters" })
        console.log(errors);
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation passed
        User.findOne({ email: email })
            .then(user => {
                console.log(user);
                if (user) {
                    // User exists
                    errors.push("Email is already registered");
                    res.render("register", {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    console.log(newUser)

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // Set password to hash
                            newUser.password = hash;

                            // Save user
                            newUser.save()

                                .then(user => {
                                    req.flash("success_msg", "You are now registered and can log in")
                                    res.redirect("/login");
                                })
                                .catch(err)
                        }))
                }
            });
    }
});

// Login handle
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next);
});

// Handle Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
});

module.exports = router;