const customers = require("../models/customer");
const aqp = require("api-query-params");
const create_customers = async (data) => {
  console.log("data", data);
  try {
    const result = await customers.create(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const create_customers_many = async (data) => {
  console.log("data", data);
  try {
    const result = await customers.insertMany(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const get_customers = async (limit, page, querystring) => {
  try {
    let result = null;
    if (limit && page) {
      const { filter } = aqp(querystring);
      delete filter.page;
      console.log(filter);
      let offset = (page - 1) * limit;
      result = await customers.find(filter).limit(limit).skip(offset).exec();
    } else {
      result = await customers.find({});
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
const put_customers = async (data) => {
  console.log(data);
  try {
    const result = await customers.updateOne(
      { _id: data.Id },
      { Name: data.Name }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const delete_customers = async (id) => {
  try {
    const result = await customers.delete({ _id: { $in: id } });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  create_customers,
  create_customers_many,
  get_customers,
  put_customers,
  delete_customers,
};
