const cookieParser =require ('cookie-parser')

const ProductService = require('../services/ProductService');


const createProduct = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const { name, image, type, price ,countInStock, rating, description } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}


const updateProduct = async (req, res) => {
    try {
        const ProductId = req.params.id
        const data = req.body
        if(!ProductId){
            return res.status(400).json({
                status: 'ERR',
                message: 'The ProductId is required'
            })
        }

        const response = await ProductService.updateProduct(ProductId, data)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }

}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(400).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }

        const response = await ProductService.getDetailsProduct(productId)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }

}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(400).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }

        const response = await ProductService.deleteProduct(productId)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }

}

const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit ) || 8, Number(page ) || 0, sort , filter)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }

}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct

};
