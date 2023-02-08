const Group = require('../models/groupModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const getGroup = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' })
  }

  const group = await Group.findById(id)

  if (!group) {
    return res.status(404).json({ error: 'No such group' })
  }

  res.status(200).json(group)
}

const createGroup = async (req, res) => {
  const { name, members } = req.body

  // add to the database
  try {
    const group = await Group.create({ name, members })
    res.status(200).json(group)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const deleteGroup = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' })
  }

  const group = await Group.findOneAndDelete({ _id: id })

  if (!group) {
    return res.status(400).json({ error: 'No such group' })
  }

  res.status(200).json(group)
}

const updateGroup = async (req, res) => {
  const { id } = req.params
  const email = req.body.email

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' })
  }

  let user = await User.findOne({ email: email })

  if (!user) {
    return res.status(400).json({ error: 'No such user' })
  }

  user.groupIds.push(id)
  user.groupIds = [...new Set(user.groupIds)]
  user.save()

  let group = await Group.findOne({ _id: id })

  if (!group) {
    return res.status(400).json({ error: 'No such group' })
  }

  group.groupMembers.push(email)
  group.groupMembers = [...new Set(group.groupMembers)]
  group.save()

  res.status(200).json(group)
}

const updateGroupDeleteMember = async (req, res) => {
  const { id } = req.params
  const email = req.body.email

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' })
  }

  let user = await User.findOne({ email: email })

  if (!user) {
    return res.status(400).json({ error: 'No such user' })
  }

  //delete groupId from specific user
  let index = user.groupIds.indexOf(id)
  user.groupIds.splice(index, 1)
  user.save()

  let group = await Group.findOne({ _id: id })

  if (!group) {
    return res.status(400).json({ error: 'No such group' })
  }

  //delete email of that person from groupMembers
  index = group.groupMembers.indexOf(email)
  group.groupMembers.splice(index, 1)
  group.save()

  res.status(200).json(group)
}

module.exports = {
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
  updateGroupDeleteMember
}


