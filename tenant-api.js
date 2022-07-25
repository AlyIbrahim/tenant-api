//import AWS from 'aws-sdk'
// import { nanoid } from 'nanoid';

var AWS = require('aws-sdk');
// var { nanoid } = require("nanoid");
var express = require('express')
var router = express.Router();

const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const table = 'tenants'

// Home page route.
router.get('/', async function (req, res) {
  console.log("Get tenants")
  let data = await getAll("tenants")
  res.send(data);
//  res.send('Wiki home page');
})

router.post('/', async function (req, res) {
//  console.log(req)
  let data = req.body;
//  console.log(JSON.parse(data))
  console.log(data)
  console.log(data.action)
  console.log(data.dbname)
  let resp = await insertTenant(data.tenant, data.tier, data.base_domain, data.action, data.email);
//  let resp = await insertTenant(data.tenant, data.action, data.dbname, data.user, data.base_domain, data.email);
  console.log(resp)
  res.send(resp)
})

router.put('/', async function (req, res) {
  let data = req.body;
  console.log(data)
  let resp = await updateTenant(data.name, data.tier, data.base_domain, action, email);
  console.log(resp)
  res.send(resp)

})

router.delete('/', async function (req, res) {
  let data = req.body;
  console.log(data)
  let resp = await deleteTenant(data.name);
  console.log(resp)
  res.send(resp)

})



const insertTenant = async (name, tier, base_domain, action, email) => {
  const params = {
    TableName: table,
    Item: {
      tenant: name,
      user: name,
      tier: tier,
      dbname: name,
      base_domain: base_domain,
      action: action,
      email: email
    },
  };
  try {
    const data = await ddb.put(params).promise();
    console.log('Tenant inserted', data);
  } catch (err) {
    console.log(err);
  }
};


const getAll = async (table) => {
  const params = {
    TableName: table,
  };
  try {
    const data = await ddb.scan(params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteTenant = async (name) => {
  const params = {
    TableName: table,
    Key: {
      tenant: name,
    }
  };
  try {
    const data = await ddb.delete(params).promise();
    console.log('Tenant deleted', data);
  } catch (err) {
    console.log(err);
  }
};

const updateTenant = async (name, tier, base_domain) => {
  const params = {
    TableName: table,
    Item: {
      tenant: name,
      user: name,
      tier: tier,
      dbname: name,
      base_domain: base_domain
    },
  };
  try {
    const data = await ddb.put(params).promise();
    console.log('Tenant updated', data);
  } catch (err) {
    console.log(err);
  }
};




module.exports = router;
