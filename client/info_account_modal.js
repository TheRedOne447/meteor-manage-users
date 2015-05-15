Template.infoAccountModalInner.helpers({
	data: function() {
		var userInScope = Session.get('userInScope');

		var pairs = [];
		if (!this.roles)
			pairs.push({key: 'Roles', value: 'None'});

		for (var role in this.roles) {
			var r = this.roles[role];
			if (role === '0') {
				pairs.push({key: 'Roles', value: r});
			} else {
				pairs.push({key: '-', value: r});
			}
		}

		var data = {
			'userInScope': userInScope,
			'rolePairs': pairs
		}
		return data;
	}
});
