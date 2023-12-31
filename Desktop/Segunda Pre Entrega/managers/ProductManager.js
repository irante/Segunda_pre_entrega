
const fs = require('fs/promises')
const path = require('path')
const productModel = require('../models/product.model')



class ProductManager {
  

  
 

//Obtener todos los productos

async getAll(query,limite,sort) {

  let filter = {};
  let limit = 10

  if (query) {
    filter = { title: query };
  }

  if (limite) {
    limit = limite
  
  }

  const products = await productModel
    .find(filter)
    .sort({ price: sort })
    .limit(limit)
    .lean();

    return products
    
  }

  // paginacion

  getAllPaged(page = 1) {
    return productModel.paginate({}, { limit:10, page, lean: true })
  }








  //Obtener Productos por id

  async getById(id) {
    const products = await productModel.find({ _id: id })

    return products[0]  // regresa el primero de la lista
  }

 
  // Agregar Producto
  async create(product) {
    const producto = await productModel.create(product)
    return producto
  }


  // Actualizar producto
  async update(id, product) {

    const result = await productModel.updateOne({ _id: id }, product)

    return result
   
  }


  // Eliminar productos

  async delete(id) {
   
      const result = await productModel.deleteOne({ _id: id })
  
      return result
   
  }


}




module.exports = new ProductManager() // singleton => se exporta la instancia que se usara el otros modulos. Cada modulo no tendrea que instanciar nuevamente