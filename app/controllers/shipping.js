'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Shipping = mongoose.model('Shipping'),
    _ = require('lodash');


/**
 * Find shipping by id
 */
exports.shipping = function(req, res, next, id) {
    Shipping.load(id, function(err, shipping) {
        if (err) return next(err);
        if (!shipping) return next(new Error('Failed to load shipping ' + id));
        req.shipping = shipping;
        next();
    });
};

/**
 * Create a shipping
 */
exports.create = function(req, res) {
    var shipping = new Shipping(req.body);
    shipping.user = req.user;

    shipping.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                shipping: shipping
            });
        } else {
            res.jsonp(shipping);
        }
    });
};

/**
 * Update a shipping
 */
exports.update = function(req, res) {
    var shipping = req.shipping;

    shipping = _.extend(shipping, req.body);

    shipping.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                shipping: shipping
            });
        } else {
            res.jsonp(shipping);
        }
    });
};

/**
 * Delete a shipping
 */
exports.destroy = function(req, res) {
    var shipping = req.shipping;

    shipping.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                shipping: shipping
            });
        } else {
            res.jsonp(shipping);
        }
    });
};

/**
 * Show a shipping
 */
exports.show = function(req, res) {
    res.jsonp(req.shipping);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Shipping.find().sort('-created').populate('user', 'name username').exec(function(err, shipping) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(shipping);
        }
    });
};
