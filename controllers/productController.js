import productModel from "../modules/productModel.js";
import slugify from "slugify";
import fs from "fs";

// Create Product

export const createProductController = async (req, res) => {
  try {

    console.log(req.fields)
    console.log(req.files)
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({
          success: false,
          message: "Name is required",
        });
      case !description:
        return res.status(500).send({
          success: false,
          message: "Description is required",
        });
      case !price:
        return res.status(500).send({
          success: false,
          message: "Price is required",
        });
      case !category:
        return res.status(500).send({
          success: false,
          message: "Category is required",
        });
      case !quantity:
        return res.status(500).send({
          success: false,
          message: "Quantity is required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          success: false,
          message: "Image should be less than 1MB",
        });
    }

    const newProduct = new productModel({
      ...req.fields,
      slug: slugify(name),
      ...req.files,
    });

    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    await newProduct.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in creating product",
      });
    }
  }
};

// Get all products controller

export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All products",
      total: products.length,
      products,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting products",
      });
    }
  }
};

// get single product controller

export const getSingleProductsController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product",
      product,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting single product",
      });
    }
  }
};

// get product photo controller

export const getProductPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting product photo",
      });
    }
  }
};

// delete product controller

export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel
      .findOneAndDelete(pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

// update product controller
export const UpdateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({
          success: false,
          message: "Name is required",
        });
      case !description:
        return res.status(500).send({
          success: false,
          message: "Description is required",
        });
      case !price:
        return res.status(500).send({
          success: false,
          message: "Price is required",
        });
      case !category:
        return res.status(500).send({
          success: false,
          message: "Category is required",
        });
      case !quantity:
        return res.status(500).send({
          success: false,
          message: "Quantity is required",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          success: false,
          message: "Image should be less than 1MB",
        });
    }

    const newProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name), ...req.files },
      { new: true }
    );

    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    await newProduct.save();
    res.status(201).send({
      success: true,
      message: "Product Updated successfully",
      product: newProduct,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Update product",
      });
    }
  }
};
