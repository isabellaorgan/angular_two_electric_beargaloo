module.exports = function(app) {
	require('./controllers/bears_controller')(app);
	require('./directives/bear_directive')(app);
	require('./directives/bear_transclude_directive')(app);
	require('./directives/bear_form_directive')(app);
	require('./controllers/all_bears_controller')(app);
};
