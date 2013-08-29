define(['jquery','async'], function ($, async) {
	var Plimage = function (images, callbacks) {
		this.images = images;
		this.callbacks = callbacks;
		this.loaded = {};
		this.errors = {};
	};

	Plimage.load = function(images, callbacks) {
		var p = new Plimage (images, callbacks);
		p.load();
	};

	Plimage.prototype = {
		load : function () {
			async.each(this.images, this.loadItem.bind(this), this.loadCompleted.bind(this));
		},
		loadItem : function (item, callback) {
			$.ajax({
				url : item,
				success : this.loadItemCompleted.bind(this, item, callback),
				error : this.loadItemCompleted.bind(this, item, callback)
			});
		},
		loadItemCompleted : function (item, callback, data, textStatus, jqXHR) {
			// handle error checking
			var that = this;
			this.loaded[item] = true;
			if (this.callbacks.each) {
				var progress = {};
				async.each(this.images, function (item, cb) {
					progress[item] = that.loaded[item];
					cb();
				}, function (error) {
					that.callbacks.each(textStatus != 'success' ? textStatus : undefined, item, progress, data, textStatus, jqXHR);
				});
			}
			if (textStatus != 'success') {
				this.errors[item] = {textStatus : textStatus, data : data};
				callback(this.callbacks.allowErrors ? undefined : textStatus);
			} else {
				callback();
			}
		},
		loadCompleted : function (error) {
			this.callbacks.done(this.errors);
		}
	};

	return Plimage;
});