simpleCharCounter.js
=================

Jquery plugin, simulate the character counter like counter in twitter (old version). See examples and readme for more details.

# Usage #

    $("#target").simpleCharCounter();

# Defaults and Options #

See demo for other basic uses.

    $(".target").simpleCharCounter({
			max: 140,
			color: '#000',
			warnColor: '#F00',
			label: '',
			threshold: 0.2,
			displayMode: 'normal',
			onEmpty: 'none',
			legend: 'chars left',
			strictText: false
	});

**max:** set limit amount of chars to write

**color:** set the basic color for the counter

**warnColor:** set the color when reaching limit of chars

**label:** container for text display

**threshold:** set limit radio of chars (max * threshold)

**displayMode:** available modes `'normal'` the count text appears always, `'write'` the count text appears when the user start to type

**legend:** change the count display text

**strictText:** set to `true`, if you want lock input, when the limit chars is reached (the input / textarea keeps enabled).