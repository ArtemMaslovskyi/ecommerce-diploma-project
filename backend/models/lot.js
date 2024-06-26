const {Schema, model} = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../error_handler");

const lotSchema = new Schema( {
  title: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  }, 
    owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  // pictureURL:{
  //   type: String,
  //   required: [true, 'Picture is required']
  // }
}, { versionKey: false, timestamps: true });

lotSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  // pictureURL: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const changeSchema = Joi.object({
  title: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
  // pictureURL: Joi.string(),
}).or('title', 'price', 'description', 'favorite');

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    changeSchema,
    schemaUpdateFavorite,
}

const Lot = model("lot", lotSchema);

module.exports = {
    Lot,
    schemas,
}