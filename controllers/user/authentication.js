module.exports.register = (req, res) => {
    console.log(`Registering user with the following details:\nUsername: ${req.body.username}\nEmail: ${req.body.email}`);
    res.status(200);
    res.json({
      status: 200,
      message: `User: ${req.body.username} was successfully registered`
    });
};

module.exports.login = (req, res) => {
    console.log(`Logging in user: ${req.body.username}`);
    res.status(200);
    res.json({
      status: 200,
      message: `Successfully logged in user: ${req.body.username}`
    });
};
