const setRole = (model, role, context) => {
    const log = context.logger.start("services:roles:set");

    if (model.roleType !== "string" && model.roleType !== undefined) {
        role.roleType = model.roleType;
    }

    if (model.name !== "string" && model.name !== undefined) {
        role.name = model.name;
    }

    if (model.description !== "string" && model.description !== undefined) {
        role.description = model.description;
    }

    if (model.status !== "string" && model.status !== undefined) {
        role.status = model.status;
    }

    if (model.permissions !== "string" && model.permissions !== undefined) {
        role.permissions = model.permissions;
    }

    log.end();
    role.save();
    return role;

};

const setPermission = (model, permission, context) => {
    const log = context.logger.start("services:roles:setPermission");

    if (model.name !== "string" && model.name !== undefined) {
        permission.name = model.name;
    }

    if (model.description !== "string" && model.description !== undefined) {
        permission.description = model.description;
    }

    if (model.status !== "string" && model.status !== undefined) {
        role.status = model.status;
    }

    log.end();
    permission.save();
    return permission;

};

const buildRole = async (model, context) => {
    const { name, description, roleType, permissions } = model;
    const log = context.logger.start(`services:roles:buildRole${model}`);
    const role = await new db.role({
        name: name,
        description: description,
        roleType: roleType,
        //permissions: permissions,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return role;
};

const buildPermission = async (model, context) => {
    const { name, description } = model;
    const log = context.logger.start(`services:roles:buildPermission${model}`);
    const permission = await new db.permission({
        name: name,
        description: description,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return permission;
};

const adminlogin = async (model, context) => {
    const log = context.logger.start("services:roles:adminlogin");
    if (model.email === 'admin@gmail.com' && model.password === '123456') {
        let user = {
            _id: 123456789,
            email: 'admin@gmail.com',
            password: '123456',
            role: 'SA'
        }
        log.end();
        return user;
    } else {
        throw new Error("User not found");
    }
};

const create = async (model, context) => {
    const log = context.logger.start("services:roles:create");
    if (!model.name) {
        throw new Error("Name is required..!!");
    }
    if (!model.description) {
        throw new Error("Description is required..!!");
    }
    const isRole = await db.role.findOne({ name: { $eq: model.name } });
    if (isRole) {
        throw new Error("Role is Already Exists");
    } else {
        const role = buildRole(model, context);
        log.end();
        return role;
    }

};

const createPermissions = async (model, context) => {
    const log = context.logger.start("services:roles:create");
    if (!model.name) {
        throw new Error("Name is required..!!");
    }
    if (!model.description) {
        throw new Error("Description is required..!!");
    }
    const role = buildPermission(model, context);
    log.end();
    return role;

};

// getroles
const getRoles = async (query, context) => {
    const log = context.logger.start(`services:roles:getroles`);
    let roles = await db.role.find().populate({
        path: 'permissions.permissionId',
        model: 'permission'
    })
    roles.count = await db.role.find().count();
    log.end();
    return roles;
};

const getAllPermissions = async (query, context) => {
    const log = context.logger.start(`services:roles:getAllPermissions`);
    let permission = await db.permission.find()
    permission.count = await db.permission.find().count();
    log.end();
    return permission;
};

const updateRole = async (id, model, context) => {
    const log = context.logger.start(`service/roles/updateRole`);
    if (!id) {
        log.end();
        throw new Error("Role id is required");
    }
    let entity = await db.role.findById(id);
    if (!entity) {
        log.end();
        throw new Error("role is not found");
    }
    const role = await setRole(model, entity, context);
    log.end();
    return role
};

const updatePermission = async (id, model, context) => {
    const log = context.logger.start(`service/roles/updatePermission`);
    if (!id) {
        log.end();
        throw new Error("Permission id is required");
    }
    let entity = await db.permission.findById(id);
    if (!entity) {
        log.end();
        throw new Error("Permission is not found");
    }
    const permission = await setPermission(model, entity, context);
    log.end();
    return permission
};

const updateRoleStatus = async (id, model, context) => {
    const log = context.logger.start(`service/roles/updateRole`);
    if (!id) {
        log.end();
        throw new Error("Role id is required");
    }
    let entity = await db.role.findById(id);
    if (!entity) {
        log.end();
        throw new Error("role is not found");
    }
    const role = await setRole(model, entity, context);
    log.end();
    return role
};

const updatePermissionStatus = async (id, model, context) => {
    const log = context.logger.start(`service/roles/updatePermissionStatus`);
    if (!id) {
        log.end();
        throw new Error("Permission id is required");
    }
    let entity = await db.permission.findById(id);
    if (!entity) {
        log.end();
        throw new Error("Permission is not found");
    }
    const role = await setRole(model, entity, context);
    log.end();
    return role
};

const deleteRole = async (id, context) => {
    const log = context.logger.start(`services:roles:deleterole`);
    if (!id) {
        throw new Error("roleId is requried");
    }
    let role

    role = await db.role.findOne({ _id: id });

    role = await db.role.deleteOne({ _id: id });

    role = null

    role = await db.role.findOne({ _id: id });

    if (role) {
        throw new Error("something went wrong");
    }

    message = 'role Deleted Successfully'
    log.end();
    return message
};

const deletePermission = async (id, context) => {
    const log = context.logger.start(`services:roles:deletePermission`);
    if (!id) {
        throw new Error("Permission ID is requried");
    }
    let permission

    permission = await db.permission.findOne({ _id: id });

    permission = await db.permission.deleteOne({ _id: id });

    permission = null

    permission = await db.permission.findOne({ _id: id });

    if (permission) {
        throw new Error("something went wrong");
    }

    message = 'Permission Deleted Successfully'
    log.end();
    return message
};

const searchRole = async (model, context) => {
    const log = context.logger.start(`services:users:search`);
    if (!model.search) {
        throw new Error("Search is required");
    }
    const roles = await db.role.find({ name: { "$regex": '.*' + model.search + '.*', "$options": 'i' } }).limit(5);

    return roles
};


exports.create = create;
exports.getAllPermissions = getAllPermissions;
exports.createPermissions = createPermissions;
exports.getRoles = getRoles;
exports.updateRole = updateRole;
exports.updatePermission = updatePermission;
exports.deleteRole = deleteRole;
exports.searchRole = searchRole;
exports.adminlogin = adminlogin;
exports.updateRoleStatus = updateRoleStatus;
exports.updatePermissionStatus = updatePermissionStatus;
exports.deletePermission = deletePermission;