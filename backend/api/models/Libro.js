/**
 * Libro.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    titulo:{
      type: 'string',
      required: true
    },
    autor:{
      type:'string',
      required:true
    },
    editorial:{
      type :'string',
      required:true
    },
    isbn: {
      type: 'string',
      required: true,
      unique: true
    }
  }
};

