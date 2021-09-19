import * as cdk from '@aws-cdk/core';
import * as sns from "@aws-cdk/aws-sns";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import { SubscriptionProtocol } from "@aws-cdk/aws-sns";

export class SnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const httpLambda = new lambda.Function(this, "lambda for http", {
      functionName: "httpLambda",
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "lambda.handler"
    })

    // end pouint for labda function

    const api = new apigw.LambdaRestApi(this, "api for lambda", {
      restApiName: "snsApi",
      handler: httpLambda,
    })

    const snsTopic = new sns.Topic(this, "SNS_TOPIC", {
      displayName: "SNS Subscription"
    })

    snsTopic.addSubscription(
      new subscriptions.UrlSubscription(api.url, {
        protocol: SubscriptionProtocol.HTTPS
      })
    )

  }
}
