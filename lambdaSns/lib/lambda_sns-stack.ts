
import * as cdk from "@aws-cdk/core";
import * as sns from "@aws-cdk/aws-sns";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sqs from "@aws-cdk/aws-sqs"

export class LambdaSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const Lambda = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "lambda.handler",
    });

    // adding a dead letter queue
    const dlQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "DeadLetterQueue",
      retentionPeriod: cdk.Duration.days(14),
    });

    // create an SNS topic
    const snsLambdaTopic = new sns.Topic(this, "snsTopic", {
      topicName: "snsLambdaTopic"
    });

    // adding subscription to topic
    snsLambdaTopic.addSubscription(
      new subscriptions.LambdaSubscription(Lambda, {
        filterPolicy: {
          test: sns.SubscriptionFilter.numericFilter({
            between: { start: 100, stop: 200 },
          }),
        },
        deadLetterQueue: dlQueue,
      })
    );
  }
}
