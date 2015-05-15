Template.updateAccountModalInner.helpers({
	data: function() {
		var userInScope = Session.get('userInScope');
		var unsetRoles;
		var allRoles = _.pluck(Roles.getAllRoles().fetch(), "name");
		if (!userInScope || !userInScope.roles) {
			unsetRoles = allRoles;
		} else {
			unsetRoles = _.difference(allRoles, userInScope.roles);
		}

		var data = {
			'userInScope':userInScope,
			'unsetRoles':unsetRoles
			}

		return data;
	}
});

Template.updateAccountModalInner.events({
	'click .add-role': function(event, template) {
		var role = this.toString();
		var userId = event.currentTarget.getAttribute('data-user-id');
		Meteor.call('addUserRole', userId, role, function(error) {
			if (error) {
				// optionally use a meteor errors package
				if (typeof Errors === "undefined")
					Log.error('Error: ' + error.reason);
				else {
					Errors.throw(error.reason);
				}
			}

			//update the data in the session variable to update modal templates
			Session.set('userInScope', Meteor.users.findOne(userId));
		});
	},

	'click .remove-role' : function(event, template) {
		var role = this.toString();
		var userId = event.currentTarget.getAttribute('data-user-id');

		Meteor.call('removeUserRole', userId, role, function(error) {
			if (error) {
				// optionally use a meteor errors package
				if (typeof Errors === "undefined")
					Log.error('Error: ' + error.reason);
				else {
					Errors.throw(error.reason);
				}
			}

			//update the data in the session variable to update modal templates
			Session.set('userInScope', Meteor.users.findOne(userId));
		});
	},

	'change .admin-user-info' : function(event, template) {

		var ele = event.currentTarget;
		var userId = ele.getAttribute('data-user-id');

		Meteor.call('updateUserInfo', userId, ele.name, ele.value, function(error) {
			if (error)
			{
				if (typeof Errors === "undefined") Log.error('Error: ' + error.reason);
				else Errors.throw(error.reason);
				return;
			}
			Session.set('userInScope', Meteor.users.findOne(userId));
		});
	}
});
