const uuid = require("uuid");
const AWS = require("aws-sdk");

const updateTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { done, description, title, createdAt } = JSON.parse(event.body);

  await dynamodb
    .update(
      {
        TableName: "TaskTable",
        Key: { id },
        UpdateExpression:
          "set done = :done, description = :description,title = :title,createdAt = :createdAt",
        ExpressionAttributeValues: {
          ":done": done,
          ":description": description,
          ":title": title,
          ":createdAt": createdAt,
        },
        ReturnValues: "ALL_NEW",
      },
      function (err, data) {
        if (err) console.log(err);
        else console.log(data);
      }
    )
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "task updated",
    }),
  };
};

module.exports = {
  updateTask,
};
