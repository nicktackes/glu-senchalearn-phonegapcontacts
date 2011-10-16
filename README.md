This repo contains the contents of the www folder that you should use as part of your Xcode project to create the PhoneGap contacts application. You will need to create your own Xcode project, and configure it (as per the tutorial).

The original mvc architecture is intact for comparison and is loaded using the mvcindex.html
you can load the mvvcindex.html via phonegap with a simple change to Classes/AppDelegate.m

+ (NSString*) startPage
{
	return @"mvvcindex.html";
}


Additionally, the Sencha Touch2 developer preview has been included for convenience