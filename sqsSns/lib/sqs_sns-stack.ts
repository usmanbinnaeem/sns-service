import * as cdk from '@aws-cdk/core';
import * as sns from "@aws-cdk/aws-sns";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as sqs from "@aws-cdk/aws-sqs";

export class SqsSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // create an SNS topic
    const snsTopic = new sns.Topic(this, "snsTopic", {
      topicName: "sqs_sns"
    });

    // create a queue for subscription

    const sqsQueue = new sqs.Queue(this, "sqsQueue", {
      queueName: "sqsQueue"
    });

    // create a dead letter queue

    const dlQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "MySubscription_DLQ",
      retentionPeriod: cdk.Duration.days(14),
    });

    // subscribe queue to the topic

    snsTopic.addSubscription(
      new subscriptions.SqsSubscription(sqsQueue, {
        filterPolicy: {
          test: sns.SubscriptionFilter.stringFilter({
            whitelist: ["test"],
          }),
        },
        deadLetterQueue: dlQueue
      })
    );
  }
}
