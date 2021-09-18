const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.create);

routes.get('/ong', OngController.index);

routes.post('/ong', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name:     Joi.string().required().min(3),
        email:    Joi.string().required().email(),
        whatsapp: Joi.number().required().min(1000000000).max(9999999999),
        city:     Joi.string().required(),
        uf:       Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/incident', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);

routes.post('/incident', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(3),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), IncidentController.create);

routes.delete('/incident/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

module.exports = routes;