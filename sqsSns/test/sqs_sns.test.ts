import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SqsSns from '../lib/sqs_sns-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SqsSns.SqsSnsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
