const Promise = require('promise');
const xlsx = require('xlsx')
const fs = require('fs');;
const path = require('path')
const basedir = process.cwd();
const exlFilePath = path.join(__dirname, '../uploads/exlFile')


const build = async (model, context) => {
    const log = context.logger.start("service:contacts:build");
    const contacts = await new db.contact({
        name: model.name,
        email: model.email,
        department: model.department,
    }).save();
    log.end();
    return contacts;
}

const exlFileUpload = async (req, res, filePath, context) => {
    const log = context.logger.start("services:contacts:exlfile")
    const fileUploads = await uploadFolder(req, res, filePath);
    //target path
    const target = exlFilePath + "/" + fileUploads.name;
    console.log(target)
    const exlFile = xlsx.readFile(target);
    const sheets = exlFile.SheetNames;

    let data = [];
    for (let i = 0; i < sheets.length; i++) {
        const temp = xlsx.utils.sheet_to_json(
            exlFile.Sheets[exlFile.SheetNames[i]]);

        temp.forEach(items => {
            data.push(items);
        })
    }
    /////checking duplicate emails
    for (let i = 0; i < data.length; i++) {
        const dbData = await db.contact.findOne({ email: data[i].email });
        if (!dbData) {
            const inseredData = await db.contact.create(data[i]);
            console.log(inseredData)
        }
    }
    log.end();
    //deleting exl file 
    unlinkFile(target)
    return data;
}

const create = async (req, res) => {
    const log = req.context.logger.start("service:contacts:Create");
    const exlupload = await exlFileUpload(req, res, 'exlFile', req.context);
    log.end()
    return exlupload;
}

const customCreate = async(model, context) => {
    const log = context.logger.start("services:contacts:customCreate");
   
    const isExist = await db.contact.findOne({ email: model.email });
    if (isExist) {
        throw new Error(`Contact already Exist`)
    }
    const custom = await build(model, context);
    log.end()
    return custom;

}
const getContacts = async (model, context) => {
    const log = context.logger.start("service:contacts:gets");
    const getContacts = await db.contact.find({}).sort({ createdOn: -1 });
    log.end();
    return getContacts
}

const setContact = (model, contact, context) => {
    const log = context.logger.start("service:contacts:setUPdate");

    if (model.name !== undefined && model.name !== 'string') {
        contact.name = model.name;
    }
    if (model.email !== undefined && model.email !== 'string') {
        contact.email = model.email;
    }
    if (model.department !== undefined && model.department !== 'string') {
        contact.department = model.department;
    }
    const currentTime = new Date();
    contact.updatedOn = currentTime;
    contact.save();
    log.end()
    return contact;

}
const update = async (id, model, context) => {
    const log = context.logger.start("service:contacts:update");
    const options = {
        _id: id
    }
    const contacts = await db.contact.findById(options);
    if (!contacts) {
        throw new Error("Contact not found");
    }
    const updateContact = setContact(model, contacts, context)
    log.end();
    return updateContact;
}

const remove = async (id, context) => {
    const log = context.logger.start("services:contacts:remove");
    const options = {
        _id: id
    }
    const deleted = await db.contact.findByIdAndDelete(options);
    if (!deleted) {
        throw new Error("contact not found");
    }
    log.end();
    return deleted;
}
////// upload folder 
const uploadFolder = async (req, res, uploadfolder) => {
    let uploadPath = basedir + '/uploads';
    console.log('req ===>>>>', req);
    return new Promise(
        function (resolve, reject) {
            console.log('reached')
            let filePath = req.files[0].path;
            console.log(filePath)
            let uploadFolderPath = uploadPath + '/' + uploadfolder;
            if (!fs.existsSync(uploadFolderPath)) {
                fs.mkdirSync(uploadFolderPath);
            }
            if (req.files[0].mimetype !== undefined) {

                const fileName = req.files[0].filename;
                console.log("filename ", fileName)
                const target = uploadFolderPath + '/' + fileName;

                const srcFile = fs.createReadStream(filePath);
                const createfile = fs.createWriteStream(target);
                unlinkFile(filePath);
                srcFile.pipe(createfile);

                srcFile.on('end', () => {
                    resolve({
                        status: 200,
                        response: "file uploaded successfuly",
                        name: fileName,
                    })
                })
                srcFile.on('error', (err) => {
                    reject({
                        status: 400,
                        response: "something went wrong",
                        reason: "file not uploaded"
                    })
                })
            } else {
                reject({
                    status: 500,
                    response: "Server internal error",
                })
            }
        }
    )
}


// unlink files
async function unlinkFile(url) {
    return new Promise(function (resolve, reject) {
        fs.unlink(url, (err) => {
            if (err) {
                reject({
                    status: 400,
                    response: "file not deleted",
                })
            } else {
                resolve({
                    status: 200,
                    response: "file deleted",
                })
            }
        })
    })
}
exports.create = create;
exports.getContacts = getContacts;
exports.update = update;
exports.remove = remove;
exports.customCreate = customCreate;