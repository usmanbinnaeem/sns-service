import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    const data = JSON.parse(event.body!);
    console.log("DATA in event body => ", data);

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `DATA in event body => ${data}`
    }

}



