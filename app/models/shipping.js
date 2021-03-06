'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Shipping Schema
 */
var ShippingSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    address1: {
        type: String,
        default: '',
        trim: true
    },
    address2: {
        type: String,
        default: '',
        trim: true
    },
    city: {
        type: String,
        default: '',
        trim: true
    },
    state: {
        type: String,
        default: '',
        trim: true
    },
    zip: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ShippingSchema.path('address1').validate(function(address1) {
    return address1.length;
}, 'Address cannot be blank');

/**
 * Statics
 */
ShippingSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Shipping', ShippingSchema);
