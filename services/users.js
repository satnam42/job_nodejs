const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
var nodemailer = require('nodemailer')
const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;

//register user
const buildUser = async (model, context) => {
    const {userName,email,companyName,password ,phoneNumber,roleType,socialLinkId,platform} = model;
    const log = context.logger.start(`services:users:build${model}`);

    const user = await db.user({
        userName : userName,
        email: email,
        companyName: companyName,
        password: password,
        phoneNumber:phoneNumber, 
       roleType: roleType,
       socialLinkId: socialLinkId,
       platform: platform,

      }).save();
    // if (isAdmin) {
    //     const privilege = await new db.privilege({
    //         nav: nav,
    //         permission: permission,
    //         user: user.id,
    //     }).save();
    //     user.privileges = privilege.id
    //     await user.save()
    // }
    log.end();
    return user;
};


const create = async (model, context) => {
    const log = context.logger.start("services:users:create");
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already exists");
    }
   
    // if (model.role == 'admin') {
    //     model.roleType = model.role
    //     const role = await db.role.findOne({ roleType: 'admin' });
    //     model.role = role._id
    // } else if (model.role == 'superAdmin') {
    //     model.superAdmin = true;
    //     model.roleType = model.role
    //     const role = await db.role.findOne({ roleType: 'superAdmin' });
    //     model.role = role._id
    // } else if (model.role == 'accountant') {
    //     model.accountant = true;
    //     model.roleType = model.role
    //     const role = await db.role.findOne({ roleType: 'accountant' });
    //     model.role = role._id
    // }
    // if(model.role=='' && model.role==undefined && model.role=='client'){
    //     model.roleType = "client"
    //     const role = await db.role.findOne({ roleType: 'client' });
    //     model.role = role._id
    // }
    model.password = encrypt.getHash(model.password, context);
    // let user 
    // if (context.user && context.user.id) {
        // user = buildUser(model, context, true);
    // } else {
      const  user = buildUser(model, context);
    // }
    log.end();
    return user;
};

const setUser = async (model, user, context) => {
    const log = context.logger.start("services:users:set");
    if (model.userName !== "string" && model.userName !== undefined && model.userName !== 'active') {
        user.userName = model.userName;
    }

    if (model.companyName !== "string" && model.companyName !== undefined) {
        user.companyName = model.companyName;
    }

    if (model.phoneNumber !== "string" && model.phoneNumber !== undefined) {
        user.phoneNumber = model.phoneNumber;
    }

    if (model.email !== "string" && model.email !== undefined) {
        user.email = model.email;
    }

    if (model.notes !== "string" && model.notes !== undefined) {
        user.notes = model.notes;
    }

    if (model.incomeRange !== "string" && model.incomeRange !== undefined) {
        user.incomeRange = model.incomeRange;
    }

    if (model.deviceToken !== "string" && model.deviceToken !== undefined) {
        user.deviceToken = model.deviceToken;
    }

    if (model.address !== "string" && model.address !== undefined) {
        user.address = model.address;
    }

    if (model.streetNo !== "string" && model.streetNo !== undefined) {
        user.streetNo = model.streetNo;
    }

    if (model.streetName !== "string" && model.streetName !== undefined) {
        user.streetName = model.streetName;
    }

    if (model.state !== "string" && model.state !== undefined) {
        user.state = model.state;
    }

    if (model.gender !== "string" && model.gender !== undefined) {
        user.gender = model.gender;
    }
    if (model.city !== "string" && model.city !== undefined) {
        user.city = model.city;
    }
    if (model.country !== "string" && model.country !== undefined) {
        user.country = model.country;
    }
    if (model.zipCode !== "string" && model.zipCode !== undefined) {
        user.zipCode = model.zipCode;
    }
    if (model.status !== "string" && model.status !== undefined) {
        user.status = model.status;
    }

    if (model.dob !== "string" && model.dob !== undefined) {
        user.dob = model.dob;
    }

    // if (model.roleId !== "string" && model.roleId !== undefined) {
    //     user.role = model.roleId;
    // }

    // if (model.role !== undefined && model.role == 'admin' || 'client' || 'superAdmin' || 'accountant') {
    //     if (model.role == 'admin') {
    //         user.roleType = model.role
    //         const role = await db.role.findOne({ roleType: 'admin' });
    //         user.role = role._id
    //     } else if (model.role == 'superAdmin') {
    //         user.roleType = model.role
    //         const role = await db.role.findOne({ roleType: 'superAdmin' });
    //         user.role = role._id
    //     } else if (model.role == 'accountant') {
    //         user.roleType = model.role
    //         const role = await db.role.findOne({ roleType: 'accountant' });
    //         user.role = role._id
    //     }
    //     else {
    //         user.roleType = model.role
    //         const role = await db.role.findOne({ roleType: 'client' });
    //         user.role = role._id
    //     }
    // }
    log.end();
    await user.save();
    return user;

};

