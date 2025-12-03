import Customer from "../models/Customer.js";
import redis from "../../config/redis.js";

//create
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    await redis.del("customers:list");
    res
      .status(201)
      .json({ message: "Customer created successfully", customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get all customers
export const getCustomers = async (req, res) => {
  try {
    const cacheKey = "customers:list";
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("Cache HIT (customers:list)");
      return res.json(JSON.parse(cached));
    }

    console.log("Cache MISS (customers:list)");
    const customers = await Customer.find();
    await redis.set(cacheKey, JSON.stringify(customers), "EX", 60);
    res.status(201).json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get customer by id
export const getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const key = `customer:${id}`;
    const cache = await redis.get(key);
    if (cache) {
      console.log("Cache HIT", key);
      return res.json(JSON.parse(cache));
    }
    console.log("Cache MISS", key);
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: `Customer with ${id} not found` });
    }
    await redis.set(key, JSON.stringify(customer), "EX", 60);
    res.json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update customer by id
export const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await redis.del(`customer:${id}`);
    await redis.del("customers:list");
    res.status(201).json({
      message: "Customer updated successfully",
      updatedData: updatedCustomer,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findByIdAndDelete(id);
    await redis.del(`customer:${id}`);
    await redis.del("customers:list");
    res.status(201).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(400).json("Unable to delete the customer");
  }
};
