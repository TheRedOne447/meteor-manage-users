Template.deleteAccountModalInner.helpers({
	data: function() {
		var userInScope = Session.get('userInScope');
		var data = {
			'userInScope': userInScope
		}
		return data;
	}
});

Template.deleteAccountModalInner.events({
	'click .btn-danger': function(event, template) {
		Meteor.call('deleteUser', this._id, function(error) {
			if (error) {
				// optionally use a meteor errors package
				if (typeof Errors === "undefined")
					Log.error('Error: ' + error.reason);
				else {
					Errors.throw(error.reason);
				}
			} else {
				return globalCloseModal('#deleteaccount',Session.get("manageUsersTheme"));
			}
		});
	}
});
