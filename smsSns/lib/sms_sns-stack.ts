import * as cdk from '@aws-cdk/core';
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as sns from "@aws-cdk/aws-sns";
import * as sqs from "@aws-cdk/aws-sqs";

export class SmsSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const snsSmsTopic = new sns.Topic(this, "snsSmsTopic");

    // create a dead letter queue
    const dlQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "MySubscription_DLQ",
      retentionPeriod: cdk.Duration.days(14),
    });

    // subscribe SMS number to the topic
    snsSmsTopic.addSubscription(
      new subscriptions.SmsSubscription("+923155537059", {
        deadLetterQueue: dlQueue,
        filterPolicy: {
          test: sns.SubscriptionFilter.numericFilter({
            greaterThan: 100
          }),
        },
      })
    );
  }
}
