const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {

    switch (event.routeKey) {
      case "DELETE /leads/{id}":
        await dynamo
          .delete({
            TableName: "leads-desafio-final",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /leads/{id}":
        body = await dynamo
          .get({
            TableName: "leads-desafio-final",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /leads":
        body = await dynamo
          .scan({ TableName: "leads-desafio-final" })
          .promise();
        break;
      case "POST /leads":
        let requestJSON = JSON.parse(event.body);
        let uuid =create_UUID();
        
        await dynamo
          .put({
            TableName: "leads-desafio-final",
            Item: {
              id: uuid,
              name: requestJSON.name,
              phoneNumber: requestJSON.phoneNumber,
              email: requestJSON.email.toLowerCase(),
              category: "prospect",
              dateBecameLead: new Date().toString(),
              dateBecameClient: null
            }
          })
          .promise();
        body = `Create lead ${uuid}`;
        break;
      case "PUT /leads/{id}":
        await dynamo
          .update({
            TableName: "leads-desafio-final",
            Key: {
              id: event.pathParameters.id
            },
            UpdateExpression: "set category = :c, dateBecameClient = :d",
            ExpressionAttributeValues:{
                ":c": "customer",
                ":d": new Date().toString()
            }
          })
          .promise();
        body = `Update item ${event.pathParameters.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
