// This is the export file for the database service.

import {
  createTradesperson,
  findTradespersonById,
  updateTradespersonById,
} from './profiles/tradesmen/tradesmanDatabaseService';
import {
    createHomeowner,
    findHomeownerById,
    updateHomeownerById,
} from './profiles/homeowner/homeownerDatabaseService';
import {
    createHomeownerUser,
    createTradespersonUser,
    deleteUserById,
    getUserById,
    updateUserById,
    getUserByEmail,
    checkEmail,
    checkPhoneNumber,
    checkFirstLastName,
    checkUserCanBeRegistered,
} from './profiles/user/userDatabaseService';


export {
    createTradesperson,
    findTradespersonById,
    updateTradespersonById,
    createHomeowner,
    findHomeownerById,
    updateHomeownerById,
    createHomeownerUser,
    createTradespersonUser,
    deleteUserById,
    getUserById,
    updateUserById,
    getUserByEmail,
    checkEmail,
    checkPhoneNumber,
    checkFirstLastName,
    checkUserCanBeRegistered,
}