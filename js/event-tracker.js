/**
 * Event tracker
 * 
 * @author: mandriani
 * @version: 1.0
 * 
 */

/**
 * Sociedade Controller Check
 */
EventTracker = function() {
    this.triggeredEvents = [];
    this.eventConfig = {
	hitType : 'event', // Required.
	eventCategory : 'button', // Required.
	eventAction : 'click', // Required.
	eventLabel : 'nav buttons',
	eventValue : 0,
	nonInteraction : 1
    };
	
	this.init();
};

EventTracker.prototype.init = function() {
    this.setListenners();
};

EventTracker.prototype.setListenners = function() {
    var that = this;

    /*
     * default hash
     * 
     * Category – Name for group of events e.g. “contact”. Read more:
     * http://www.seoweather.com/google-analytics-event-tracking-code-generator/#ixzz3i23CEfOg
     * 
     * Action – The action field should be used to describe what happened. For
     * example “quickquote”. Read more:
     * http://www.seoweather.com/google-analytics-event-tracking-code-generator/#ixzz3i23FKiko
     * 
     * Label This is optional but if you wish to label your actions use this.
     * For example “quickquote a”. Read more:
     * http://www.seoweather.com/google-analytics-event-tracking-code-generator/#ixzz3i23HgAdS
     * 
     * Value This is optional but if you want the event to have a numerical
     * value associated to it enter it here. Read more:
     * http://www.seoweather.com/google-analytics-event-tracking-code-generator/#ixzz3i23K9rFJ
     * 
     * home-sociedade-links/title-link/materia-slug/1
     * guides/download-seo/seo-beginners-guide.pdf/10
     * 
     * {required} / {required} / {required} / {optional}
     */

    jQuery("[data-event-trigger]").on('click', function() {
	that.callEvent(jQuery(this).attr('data-event-trigger'));
    });
};

EventTracker.prototype.callEvent = function(hash) {
    var that = this;
    var data = that.eventFactory(hash);
    if (data != null) {
	setTimeout(function() {
	    ga('send', data);
	}, 0);
    }
};

EventTracker.prototype.eventFactory = function(hash) {
    var event = this.eventConfig;
    var eventRegex = /^([\w\dáàâãéèêíïóôõöúçñ\-\._]+)\/([\w\dáàâãéèêíïóôõöúçñ\-\._]+)\/([\w\dáàâãéèêíïóôõöúçñ\-\._]+)(?:\/)?([\w\dáàâãéèêíïóôõöúçñ\-\._]+)?(?:\/)?$/i;

    try {

	if (!eventRegex.test(hash)) {
	    throw new Error(
		    "Invalid event path: You must follow the follow pattern\n"
			    + "{required} / {required} / {required} / {optional}\n"
			    + "home-sociedade-links/title-link/materia-slug/1");
	}

	// Get data
	var data = eventRegex.exec(hash);
	event.eventCategory = data[1];
	event.eventAction = data[2];
	event.eventLabel = data[3];

	if (typeof data[4] !== 'unfedined') {
	    event.eventValue = data[4];
	}

    } catch (e) {
	event = null;
	console.log('Tracking Error on: ' + hash);
	console.log(e);
    }
    return event;
};