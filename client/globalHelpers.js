Template.registerHelper("getTemplateName", function() {
	var template = Template.instance();
	var templateName;
	var theme = Session.get("manageUsersTheme");
	if(template){
		templateName = template.view.name.split(".")[1];
	}
	if(theme && templateName){
		return templateName + "_" + theme;
	}
});

Template.registerHelper("myself", function(userId){
	return Meteor.userId() === userId;
});

Template.registerHelper("email", function(userId){
	if (this.emails && this.emails.length)
		return this.emails[0].address;

	if (this.services) {
		//Iterate through services
		for (var serviceName in this.services) {
			var serviceObject = this.services[serviceName];
			//If an 'id' isset then assume valid service
			if (serviceObject.id) {
				if (serviceObject.email) {
					return serviceObject.email;
				}
			}
		}
	}
	return "";
});

Template.registerHelper("adminRole", function(){
	return this.name === 'admin';
});

closeModal = {};

globalCloseModal = function (modal,theme) {
	closeModal[theme](modal);
};
