const Post = require('../../models').Post;


module.exports = {

    async get(req, res){
        try {
            let data = await Post.findAll();
            return res.status(200).json({
                data,
                message: 'Datos obtenidos correctamente'
            })
            
        } catch (error) {
            return res.status(500).json({
                error : error.message
            });
        }
    },

    async getById(req, res){
        const id = req.params.id
        try {
            let data = await Post.findOne({
                where : {
                    id
                }
            });
            return res.status(200).json({
                data,
                message: 'Datos obtenidos correctamente'
            })
            
        } catch (error) {
            return res.status(500).json({
                error : error.message
            });
        }
    },

    async save(req, res) {
        const {title , content, imageUrl, categoryId , userId} = req.body;
        try {
            await Post.create({
                title,
                content,
                imageUrl,
                categoryId,
                userId
            });
            return res.status(200).json({
                message : 'Guardado Exitosamente'
            });
        } catch (error) {
            if (error.code && error.code === 11000) {
                res.status(400).json({
                    status : 'DUPLICATED_VALUES',
                    message : error.keyValue
                })
            }
            return res.status(500).json({
                error : error.message
            });
        }
    },

    async update(req,res){
        const id = req.params.id;
        const {title , content, imageUrl, categoryId , userId} = req.body;
        try {
            await Post.update({
                title,
                content,
                imageUrl,
                categoryId,
                userId
            },{
                where: {
                    id
                }
            });
            return res.status(200).json({
                message : 'Actualizado Correctamente'
            });
        } catch (error) {
            if (error.code && error.code === 11000) {
                res.status(400).json({
                    status : 'DUPLICATED_VALUES',
                    message : error.keyValue
                })
            }
            return res.status(500).json({
                error : error.message
            });
        }
    },

    async delete(req,res){
        const id = req.params.id;
        try {
            await Post.destroy({
                where: {
                    id
                }
            });
            return res.status(200).json({
                message: 'Datos Eliminados correctamente'
            })
        } catch (error) {
            return res.status(500).json({
                error : error.message
            });
        }
    }
}