/**
 * Password checker attaches to password inputs and show the user a basic
 * strength meter.
 *
 * Strength is configurable, by default requiring a minimum of 8 characters,
 * at least one lowercase, at least 1 uppercase and at least 1 number
 *
 * When the user types in the password field the meter will update showing the
 * current strength.
 *
 * Here's an example:
 * $('#password_input').passwordChecker();
 *
 * The available settings are as follows:
 *
 * displayRequirements: display the requirements for a strong password to the user
 * minimumCharacters: the minimum number of characters required
 * lowercaseCharacters: the minimum lowercase characters required
 * uppercaseCharacters: the minimum uppercase characters required
 * numbers: the minimum numbers required
 * specialCharacters: the minimum special characters required
 *
 * Here's an example with some settings:
 * $('#password_input').passwordChecker({minimumCharacters: 10, numbers: 3, specialCharacters: 1});
 *
 * Copyright (c) 2014 Ben Levy
 * Released under the MIT License
 *
 */

(function($){
	$.fn.passwordChecker = function( options ) {
		var settings = $.extend({
			'displayRequirements': true,
			'minimumCharacters': 8,
			'lowercaseCharacters': 1,
			'uppercaseCharacters': 1,
			'numbers': 1,
			'specialCharacters': 0
			}, options );

		var plugin = $.extend({

			'attachedTo': function(element){
				this.attachedTo = element;
			},

			'attachChecker': function(){
				var strengthChecker = $('<div>').addClass('passwordChecker').text('Password checker');
				this.attachedTo.after(strengthChecker);
			},

			'updateChecker': function(){
				var checker = this.attachedTo.next();
				checker.removeClass();
				checker.text(this.currentStrength);
				checker.addClass('passwordChecker');
				checker.addClass('passwordChecker' + this.currentStrength);
			},

			'isRequired': function(requirement){
				return (settings[requirement] > 0);
			},

			'resetRequirements': function (){
				this.requirements = 0;
			},

			'incrementRequirements': function (){
				this.requirements++;
			},

			'totalRequirements': function(){
				return this.requirements;
			},

			'requirements': function(){
				this.resetRequirements();
				var requirements = [];

				if(this.isRequired('minimumCharacters')){
					this.incrementRequirements();
					requirements.push(settings.minimumCharacters + ' or more characters in total');
				}
				if(this.isRequired('lowercaseCharacters')){
					this.incrementRequirements();
					requirements.push(settings.lowercaseCharacters + ' or more lowercase characters');
				}
				if(this.isRequired('uppercaseCharacters')){
					this.incrementRequirements();
					requirements.push(settings.uppercaseCharacters + ' or more uppercase characters');
				}
				if(this.isRequired('numbers')){
					this.incrementRequirements();
					requirements.push(settings.numbers + ' or more numbers');
				}
				if(this.isRequired('specialCharacters')){
					this.incrementRequirements();
					requirements.push(settings.specialCharacters + ' or more special characters');
				}
				if(settings.displayRequirements == true){
					var requirements = 'For this system a strong password requires: ' + requirements.join(', ');
					var checker = this.attachedTo.next();
					checker.attr('title', requirements);
					checker.css('cursor', 'help');
					checker.text(checker.text() + ' - ' + requirements);
				}

			},

			'calculateStrength': function(current){
				var score = 0;
				if(this.isRequired('minimumCharacters')){
					if(current.length >= settings.minimumCharacters){
						score++;
					}
				}
				if(this.isRequired('lowercaseCharacters')){
					if(this.checkRequirement(current, '[a-z]', settings.lowercaseCharacters)){
						score++;
					}
				}

				if(this.isRequired('uppercaseCharacters')){
					if(this.checkRequirement(current, '[A-Z]', settings.uppercaseCharacters)){
						score++;
					}
				}

				if(this.isRequired('numbers')){
					if(this.checkRequirement(current, '[0-9]', settings.numbers)){
						score++;
					}
				}
				if(this.isRequired('specialCharacters')){
					if(this.checkRequirement(current, '[^a-zA-Z0-9]', settings.specialCharacters)){
						score++;
					}
				}
				this.translateStrength(score);
			},

			'translateStrength': function(score){
				var percent = ((score / this.totalRequirements()) * 100);
				if(percent == 100){
					this.currentStrength = 'Strong';
				}else if(percent > 66){
					this.currentStrength = 'Medium';
				}else if(percent > 33){
					this.currentStrength = 'Normal';
				}else{
					this.currentStrength = 'Weak';
				}
			},

			'checkRequirement': function(current, requirement, number){
				var regex = new RegExp(requirement, 'g');
				var matches = current.match(regex);
				if(matches != null && matches.length >= number){
					return true;
				}
				return false;
			}
		});


		return this.each(function() {
			plugin.attachedTo($(this));
			plugin.attachChecker();
			plugin.requirements();
			$(this).keyup(function(){
				plugin.calculateStrength($(this).val());
				plugin.updateChecker();
			});

		});

	};

}( jQuery ));