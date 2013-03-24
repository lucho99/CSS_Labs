var card = {
	oppened: false,
	flipped: false,
	inProgress: false,

	regions: {
		card: {
			container: ".card",
			front: ".card-front",
			inside: ".card-inside",
			back: ".card-back"
		},
		buttons: {
			open: ".buttons .open",
			close: ".buttons .close",
			flip: ".buttons .flip"
		}
	},

	_init: function() {
		var self = this;

		$(this.regions.buttons.open).bind("click", function() {
			self.open();
		});
		$(this.regions.buttons.close).bind("click", function() {
			self.close();
		});
		$(this.regions.buttons.flip).bind("click", function() {
			self.flip();
		});
	},
	open: function() {
		var self = this;

		if (!this.oppened && !this.flipped && !this.inProgress) {
			$(this.regions.card.front).css({
				"-webkit-transform": "rotateX(85deg)"
			});
			this.oppened = true;
			this.inProgress = true;
			$(this.regions.card.front).on('webkitTransitionEnd', function() {
				$(self.regions.card.front).off('webkitTransitionEnd');
				self.inProgress = false;
			});
		}
	},
	close: function() {
		var self = this;

		if (this.oppened && !this.flipped && !this.inProgress) {
			$(this.regions.card.front).css({
				"-webkit-transform": "rotateX(0deg)"
			});
			this.oppened = false;
			this.inProgress = true;
			$(this.regions.card.front).on('webkitTransitionEnd', function() {
				$(self.regions.card.front).off('webkitTransitionEnd');
				self.inProgress = false;
			});
		}
	},
	flip: function() {
		var self = this;

		if (!this.flipped && !this.inProgress) {
			$(this.regions.card.container).css({
				"-webkit-transition": ".5s",
				"-webkit-transform": "rotateY(90deg)"
			});
			this.flipped = true;
			this.inProgress = true;
			$(this.regions.card.container).on('webkitTransitionEnd', function() {
				$(self.regions.card.container).off('webkitTransitionEnd');
				if (self.flipped) {
					$(self.regions.card.front).hide();
					$(self.regions.card.inside).hide();
				}
				$(self.regions.card.container).css({
					"-webkit-transition": ".5s",
					"-webkit-transform": "rotateY(180deg)"
				});
				$(self.regions.card.container).on('webkitTransitionEnd', function() {
					$(self.regions.card.container).off('webkitTransitionEnd');
					self.inProgress = false;
				});
			});
		}
		else if (!this.inProgress) {
			$(this.regions.card.container).css({
				"-webkit-transition": ".5s",
				"-webkit-transform": "rotateY(90deg)"
			});
			this.flipped = false;
			this.inProgress = true;
			$(this.regions.card.container).on('webkitTransitionEnd', function() {
				$(self.regions.card.container).off('webkitTransitionEnd');
				if (!self.flipped) {
					$(self.regions.card.front).show();
					$(self.regions.card.inside).show();
				}
				$(self.regions.card.container).css({
					"-webkit-transition": ".5s",
					"-webkit-transform": "rotateY(0deg)"
				});
				$(self.regions.card.container).on('webkitTransitionEnd', function() {
					$(self.regions.card.container).off('webkitTransitionEnd');
					self.inProgress = false;
				});
			});
		}
	}
}