const cookieParser =require ('cookie-parser')
const JwtService = require('../services/JwtService')
const UserService = require('../services/UserService')

const createUser = async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword } = req.body
        const regemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const regname = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/

        const isCheckEmail = regemail.test(email)
        const isCheckName = regname.test(name)

        if (!name || !email || !phone || !password || !confirmPassword ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }else if (!isCheckName) {
            return res.status(200).json({
                status: 'ERR',
                message: 'A string containing uppercase letters, lowercase letters and numbers.'
            })
        }else  if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
    
}

const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/
        const isCheckName = reg.test(name)
        if (!name || !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if (!isCheckName) {
            return res.status(200).json({
                status: 'ERR',
                message: 'A string containing uppercase letters, lowercase letters, and numbers.'
            })
        }
        const response = await UserService.loginUser(req.body)
        const {refresh_token, ... newResponse} = response
        // console.log('response',response)
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samsite: 'strict',
        })
        return res.status(201).json(newResponse)
    } catch (e) {
        return res.status(500).json({
            message: e  
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(400).json({
                status: 'ERR',
                message: 'The userID is required'
            })
        }

        const response = await UserService.updateUser(userId, data)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }

}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            })
        }

        const response = await UserService.deleteUser(userId)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }

}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }

}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            })
        }

        const response = await UserService.getDetailsUser(userId)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }

}

const refreshToken = async (req, res) => {
    console.log('req.cookies.refresh_token',req.cookies.refresh_token)
    try {
        const token = req.cookies.refresh_token
        if(!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}

const logoutUser = async (res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status:'OK',
            message:'Logout SUCCESS'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
};
