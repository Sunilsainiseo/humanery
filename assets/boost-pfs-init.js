var boostPFS = new BoostPFS();
boostPFS.init();
if (typeof boostPFSConfig != 'undefined'
	&& typeof boostPFSConfig.general != 'undefined' 
	&& typeof boostPFSConfig.general.isInitFilter != 'undefined'
	&& typeof boostPFSThemeConfig != 'undefined'
	&& boostPFSConfig.general.isInitFilter === true) {
	boostPFS.initFilter();
}
setTimeout(function() {
	var boostPFS = new BoostPFS();
	boostPFS.init();
	boostPFS.initFilter();
	boostPFS.initSearchBox();
	boostPFS.initAnalytics();
});
BoostPFS.jQ(window).on('load', function(){
	boostPFS.initSearchBox();
	boostPFS.initAnalytics();
});