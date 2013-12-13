// This code is loosely based on a variety of example code, in particular 
// sandwichbar (c) 2010 courtesy of The Chromium Authors.

// This code was edited (heavily) by Paul Pemberton (c) 2013

// The below code will get all javascript elements from the web page that
// the user is on and then score the javascript content by searching for
// specific tags related to potentially malicious behavior.  This
// is a very naive algorithm for determining risk, and should be modified. 

var regexAlert = /alert/gi;	//Regular expression to find alert tags
var regexHTTP = /http/gi;	//Regular expression to find HTTP tags
var regexWindow = /window/gi;	//Regular expression to find window tags
var regexEval = /eval/gi;	//Regular expression to find eval tags
var regexSrc = /src/gi;		//Regular expression to find src tags

var JSlist = document.getElementsByTagName("SCRIPT");

function JSscore(JSElem)
{
	var score = 0;
	alertIn = JSElem.innerHTML.match(regexAlert);
	windowIn = JSElem.innerHTML.match(regexWindow);
	evalIn = JSElem.innerHTML.match(regexEval);
	srcIn = JSElem.innerHTML.match(regexSrc);
	HTTPIn = JSElem.innerHTML.match(regexHTTP);
	if(alertIn)
		score = score + 2*(alertIn.length);
	if(windowIn)
		score = score + 5*(windowIn.length);
	if(evalIn)
		score = score + 3*(evalIn.length);
	if(srcIn)
		score = score + 1*(srcIn.length);
	if(HTTPIn)
		score = score + 4*(HTTPIn.length);

	alertOut = JSElem.outerHTML.match(regexAlert);
	windowOut = JSElem.outerHTML.match(regexWindow);
	evalOut = JSElem.outerHTML.match(regexEval);
	srcOut = JSElem.outerHTML.match(regexSrc);
	HTTPOut = JSElem.outerHTML.match(regexHTTP);
	if(alertOut)
		score = score + 1*(alertsOut.length);
	if(windowOut)
		score = score + 5*(windowOut.length);
	if(evalOut)
		score = score + 4*(evalOut.length);
	if(srcOut)
		score = score + 2*(srcOut.length);
	if(HTTPOut)
		score = score + 3*(HTTPOut.length);

	return score;
}

var totScore = 0;
for (var i = 0; i < JSlist.length; i++)
{
	totScore = totScore + JSscore(JSlist[i]);
}

if (totScore != 0) {
  var payload = {
	pageScore: totScore    // Pass the number of matches back.
  };
  chrome.extension.sendRequest(payload, function(response) {});
}
