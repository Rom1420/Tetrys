const { Router } = require('express')

const { Student } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Student.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:studentId', (req, res) => {
  try {
    res.status(200).json(Student.getById(req.params.studentId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
    try {
      const user = Student.create(req.body)
      res.status(201).json(user)
    }
    catch (err){
      manageAllErrors(res, err)
    }
})

router.put('/:studentID', (req, res) => {
    try {
      res.status(200).json(Student.update(req.params.studentID, req.body))
    }
    catch (err) {
      manageAllErrors(res, err)
    }
})

router.delete('/:studentId', (req, res) => {
    try {
      Student.delete(req.params.studentId)
      res.status(204).end()
    }    
    catch (err) {
      manageAllErrors(res, err)
    }
})

module.exports = router