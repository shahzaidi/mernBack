const express = require("express");
const router = express.Router();
const Products = require("../models/productModel");

router.get("/", async (req, res) => {
  const result = await Products.find();

  res.status(200).json({ success: true, data: result });
});

router.get("/productdetails/:name", async (req, res) => {
  let name = req.params.name;
  const result = await Products.findOne({ name: name });
  if (result) {
    res.status(200).json({ success: true, data: result });
  } else {
    res.status(400).json({
      success: false,
      message: `No Item available with this name: ${name}`,
    });
  }
});

router.post("/createproduct", async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill each field properly" });
  } else {
    try {
      const productExist = await Products.findOne({ name: name });
      if (productExist) {
        return res
          .status(400)
          .json({ success: false, message: "Product already exist" });
      }
      const result = await new Products({
        name,
        price,
      }).save();
      // await result.save();
      res
        .status(200)
        .json({ success: true, message: "Product created succefully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
});

router.get("/productpriceupdate/:id", async (req, res) => {
  // let { name } = req.body;
  let randomPrice;

  randomPrice = Math.floor(Math.random() * 100000);

  if (!randomPrice) {
    return res
      .status(400)
      .json({ success: false, message: "Price is not genrated automatically" });
  } else {
    try {
      const product = await Products.findByIdAndUpdate(
        req.params.id,
        { price: randomPrice },
        { new: true }
      );
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product Not Availabe with this id",
        });
      }

      res.status(200).json({ success: true, product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete("/productdelete/:id", async (req, res) => {
  let id = req.params.id;
  const result = await Products.findByIdAndDelete({ _id: id });
  if (result) {
    res.status(200).json({
      success: true,
      result: result,
      message: `Item deleted successfully`,
    });
  } else {
    res.status(400).json({
      success: false,
      message: `No item available with this ${id}`,
    });
  }
});

// Random Number

router.get("/random", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100); // Change 100 to the range you desire
  res.status(200).json({ number: randomNumber });
});

module.exports = router;
