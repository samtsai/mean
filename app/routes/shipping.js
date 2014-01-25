'use strict';

// Shipping routes use shipping controller
var shipping = require('../controllers/shipping');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.shipping.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/shipping', shipping.all);
    app.post('/shipping', authorization.requiresLogin, shipping.create);
    app.get('/shipping/:shippingId', shipping.show);
    app.put('/shipping/:shippingId', authorization.requiresLogin, hasAuthorization, shipping.update);
    app.del('/shipping/:shippingId', authorization.requiresLogin, hasAuthorization, shipping.destroy);

    // Finish with setting up the articleId param
    app.param('shippingId', shipping.shipping);

};
