const {Users} = require("../dbSchema/UserModel");
const { secret } = require('../config');
const CryptoJS = require('crypto-js');


const login = async (args) => {
    let user = await Users.findOne({ username: args.username });
    if (!user) {
        return { status: 401, message: "NO_USER" };
    }
    var dcPasswd = CryptoJS.AES.decrypt(user.password, secret);
    dcPasswd = dcPasswd.toString(CryptoJS.enc.Utf8);
    if (dcPasswd !== args.password) {
        return { status: 401, message: "INCORRECT_PASSWORD" };
    }
    return { status: 200, message: user.username };
}

exports.login = login;