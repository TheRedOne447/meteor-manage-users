Template.accountsAdmin.helpers({
	data: function() {
		var searchFilter = Session.get("userFilter");
		var users = filteredUserQuery(Meteor.userId(), Session.get("userFilter"));
		var data = {
			'users': users,
			'searchFilter': searchFilter
		};
		
		return data;
	}
});

// search no more than 2 times per second
var setUserFilter = _.throttle(function(template) {
	var search = template.find(".search-input-filter").value;
	Session.set("userFilter", search);
}, 500);

Template.accountsAdmin.events({
	'keyup .search-input-filter': function(event, template) {
        setUserFilter(template);
        return false;
    },

    'click [data-action="delete"]': function(event, template) {
		Session.set('userInScope', this);
    },

    'click [data-action="info"]': function(event, template) {
		Session.set('userInScope', this);

    },

    'click [data-action="update"]': function(event, template) {
		Session.set('userInScope', this);

	  },

    'click [data-action="addUser"]': function(event, template) {
		//Session.set('userInScope', this);
		},

	'click [data-action="impersonate"]': function(event, template) {
		event.preventDefault()
		Session.set('impersonate', this._id);
		Meteor.call('impersonate', this._id, Meteor.userId(), function(err, result) {
			if (err)
				console.log(err);
			Meteor.connection.setUserId(Session.get('impersonate'));
			Router.go('/');
		});
	}
});

Template.accountsAdmin.rendered = function() {
	if(this.data && this.data.theme) {
		Session.set("manageUsersTheme",this.data.theme);
	} else {
		Session.set("manageUsersTheme","bootstrap");
	}

	var searchElement = document.getElementsByClassName('search-input-filter');
	if(!searchElement)
		return;
	var filterValue = Session.get("userFilter");

	var pos = 0;
	if (filterValue)
		pos = filterValue.length;

	searchElement[0].focus();
	searchElement[0].setSelectionRange(pos, pos);
};
