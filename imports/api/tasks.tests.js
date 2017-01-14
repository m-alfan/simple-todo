import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { Tasks } from './tasks.js';

if(Meteor.isServer) {
	describe('Tasks', () => {
		describe('methods', () => {
			const userId = Random.id();
			let taskId;

			beforeEach(() => {
				Tasks.remove({});
				taskId = Tasks.insert({
					text: 'test task',
					createdAt: new Date(),
					owner: userId,
					username: 'tmesday',
				});
			});

			it('can delete owned tasks', () => {
				// find the internal implementation of the task method so we can
				// test in isolation
				const deleteTask = Meteor.server.method_handlers['tasks.remove'];

				// set up a fake method invocation that looks like what the method expects
				const invocation = { userId };

				// run the method with 'this' set to the fake invocation
				deleteTask.apply(invocation, [taskId]);

				// very that the method does what we expected
				var assert = require('assert');
				assert.equal(Tasks.find().count(), 0);
			});
		});
	});
}