const setRole = (model, user, context) => {
    const log = context.logger.start("services:users:setRole");

    if (model.roleId !== "string" && model.roleId !== undefined) {
        user.role = model.roleId;
    }
    let role_type = db.role.findOne({ _id: model.roleId });
    user.roleType = role_type.roleType;

    log.end();
    user.save();
    return user;

};


// login 

const login = async (model, context) => {
    const log = context.logger.start("services:users:login");

    const query = {};
    query.email = model.email;
    let user = await db.user.findOne(query)
    if (!user) {
        log.end();
        throw new Error("user not found");
    }

    if (user.status === 'inactive') {
        throw new Error("user Is inactive please contect with admin");
    } 
    const isMatched = encrypt.compareHash(model.password, user.password, context);
    if (!isMatched) {
        log.end();
        throw new Error("password mismatch");
    }

    const token = auth.getToken(user.id, false, context);
    user.token = token;
    user.deviceToken = model.deviceToken;
    user.updatedOn = new Date();
    await user.save();
    log.end();
    // user.image = imageUrl + '/' + user.image
    return user;
};

// change password

const changePassword = async (id, model, context) => {
    const log = context.logger.start(`service/users/changePassword`);
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id);
    if (!user) {
        log.end();
        throw new Error("user is not found");
    }
    const isMatched = encrypt.compareHash(
        model.oldPassword,
        user.password,
        context
    );
    if (isMatched) {
        const newPassword = encrypt.getHash(model.newPassword, context);
        user.password = newPassword;
        user.updatedOn = new Date();
        await user.save();
        log.end();
        return "Password Updated Successfully";
    } else {
        log.end();
        throw new Error("Old Password Not Match");
    }
};


// getUsers
const getUsers = async (query, context) => {
    const log = context.logger.start(`services:users:getUsers`);
    let pageNo = Number(query.pageNo) || 1
    let pageSize = Number(query.pageSize) || 10

    let skipCount = pageSize * (pageNo - 1)
    // let allUsers = await db.user.find().skip(skipCount).limit(pageSize);
    const allUsers = await db.user.find({ isDeleted: { $eq: false }, roleType: { $eq: "Client" } }).sort({ _id: 1 }).skip(skipCount).limit(pageSize).populate({
        path: 'role',
        model: 'role'
    })
    // allUsers.count = await db.user.find().count();
    log.end();
    return allUsers;
};


const getAllUsers = async (query, context) => {
    const log = context.logger.start(`services:users:getAllUsers`);
    const getAllUsers = await db.user.find({}).populate({
        path: 'role',
        model: 'role'
    }).populate('privilege')
    for (let url in getAllUsers) {
        getAllUsers[url].image = imageUrl + '/' + getAllUsers[url].image
    }
    log.end();
    return getAllUsers;
}


const getDeletedUsers = async (query, context) => {
    const log = context.logger.start(`services:users:getUsers`);
    let pageNo = Number(query.pageNo) || 1
    let pageSize = Number(query.pageSize) || 10

    let skipCount = pageSize * (pageNo - 1)
    // let allUsers = await db.user.find().skip(skipCount).limit(pageSize);
    const allUsers = await db.user.find({ isDeleted: { $eq: true } }).sort({ _id: 1 }).skip(skipCount).limit(pageSize).populate({
        path: 'role',
        model: 'role'
    })
    // allUsers.count = await db.user.find().count();
    log.end();
    return allUsers;
};

const getAdminUsers = async (query, context) => {
    const log = context.logger.start(`services:users:getAdminUsers`);
    // let pageNo = Number(query.pageNo) || 1
    // let pageSize = Number(query.pageSize) || 10

    // let skipCount = pageSize * (pageNo - 1)
    // let allUsers = await db.user.find().skip(skipCount).limit(pageSize);
    // const allUsers = await db.user.find({ roleType: { $eq: "admin" } || { $eq: "accountant" } || { $eq: "superAdmin" } }).sort({ _id: 1 }).skip(skipCount).limit(pageSize).populate({
    //     path: 'role',
    //     model: 'role'
    // })
    // allUsers.count = await db.user.find().count();
    const allUsers = await db.user.find({ roleType: { $ne: 'client' } }).populate(
        'privileges'
    ).populate('roles')

    log.end();
    return allUsers;
};

const currentUser = async (id, model, context) => {
    const log = context.logger.start(`services:users:currentUser`);
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id);
    if (!user) {
        throw new Error("user not found");
    }
    log.end();
     user.image = imageUrl + '/' + user.image
    return user;
};


