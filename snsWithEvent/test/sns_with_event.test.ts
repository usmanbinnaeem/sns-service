import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SnsWithEvent from '../lib/sns_with_event-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SnsWithEvent.SnsWithEventStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
