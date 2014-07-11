jquery-password-checker
=======================

Password checker attaches to password inputs and show the user a basic
strength meter.

Strength is configurable, by default requiring a minimum of 8 characters,
at least one lowercase, at least 1 uppercase and at least 1 number

When the user types in the password field the meter will update showing the
current strength.

Here's an example:
$('#password_input').passwordChecker();

The available settings are as follows:

displayRequirements: display the requirements for a strong password to the user
minimumCharacters: the minimum number of characters required
lowercaseCharacters: the minimum lowercase characters required
uppercaseCharacters: the minimum uppercase characters required
numbers: the minimum numbers required
specialCharacters: the minimum special characters required

Here's an example with some settings:
$('#password_input').passwordChecker({minimumCharacters: 10, numbers: 3, specialCharacters: 1});

Copyright (c) 2014 Ben Levy
Released under the MIT License