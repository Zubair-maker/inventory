import { Category } from "../models/categoryModel.js";

const createCategory = async (req, res) => {
  if (req.body.name === "" || !req.body.name)
    return res.status(400).json({ message: "Empty category can not be added" });
  try {
    const category = new Category({
      name: req.body.name,
    });
    console.log("cat", category);
    const savedCategory = await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully", savedCategory });
  } catch (error) {
    res.status(500).json({ message: " Failed to get Category" });
  }
};

const getCategories = async (_req, res) => {
  try {
    const categories = await Category.find({})
      .populate("items", "name description price")
      .lean();
    // console.log("categories", categories);
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "categories not found",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Servor error. could not retrieve categoreis",
    });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate("items", {
      name: 1,
      description: 1,
      price: 1,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      seccess: false,
      message: "Servor error. could not retrieve category",
    });
  }
};

//editcategory
const editcategory = async (req, res) => {
  const { id } = req.params;
  const category = { name: req.body.name };

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "category name is required.",
    });
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, category, {
      new: true,
    }).populate("items", {
      name: 1,
      description: 1,
      price: 1,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      seccess: false,
      message: "Servor error. could not edit category",
    });
  }
};

//deleteCategory
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const removeCategory = await Category.findByIdAndDelete(id);

    if (!removeCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error. category could not deleted",
    });
  }
};

export {
  createCategory,
  getCategories,
  getCategory,
  editcategory,
  deleteCategory,
};