const deleteUser = async (id, context) => {
    const log = context.logger.start(`services:users:deleteUser`);

    if (!id) {
        throw new Error("id is requried");
    }
    let user = await db.user.findById(id);
    if (!user) {
        throw new Error("user not found");
    }
    db.user.update({ "_id": ObjectId(id) }, { $set: { "isDeleted": "true", "deletedAt": new Date() } }, function (err, result) {
        if (err) {
            log.end();
            console.log('Error updating object: ' + err);
        } else {
            log.end();
            return 'User Deleted Successfully'
        }
    });
};

const recoverUser = async (id, context) => {
    const log = context.logger.start(`services:users:recoverUser`);

    if (!id) {
        throw new Error("id is requried");
    }
    let user = await db.user.findById(id);
    if (!user) {
        throw new Error("user not found");
    }
    db.user.update({ "_id": ObjectId(id) }, { $set: { "isDeleted": "false", "deletedAt": "" } }, function (err, result) {
        if (err) {
            log.end();
            console.log('Error updating object: ' + err);
        } else {
            log.end();
            return 'User Recovered Successfully'
        }
    });
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:users:update`);
    let entity = await db.user.findById(id);
    if (!entity) {
        throw new Error("invalid user");
    }
    const user = await setUser(model, entity, context);

    log.end();
    return user
};

const setAdmin = async (id, model, user, context) => {
    const log = context.logger.start("services:users:setAdmin");
    if (model.firstName !== "string" && model.firstName !== undefined) {
        user.firstName = model.firstName;
    }
    if (model.lastName !== "string" && model.lastName !== undefined) {
        user.lastName = model.lastName;
    }
    if (model.status !== "string" && model.status !== undefined) {
        user.status = model.status;
    }
    if (model.role == 'admin') {
        user.roleType = model.role
        const role = await db.role.findOne({ roleType: 'admin' });
        user.role = role._id
    } else if (model.role == 'superAdmin') {
        model.superAdmin = true;
        user.roleType = model.role
        const role = await db.role.findOne({ roleType: 'superAdmin' });
        user.role = role._id
    } else if (model.role == 'accountant') {
        model.accountant = true;
        user.roleType = model.role
        const role = await db.role.findOne({ roleType: 'accountant' });
        user.role = role._id
    }
    else {
        user.roleType = model.role
        const role = await db.role.findOne({ roleType: 'client' });
        user.role = role._id
    }
    if (id) {
        const privilege = await db.privilege.findOne({ user: id })
            if (privilege){
                if (model.nav.length > 0) {
                    privilege.nav = model.nav
                }
                if(model.permissions){
                    privilege.permissions = model.permissions;
                    user.privileges = privilege._id;
                }  
            }
            
        // user.privileges=privilege._id
        await privilege.save()
        
        // if (model.nav.length > 0) {
        //     try{
        //         await db.privilege.UpdateOne({ user: id },{
        //             $set: {
        //                 nav: model.nav, permissions: model.permissions
        //             }           
        //         })
        //     }catch(error){
        //         console.log('Error',error)
        //     } 
        // }
    }
    user= await user.populate('privileges').execPopulate();
    user= await user.populate('roles').execPopulate();

    await user.save();
    log.end();
    return user;
};

const updateAdmin = async (id, model, context) => {
    const log = context.logger.start(`services:useperrs:updateAdmin`);
    let entity = await db.user.findById(id).populate('roles').populate('privileges');
    if (!entity) {
        throw new Error("invalid user");
    }
    const users = await setAdmin(id, model, entity, context);
     
    log.end();
    users.image = imageUrl + '/' + users.image;
    return users

};

const search = async (name, context) => {
    const log = context.logger.start(`services:users:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const users = await db.user.find({ firstName: { "$regex": '.*' + name + '.*', "$options": 'i' } }).limit(5);

    return users
};
const sendOtp = async (user, context) => {
    const log = context.logger.start('services/users/sendOtp')
    // four digit otp genration logic
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    let message = `hi ${user.name} Your 4 digit One Time Password: <br>${OTP}<br></br>
      otp valid only 4 minutes`
    let subject = "One Time Password"
    const isEmailSent = await sendMail(user.email, message, subject)
    if (!isEmailSent) {
        throw new Error('something went wrong')
    }
    const otpToken = auth.getOtpToken(OTP, user.id, true, context)
    log.end()
    let data = {
        token: otpToken
    }
    log.end()
    return data

}

const otpVerifyAndChangePassword = async (model, token, context) => {
    const log = context.logger.start('services/users/otpVerified')
    const otpDetail = await auth.extractToken(token, context)

    if (otpDetail.otp !== undefined && otpDetail.otp != model.otp) {
        throw new Error("please enter valid otp");
    }
    if (otpDetail.name === "TokenExpiredError") {
        throw new Error("otp expired");
    }
    if (otpDetail.name === "JsonWebTokenError") {
        throw new Error("otp is invalid");
    }
    let user = context.user;
    user = await db.user.findById(user.id);
    if (!user) {
        throw new Error("user not found");
    }
    log.end();
    return;
}

