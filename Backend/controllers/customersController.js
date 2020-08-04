const errorHandler = require("../utils/errorHandler");

//Import Customer Model
const Customer = require("../models/customerModel");

exports.createCustomer = async (req, res, next) => {
  try {
    const customer = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      citizenship: req.body.citizenship,
      createdBy: req.user._id,
    };

    const newCustomer = await Customer.create(customer);
    res.status(201).json({
      status: "success",
      data: {
        customer: newCustomer,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getCustomers = async (req, res, next) => {
  try {
    let customers;

    //If admin send all customers, else send customers which are created by logged in advisor
    if (req.user.role === "admin") {
      customers = await Customer.find();
    } else {
      customers = await Customer.find({ createdBy: req.user._id });
    }

    if (!customers.length) {
      return next(errorHandler.sendError("No customers found", "failed", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        customers,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    let customer;

    if (req.user.role === "admin") {
      customer = await Customer.findById(id);
    } else {
      customer = await Customer.findOne({ _id: id, createdBy: req.user._id });
    }

    if (!customer) {
      return next(
        errorHandler.sendError(
          `No customers found with id: ${id}`,
          "failed",
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    let customer;

    if (req.user.role === "admin") {
      customer = await Customer.findByIdAndUpdate(
        { _id: id },
        { ...req.body, createdBy: req.user._id },
        { runValidators: true, new: true }
      );
    } else {
      customer = await Customer.findOneAndUpdate(
        {
          _id: id,
          createdBy: req.user._id,
        },
        { ...req.body, createdBy: req.user._id },
        { runValidators: true, new: true }
      );
    }

    if (!customer) {
      return next(
        errorHandler.sendError(
          `No customers found with id: ${id}`,
          "failed",
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    let customer;

    if (req.user.role === "admin") {
      customer = await Customer.findByIdAndDelete({ _id: id });
    } else {
      customer = await Customer.findOneAndDelete({
        _id: id,
        createdBy: req.user._id,
      });
    }

    if (!customer) {
      return next(
        errorHandler.sendError(
          `No customers found with id: ${id}`,
          "failed",
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};
