import * as cdk from '@aws-cdk/core';
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as sns from "@aws-cdk/aws-sns";
import * as sqs from "@aws-cdk/aws-sqs";

export class EmailSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const emailSnsTopic = new sns.Topic(this, "emailSnsTopic", {
      topicName: "emailSnsTopic"
    });

    // create a dead letter queue
    const dlQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "MySubscription_DLQ",
      retentionPeriod: cdk.Duration.days(14),
    });

    // subscribe email to the topic
    emailSnsTopic.addSubscription(
      new subscriptions.EmailSubscription("usmaanbinnaeem@gmail.com", {
        json: false,
        deadLetterQueue: dlQueue,
      })
    );
  }
}
