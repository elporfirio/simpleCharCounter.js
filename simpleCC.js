(function ($) {
    "use strict";
    $.fn.simpleCharCounter = function (options) {
        var settings = $.extend({
                max: 140,
                color: '#000',
                warnColor: '#F00',
                label: '',
                threshold: 0.2,
                displayMode: 'normal',
                onEmpty: 'none',
                legend: 'chars left',
                strictText: false
            }, options),

            self = this,
            validElement = false,

            labelElement = ('' === settings.label) ? $('<div></div>') : $(settings.label),

            //Private Methods

            validate =function($input){
                validElement = $input.val().length <= settings.max;
            },

            updateCount = function (inputlength) {
                var charsLeft = ( settings.max - inputlength );
                labelElement.text(charsLeft + ' ' + settings.legend)
                    .css('color', (charsLeft < (settings.max * settings.threshold)) ? settings.warnColor : settings.color);

                return (charsLeft > 0);
            },

            verifyTextLimit = function ($input) {
                if (settings.strictText) {
                    if ($input.val().length > settings.max) {
                        var $short = $input.val().substr(0, settings.max);
                        $input.val($short);

                        validate($input);
                        return false;
                    }
                }
                validate($input);
                return true;
            },

            updateAndVerify = function(element){
                updateCount(element.val().length);
                verifyTextLimit(element);
            };

            //Public Methods
            self.isValid = function(){
                return validElement;
            };

            return $(this).each(function () {
                var $current = $(this);

                $current.after(labelElement);
                switch (settings.displayMode) {
                    case 'normal':
                        updateCount($current.val().length);
                        break;
                    case 'write':
                        //nada por hacer, se muestra al comenzar a teclear
                        break;
                    default:
                        updateCount($current.val().length);
                        break;
                }

                $current.keydown(function (e) {
                    if ($.inArray(e.keyCode, [8, 35, 36, 37, 38, 39, 40]) === -1) {
                        return updateCount($current.val().length);
                    }
                    return true;
                });
            }).on('focus', function () {
                if (settings.displayMode !== 'write') {
                    updateCount($(this).val().length);
                }
            }).on('change keydown keyup', function () {
                updateAndVerify($(this));
            });
        };
    }(jQuery));