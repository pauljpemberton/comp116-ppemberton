README for Script Raider Google Chrome Extension:

================================================================================

Purpose of extension:
To provide a proof of concept for how script blockers/monitors need to function
in order to prevent social engineering attacks.  This extension will actively
monitor the Javascripts that are running on a given website and provide the user
with real time information about how dangerous a site is.

================================================================================

To run:
NOTE: This extension uses the Google Chrome infobar (which is not available
on most stable downloads of Google Chrome).  You may need to download the
unstable version to run this successfully.
1. Obtain the path for the folder that contains all of the files needed for the
   script (.js, .html, .json, .png).
2. Open Google Chrome.
3. In the options menu, navigate to the "Tools" option.
4. Select the "Extensions" tab (from the "Tools" menu).
5. Make sure that developer mode is on (click the developer mode box).
6. Select "Load unpacked extension..."
7. Navigate to the path where your folder from step 1 is.
8. Select the folder and click "open".  (Do not double click on the folder).
9. Any page you navigate to should be analyzed by the extension!

================================================================================

How it works:
This extension listens to user input in order to determine what web page they
are navigating to.  The extension (referred to as SR "Script Raider") then
uses a naively designed scoring matrix to determine how dangerous or risky the
page is based on its javascript content.  The matrix looks for the following:
"alert" tags
"window" tags
"http" tags (which will find https too)
"src" tags
"eval" tags

These tags are searched for by using regular expressions.  Here are the risk
factors associated with each tag:
"alert" - May cause a pop-up window which can be used as a XSS attack.
"window" - May redirect user to an alternate page (XSS attack).
"http" - Calling for code from an outside source, (unknown intent of code).
"src" - Calling code from page or from outside source, (unknown intent of code).
"eval" - May be evaluating user input text, can lead to browser crash.

The score is summed based on all tags found and then the final score (total)
is used to determine the level of risk associated with the site.

Risk Levels:
DEFCON 5: lowest risk level - response is merely info bar text stating low risk
DEFCON 4: low risk level - response is info bar text stating slight risk
DEFCON 3: mild risk level - response is info bar text stating potential risk, 
          advises user not to trust links (JS can be hidden in links)
DEFCON 2: high risk level - response is pop-up window warning user to "Tread
	  with care!"  Info bar text advises user to navigate to another site
DEFCON 1: highest risk level - response is pop-up window stating "NUCLEAR OPTION
          ACTIVE"  Info bar text advises user to navigate away immediately

These responses should give the user live and (although not yet accurate - see
below) information about the page that they are currently visiting.

================================================================================

Future directions:
This extension is merely a proof of concept, it is by no means correct in all
(or any for that matter) of its determinations about dangerous scripts.  For
example, this extension will label a Google search as high risk (since the page
returned by the search contains numerous scripts that will take the user to
foreign websites/alter the window).
If it were to be used in a practical sense, this script should be developed to
use machine learning or other sophisticated techniques to determine what
pages are actually bad or god (as opposed to arbitrary scoring based on 
what words the JS portions of a page has). Addtionally, there are a few features
in terms of warning users that would be nice to add.  For example, the different
levels of warning could not only output a message but also change the color of
the info bar.  Or perhaps, at the highest risk level, the user would actually
be stopped from visiting the site (as opposed to just provided with a pop-up
message).  Finally, the script could be linked to a local database so that a
"white list" of OK websites can be stored to allow the user to determine their
own preferences in certain circumstances.

================================================================================

Questions?
Contact: pauljpemberton@yahoo.com

Script Raider (c) Paul Pemberton 2013 