const newPassword = async (model, context) => {
    const log = context.logger.start('services/users/newPassword')
    let user = context.user;
    user = await db.user.findById(user.id);
    if (!user) {
        throw new Error("user not found");
    }

    const newPassword = encrypt.getHash(model.newPassword, context);
    user.password = newPassword;
    user.updatedOn = new Date();
    await user.save();
    log.end();

    return;
}

// forgetPassword
const forgotPassword = async (model, context) => {
    const log = context.logger.start('services/users/forgotPassword')
    const user = await db.user.findOne({ email: { $eq: model.email } });
    if (!user) {
        throw new Error("The email address " + model.email + " is not associated with any account. Please check your email address and try again.");
    }
    const data = await sendOtp(user, context)
    if (!data) {
        throw new Error('something went wrong')
    }
    log.end();

    return data;
}

const sendMail = async (email, message, subject) => {
    var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `dummydata720@gmail.com`,
            pass: `data1234@`
        }
    });
    // email send to registered email
    var mailOptions = {
        from: 'light_media',
        to: email,
        subject: subject,
        html: message
    };

    let mailSent = await smtpTrans.sendMail(mailOptions)
    if (mailSent) {

        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return true
    } else {
        throw new Error("Unable to send email try after sometime");
    }
}

const uploadImage = async (files, body, context) => {
   const log = context.logger.start(`services:users:uploadImage`);
    if (!files) {
        throw new Error("image not found");
    }
    let user = await db.user.findById(body.id);
    if (!user) {
        throw new Error("user not found");
    }
    if (user.image !== "" && user.image !== undefined) {

        let picUrl = user.image.replace(`${imageUrl}`, '');
        try {
            await fs.unlinkSync(`${picUrl}`)
            console.log('File unlinked!');
        } catch (err) {
            console.log(err)
        }
    }
    const image = files[0].filename
    user.image = image
    await user.save();
    log.end();
    user.image = imageUrl + '/' + user.image;
    // const data={
    //     image: user.image
    // };
    return user;
};

const updateUserStatus = async (id, model, context) => {
    const log = context.logger.start(`service/roles/updateUserStatus`);
    if (!id) {
        log.end();
        throw new Error("User id is required");
    }
    let entity = await db.user.findById(id);
    if (!entity) {
        log.end(); active
        throw new Error("User not found");
    }
    const user = await setUser(model, entity, context);
    log.end();
    return user
};

const assignRole = async (model, context) => {
    const log = context.logger.start(`service/roles/assignRole`);
    let entity = await db.user.findById(model.userId);
    if (!entity) {
        log.end();
        throw new Error("User not found");
    }
    const user = await db.user.findById(model.userId);
    const role = await db.role.findById(model.roleId);
    user.roleType = role.roleType;
    user.role = model.roleId;
    user.save();
    log.end();
    return user
};

const socialLogin = async (model, context) => {
    const log = context.logger.start("services:users:socialLogin");

    if (model.socialLinkId == "string" || model.socialLinkId == undefined) {
        throw new Error("SocialLinkId is requried");
    }
    if (model.email == "string" || model.email == undefined) {
        throw new Error("email is requried");
    }
    let user = await db.user.findOne({ socialLinkId: model.socialLinkId });
    if (!user) {
        // const userEmail = await db.user.findOne({ email: { $eq: model.email } });
        // if(userEmail){
        //     throw new Error("Choose another email");
        // }
        const createdUser = await buildUser(model, context);
        const token = auth.getToken(createdUser.id, false, context);
        createdUser.token = token;
        createdUser.save();
        log.end();
        return createdUser;
    } else {
        const token = auth.getToken(user.id, false, context);
        user.token = token;
        user.deviceToken = model.deviceToken;
        user.platform = model.platform;
        user.updatedOn = new Date();
        user.save();
        log.end();
        return user;
    }
};

exports.login = login;
exports.create = create;
exports.search = search;
exports.currentUser = currentUser;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.getUsers = getUsers;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
exports.update = update;
exports.sendOtp = sendOtp;
exports.otpVerifyAndChangePassword = otpVerifyAndChangePassword;
exports.newPassword = newPassword;
exports.uploadImage = uploadImage;
exports.updateUserStatus = updateUserStatus;
exports.assignRole = assignRole;
exports.socialLogin = socialLogin;
exports.getDeletedUsers = getDeletedUsers;
exports.recoverUser = recoverUser;
exports.getAdminUsers = getAdminUsers;
exports.updateAdmin = updateAdmin;