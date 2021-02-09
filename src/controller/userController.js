const User = require('../../models').User;
const Post = require('../../models').Post;
const db = require('../../models');
const CryptoJS = require("crypto-js");


module.exports = {

    async get(req, res){
        // Decrypt
        /* var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText); */

        let descryp = [];
        try {
            let result = await User.findAll();
            result.forEach(element => {
                let name = CryptoJS.AES.decrypt(element.name, 'secret key 123');
                let email = CryptoJS.AES.decrypt(element.email, 'secret key 123');
                descryp.push({
                    id: element.id,
                    name: name.toString(CryptoJS.enc.Utf8),
                    email: email.toString(CryptoJS.enc.Utf8)
                })
            });
            return res.status(200).json({
                descryp,
                message: 'Datos obtenidos correctamente'
            })
            
        } catch (error) {
            return res.status(500).json({
                error : error.message
            });
        }
    },

    async save(req, res, next) {   
        
        let transaction = await db.sequelize.transaction();

        try {
        
            const { title, content, imageUrl, userId } = req.body
            await User.create(req.body, {transaction});
            await Post.create({
                title,
                content,
                imageUrl,
                UserId : userId
            }, {transaction});
            
            // commit
            await transaction.commit();
            return res.status(200).json({
                message : 'Guardado Exitosamente'
            });
        } catch (error) {
            transaction.rollback();
            return res.status(500).json({
                error : error.message
            });
        }
    },
}