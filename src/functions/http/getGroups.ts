const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const docClient = new DynamoDB({ region: "us-east-1" });

const groupsTable = process.env.GROUPS_TABLE;


export const handler = async (event) => {
    console.log("event", event)

    const result = await docClient.scan({
        TableName: groupsTable
    })

    const items = result.Items

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            items: items
        })
    }
}
