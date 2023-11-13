// This is the user model (firebase)
/*
firstName,
lastName,
phoneNumber,
address,
email,
password,
role
*/

import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
  role: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
});

const UserModel = mongoose.model('User', usersSchema);

export default UserModel;
