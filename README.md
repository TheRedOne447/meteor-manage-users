# Manage Users

A roles based account management system.

*this package is a fork and heavily modified from 'meteor-accounts-admin-ui-bootstrap-3' by @hharnisc - thanks for the great work*

## Config

On the server, create a new file "adminUser.coffee" with email, password, and name (you can change your password later)

```
Meteor.startup ->
	if Meteor.users.find().fetch().length < 1
		Meteor.call 'addAdmin', "a@a.com", "password", "Administrator"
```

Navigate to /admin/users to add users, add roles to users,
create/manage roles, delete users and superAdmins can impersonate (to debug) users


## Theme Support
To use a theme other than Bootstrap install the smart package for the theme and than add the theme option to the template call.

```
	{{> accountsAdmin theme="foundation"}}
```

### Community maintained themes:
[foundation](https://github.com/TheRedOne447/meteor-manage-users-foundation-theme)
