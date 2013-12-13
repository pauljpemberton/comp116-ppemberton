// Obtain the score of Javascripts running on the page.
var pgScore = window.location.hash.substring(1);
var warning;

if (pgScore) {
	alert(pgScore);
	if (pgScore <= 100) {	//Very low risk page
		warning = "Defcon 5: This page seems relatively safe (very low risk).";
	}
	else if (pgScore > 100 && pgScore <= 300){	//Low risk page
		warning = "Defcon 4: This page is slightly risky (low risk).";
	}
	else if (pgScore > 300 && pgScore <= 400){	//Moderate risk page
		warning = "DEFCON 3: This page is moderately risky, be careful when clicking links. (moderate risk)";
	}
	else if (pgScore > 400 && pgScore <= 701){	//High risk page
		alert("DEFCON 2: Tread with care!")
		warning = "DEFCON 2: This page is running javascripts with potentially dangerous activities.  Navigation to another site is advised! (high risk)";
	}
	else {						//Very high risk page
		alert("DEFCON 1: NUCLEAR OPTION ACTIVE");
		warning = "DEFCON 1: This page contains a large number of javascripts or it is running dangerous scripts!  Navigate away from this page immediately or face the consequences! (very high risk)";
	}

	var doc = document.querySelector('#warning');
	// Replace the placeholder text with the actual score.
	doc.innerText = warning;
}
