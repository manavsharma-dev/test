

function err(req, res) {
  return res.send({
    code: 400,
    message: req.body.message
  });
}



function success(req, res) {
    return res.send({
      code: 200,
      message: req.body.message
    });
}



function loginDone(req, res) {
  res.send({
    code: 200,
    message: "Employee Logged In successfully",
    data: req.body.data,
    token: req.body.token
  });
}


function updated(req, res){
    return res.send({
        code : 200,
        message: "Updated Succesfully ",
        data:(req.body.data)
    })
}



function doneSingUp(req, res) {
  res.send({
    code: 200,
    message: "Employee Added Successfully",
    data: {
      employee: req.body
    }
  });
}

function deleted(req, res) {
  res.send({
    code: 200,
    message: "Employee Deleted successfully",
    data: req.body
  });
}

module.exports.err = err;
module.exports.success = success;
module.exports.updated = updated;
module.exports.doneSingUp = doneSingUp;
module.exports.deleted = deleted;
module.exports.loginDone = loginDone;
