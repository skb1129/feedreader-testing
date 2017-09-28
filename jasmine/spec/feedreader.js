/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

        // Tests that allFeeds variable has been defined.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

		// Tests if all feeds have a URL defined.
        it('has URLs defined', function() {
            for (var i in allFeeds) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

		// Tests if all feed have a defined name.
        it('has names defined', function() {
            for (var i in allFeeds) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

	/* This is our second test suite - This suite contains the
	 * tests on menu.
	 */
    describe('The menu', function() {

		// Tests if the menu is hidden by default.
        it('is already hidden', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

		// Tests if the menu visibility is toggled on click.
        it('visibility is toggled', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });

	/* This is our third test suite - This suite contains the
	 * tests on the initially loaded feed entries.
	 */
    describe('Initial Entries', function() {

		// Waits for asynchronous call to end.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

		// Tests if the initial entries are not empty.
        it('has at least one feed', function() {
            expect($('.feed > .entry-link > .entry').length).toBeGreaterThan(0);
        });
    });

	/* This is our fourth test suite - This suite contains the
	 * tests on the newly loaded feeds.
	 */
    describe('New Feed Selection', function() {
        var feedOld, feedNew;

		// Waits for asynchronous call to end.
		// Selects the old feed element.
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOld = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        // Tests if content changes on new feed load.
        it('content is changed', function(done) {
            feedNew = document.querySelector('.feed').innerHTML;
            expect(feedOld).not.toBe(feedNew);
            done();
        });
    });
}());
