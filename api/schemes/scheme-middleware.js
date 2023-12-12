const db = require('../../data/db-config');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await db('schemes').where('scheme_id', req.params.scheme_id).first();
    if (scheme) {
      next()
    } else {
      next({ status: 404, message: `scheme with scheme_id ${req.params.scheme_id} not found` })
    }
  } catch (err) {
    next(err)
  }

}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const schemeName = req.body.scheme_name;

  if (!schemeName || typeof schemeName !== 'string' || schemeName.trim() === '') {
    next({ status: 400, message: 'invalid scheme_name' })
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.body.instructions;
  const stepNumber = req.body.step_number;
  if (
    instructions === undefined || typeof instructions !== 'string' || !instructions.trim() ||
    typeof stepNumber !== 'number' || stepNumber < 1
  ) {
    next({ status: 400, message: 'invalid step' })
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
