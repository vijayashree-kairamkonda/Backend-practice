import Customer from "../models/Customer.js";

//create
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
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
    const customers = await Customer.find();
    res.status(201).json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get customer by id
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .json({ message: `Customer with ${req.params.id} not found` });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update customer by id
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res
      .status(201)
      .json({
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
    await Customer.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(400).json("Unable to delete the customer");
  }
};
