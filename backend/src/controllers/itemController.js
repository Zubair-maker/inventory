import { Category } from "../models/categoryModel.js";
import { Item } from "../models/itemsModel.js";
import mongoose from "mongoose";
//retrive all items from db
const getItems = async (_req, res) => {
  try {
    //fetch items from the item collection in db
    const items = await Item.find({});
    console.log("items", items);
    res.status(200).json(items);
  } catch (error) {
    console.log("error when getitems", error);
    res.status(500).json({ message: " Failed to get Items" });
  }
};

const getItem = async (req, res) => {
  //extract the id from req parameter
  const { id } = req.params;
  console.log(id);
  try {
    const item = await Item.findById(id);
    console.log("itemid", item);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve item by id", error });
  }
};

//create a new item

const createItem = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    console.log("cate", categoryId);
    // Validate required fields
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Item name is required" });
    }

    if (!categoryId || categoryId.trim() === "") {
      return res.status(400).json({ message: "Category ID is required" });
    }
    // Validate if categoryId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid Category ID" });
    }
    // Find the category
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // Create the item
    const item = new Item({
      name,
      description,
      price,
      category: categoryId,
    });
    // Save the item
    const savedItem = await item.save();
    // Add the item to the category's items array
    category.items.push(savedItem._id);
    await category.save();

    // Return the saved item
    res.status(201).json({ message: "Item created successfully", savedItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit
const editItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  const { id } = req.params;

  // Validate the input data
  if (!name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find and update the item
    const updatedItem = await Item.findOneAndUpdate(
      { _id: id },
      { name, description, price, category },
      { new: true, runValidators: true }
    );

    // Handle the case where the item is not found
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//delete
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const removeItem = await Item.findByIdAndDelete(id);

    if (!removeItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { getItems, getItem, createItem, editItem, deleteItem };
