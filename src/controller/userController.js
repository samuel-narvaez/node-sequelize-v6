//MODELS
const User = require('../../models').User;
const Post = require('../../models').Post;
const db = require('../../models');

//DESCRYP
const CryptoJS = require("crypto-js");
const Descryp = (value) => CryptoJS.AES.decrypt(value, 'secret key 123');

//INIT CONTROLLER
userController = {};

//METHODS
userController.get = async (req, res) => {
    let data = [];
    try {
        let result = await User.findAll();
        result.forEach(element => {
            const { name, email } = element
            data.push({
                id: element.id,
                name: Descryp(name).toString(CryptoJS.enc.Utf8),
                email: Descryp(email).toString(CryptoJS.enc.Utf8)
            })
        });
        return res.status(200).json({
            data,
            message: 'Datos obtenidos correctamente'
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}


userController.save = async (req, res) => {

    let transaction = await db.sequelize.transaction();

    try {
        const { title, content, imageUrl, userId } = req.body
        await User.create(req.body, { transaction });
        await Post.create({
            title,
            content,
            imageUrl,
            UserId: userId
        }, { transaction });

        // commit
        await transaction.commit();
        return res.status(200).json({
            message: 'Guardado Exitosamente'
        });
    } catch (error) {
        transaction.rollback();
        return res.status(500).json({
            error: error.message
        });
    }
}


module.exports = userController;