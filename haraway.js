import { Component, Inject } from 'fd-angular-core';

@Component({
	replace: false,
	restrict: 'A',
	template: false,
	scope: {
		id: '=mrHaraway'
	}
})
@Inject('$element')
class MrHarawayController {

	SUPPORT_RETINA = true;

	ROOT = '//c.assets.sh';

	SIZES = {
		thumb: 220,
		xsmall: 320,
		small: 640,
		medium: 1280,
		large: 2560,
	};

	constructor($element) {
		this.$element = $element;
		this.preload(this._id);
	}

	preload(id) {
		if (!id || !this.$element) {
			return false;
		}

		let img = new Image(),
				url = '',
				preload = () => {
					url = this.versioned(id, this.$element.outerWidth() || (this.$element.outerHeight() / 9 * 16) );

					if (!url) {
						return false;
					}

					this.$element.addClass('is-loading');

					img.onload = () => {
						if (this.$element.is('img')) {
							this.$element.attr('src', url);
						} else {
							this.$element.css('background-image', `url(${url})`);
						}

						this.$element.removeClass('is-loading');
					};

					img.onerror = () => this.$element.removeClass('is-loading');
					img.src = url;
				};

		if (this.$element.is('img')) {
			this.$element.on('load.haraway', () => {
				preload();
				this.$element.off('load.haraway');
			});

			this.$element.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
		} else {
			preload();
		}
	}

	versioned(id, width = 640) {
		let fallback = 'medium';

		if (!id) {
			return false;
		}

		for (let size in this.SIZES) {
			if (width <= this.SIZES[size] || size === 'large') {
				if (this.SUPPORT_RETINA) {
					size = `${size}2x`;
				}

				return `${this.ROOT}/${id}/${size}`;
			}
		}

		return `${this.ROOT}/${id}/${fallback}`
	}

	get id() {
		return this._id;
	}

	set id(value) {
		if (this._id !== value) {
			this._id = value;
			this.preload(this._id);
		}
	}
}
