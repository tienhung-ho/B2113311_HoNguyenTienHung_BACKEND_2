const ApiError = require("../api-error")
const ContactService = require("../services/contact.service")
const MongoDB = require("../untils/mongodb.untils")

module.exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can't be empty"))
    }
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.create(req.body)
        console.log(document);
        return res.send(document)
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        )
    }
}

module.exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const contactService = new ContactService(MongoDB.client)
        const { name } = req.query
        
        if (name) {
            documents = await contactService.findByName(name)
        }
        else {
            documents = await contactService.find()
        }

    }

    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        )
    }

    res.send(documents)
}

module.exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client) 
        const documents = await contactService.findByID(req.params.id)

        if (!documents) {
            return next (
                new ApiError(400, "Contact not found")
            )
        }
        console.log(documents)
        
        return res.send(documents)
    }

    catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating the contact")
        )
    }
}

module.exports.update = (req, res) => {
    res.send({ message: 'update handler'})
}

module.exports.delete = (req, res) => {
    res.send({ message: 'delete handler'})
}

module.exports.deleteAll = (req, res) => {
    res.send({ message: 'deleteAll handler'})
}

module.exports.findAllFavorite = (req, res) => {
    res.send({ message: 'findAllFavorite handler'})
}
