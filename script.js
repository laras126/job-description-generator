
var skillSetArr = [];


// Job Title Constructor Object Thing
var JobTitle = function(isDesigner, expLevel, isGeneralist, skillSet) {
	this.isDesigner = isDesigner;
	this.expLevel = expLevel;
	this.isGeneralist = isGeneralist;
	this.skillSet = skillSet;
}


// Function to run various callbacks when associated field changes
JobTitle.prototype.onFieldChange = function(fieldId, callback) {
	var field = document.getElementById(fieldId);
	
	// Update each field with the callback when it changes
	// Oh, wow, is this a closure IRL?
	field.addEventListener("change", function(e) {
		updateSkillSet(); // TODO: dis be broke.
		return function() {
			callback.apply(); // Do I need apply here?
		}
	}(this));
}

 
// Create the job title object   
var title = new JobTitle();


// Update each field when it changes
// Not great ID names, fwiw
// This could be nicer also
title.onFieldChange("designerBool", updateDesigner);
title.onFieldChange("generalistLogic", updateGeneralist);
title.onFieldChange("expLevel", updateExpLevel); // This also calls updateSkillSet
// title.onFieldChange("expLevel", updateSkillSet); // Need to update skillset before you get to it - not ideal
// Skills updating needs to happen all the time.





// --
// Updater Functions
// --

// Are they super spaghetti?

// Logic for designer
// Is there a way to not hardcode these form values?
function updateDesigner() {

	// Update the job title text and set a variable	
	if(document.getElementById("designerTrue").checked) {

		this.isDesigner = true;
		document.getElementById("designerResult").innerHTML = "Designer";

	} else if(document.getElementById("designerFalse").checked) {
		
		this.isDesigner = false;
		document.getElementById("designerResult").innerHTML = "Developer";
	
	}
}



// Generalist Logic
// Set skill set array according to answer
function updateGeneralist() {
	
	if(document.getElementById("generalist").checked) {

		// Update the job title
		this.isGeneralist = true;
	   	updateResult("generalistResult", "Generalist");
		
		// Set array according to designer or not
		if(this.isDesigner) {
			skillSetArr = ["UX", "Front-end", "Full-Stack"];
		} else {
			skillSetArr = ["Front-end", "Back-end", "Full-Stack"];
		}

	} else if(document.getElementById("specialist").checked) {
		
		// Update the job title
		this.isGeneralist = false;
	   	updateResult("generalistResult", "Specialist");

		// Set array according to designer or not
		if(this.isDesigner) {
			skillSetArr = ["IA", "UX", "UI/Visual", "Content Strategy"];
		} else {
			skillSetArr = ["Back-end", "JavaScript", "HTML/CSS", "DevOps"];
		}

	}
}


// Update the skillset
function updateExpLevel() {

	var container = document.getElementById("expLevel");
	var radios = container.querySelectorAll('input'); // Get all radios
	
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			updateResult("expLevelResult", radios[i].value);
		}
	};

	// Get value of radio and put it in HMTL
	// updateResult("expResult");
}



// Update the dropdown according to array of skills defined about
function updateSkillSet() {

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
	   	updateResult('skillsResult', value);
	});
}



// Utility function to replace innerHTML of results
// Is this abstracting more than necessary?
function updateResult(id, text) {
	document.getElementById(id).innerHTML = text;
}

