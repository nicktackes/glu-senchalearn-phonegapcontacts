This repo contains the contents of the www folder that you should use as part of your Xcode project to create the PhoneGap contacts application. You will need to create your own Xcode project, and configure it (as per the tutorial).

The original mvc architecture is intact for comparison and is loaded using the mvcindex.html
you can load the mvvmindex.html via phonegap with a simple change to Classes/AppDelegate.m

for the mvc implementation, set the startPage like this
+ (NSString*) startPage
{
	return @"mvcindex.html";
}

for the mvvm implemenation, set the startPage like this
+ (NSString*) startPage
{
	return @"mvvmindex.html";
}


Additionally, the Sencha Touch2 developer preview has been included for convenience