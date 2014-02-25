(function ( $ )
{
    $.fn.simpleCharCounter = function( options )
    {
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
        }, options);
        
        var labelElement = ('' === settings.label) ? $('<div></div>') : $(settings.label);
        
        var updateCount = function(e, length)
        {
            var charsLeft = ( settings.max - length );
            labelElement.text( charsLeft + ' ' + settings.legend )
                        .css('color', (charsLeft < (settings.max*settings.threshold)) ? settings.warnColor : settings.color );

            return (charsLeft > 0);
        }
        
        var verifyTextLimit = function (input, text)
        {
            if(settings.strictText){
                if(text.length > settings.max){
                    var $text = $(input).val();
                    var $short = $text.substr(0, settings.max);
                    $(input).val($short);
                }
            }
        }
        
        return this.each(function()
        {
            $(this).after(labelElement);
            
            switch(settings.displayMode){
                case 'normal':
                    updateCount(this, $(this).val().length);
                    break;
                case 'write':
                    //nada por hacer, se muestra al comenzar a teclear
                    break;
                default:
                    updateCount(this, $(this).val().length);
                    break;
            }
            
            $(this).keydown(function(e)
            {
                    console.log(e);
                if ($.inArray(e.keyCode,[8,35,36,37,38,39,40]) === -1)
                {
                    return updateCount(this, $(this).val().length);
                }else
                {
                    return true;
                }
            });
        }).focus(function(){
            if(settings.displayMode != 'write'){
                updateCount(this, $(this).val().length);
            }
        }).change(function(){
            updateCount(this, $(this).val().length);
            verifyTextLimit(this, $(this).val());
        }).keydown(function(){
            updateCount(this, $(this).val().length);
            verifyTextLimit(this, $(this).val());
        }).keyup(function(e){
            updateCount(this, $(this).val().length);
            verifyTextLimit(this, $(this).val());
        })
    };
}( jQuery )) ;