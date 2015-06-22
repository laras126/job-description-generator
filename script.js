
var skillSetArr = [];

// Storing some data
var skills = {
	designer: {
		general: ["Product", "Front-end"],
		special: ["IA", "UX", "Graphic", "Content", "Animation"]
	},
	developer: {
		general: ["Front-end", "Back-end", "Full-Stack"],
		special: ["AngularJS", "HTML/CSS", "WordPress", "Rails", "Django"]
	}
}

// Job Title Constructor Object Thing
var JobTitle = function(isDesigner, isDeveloper, expLevel, isGeneralist, skillSet) {
	this.isDesigner = isDesigner;
	this.isDeveloper = isDeveloper;
	this.expLevel = expLevel;
	this.isGeneralist = isGeneralist;
	this.skillSet = skillSet;
}

// Update the skills array with some spaghetti logic
// Ideally would only want this to run after the designer/dev question has been answered, I think.
JobTitle.prototype.updateSkills = function() {
	
   	if (this.isDesigner) {
   		if(this.isGeneralist) {
			updateSkillSet(skills.designer.general);   		
   		} else {
			updateSkillSet(skills.designer.special);   		
   		}
   	} else {
   		if(this.isGeneralist) {
			updateSkillSet(skills.developer.general);
		} else {
			updateSkillSet(skills.developer.special);   		
   		}
   	}
}

// Function to run various callbacks when associated field changes
JobTitle.prototype.onFieldChange = function(fieldId, callback) {
	var field = document.getElementById(fieldId);
	
	// Update each field with the callback when it changes
	// Oh, wow, is this a closure IRL? Nice work, Larv.
	field.addEventListener('change', function(e) {
		return function() {
			callback.apply(); // Do I need apply here?
			title.updateSkills.apply(); 
		}
	}(this));
}

 
// Create the job title object   
var title = new JobTitle();


// Update each field when it changes
// Not great ID names, fwiw
// This could be more concise, probably
title.onFieldChange("designerBool", updateDesigner);
title.onFieldChange("generalistLogic", updateGeneralist);
title.onFieldChange("expLevel", updateExpLevel);




// --
// Updater Functions
// --

// Are they super spaghetti?

// Logic for designer
// Is there a way to not hardcode these form values?
function updateDesigner() {

   	updateResult("skillsResult", "");

	// Update the job title text and set a variable	
	if(document.getElementById("designerTrue").checked) {

		this.isDesigner = true;
		this.isDeveloper = false;
		document.getElementById("designerResult").innerHTML = "Designer";

	} else if(document.getElementById("designerFalse").checked) {
		
		this.isDeveloper = true;
		this.isDesigner = false;
		document.getElementById("designerResult").innerHTML = "Developer";
	
	}
}



// Generalist Logic
function updateGeneralist() {

   	updateResult("skillsResult", "");

	if(document.getElementById("generalist").checked) {

		// Update the job title
		this.isGeneralist = true;
	   	updateResult("generalistResult", "Generalist");

	} else if(document.getElementById("specialist").checked) {
		
		// Update the job title
		this.isGeneralist = false;
	   	updateResult("generalistResult", "Specialist");

	}
}


// Update the experience level
function updateExpLevel() {

	var container = document.getElementById("expLevel");
	var radios = container.querySelectorAll('input'); // Get all radios
	
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			updateResult("expLevelResult", radios[i].value);
		}
	};

}



// Update the dropdown according to array of skills defined about
function updateSkillSet(skillSetArr) {

	// Clear the options - cleaner way to do this?
	var skillSelect = document.getElementById("skillSetSelect");
		skillSelect.innerHTML = '';

	// Add one blank option
	var defaultOption = document.createElement('option');
		defaultOption.text = defaultOption.value = "Select a Skill";
	    skillSelect[skillSelect.options.length] = new Option("Select a Skill");

	// Create new options for each skill in array
	for (var i = 0; i < skillSetArr.length; i++) {
		var option = document.createElement('option');
		option.text = option.value = skillSetArr[i];
	    skillSelect[skillSelect.options.length] = new Option(skillSetArr[i]);

		var val = skillSetArr[i];
	    var opts = skillSelect.options;
	};
	
	// Update the job title text when the selection is made
	skillSelect.addEventListener('change', function() {
	   	var value = skillSelect[skillSelect.selectedIndex].value;
	   	updateResult("skillsResult", value);
	});
}



// Utility function to replace innerHTML of results
// Is this abstracting more than necessary?
function updateResult(id, text) {
	document.getElementById(id).innerHTML = text;
}

