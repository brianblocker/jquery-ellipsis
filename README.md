#ellipsis
========

*Version: 0.1.0*

*Author: Brian Blocker - @brianblocker*


A jQuery plugin that will take a string and put an ellipsis on the front, middle, or end of it. Other ellipsis plugins have lots of options. One day this one will, too.

The biggest use-case for this ellipsis plugin is when you want the ellipsis to be in the _middle_ of the string.

Please note that this plugin currently only cares about the length of the string, having nothing to do with height or style of the parent.


##Requirements and Dependencies
* jQuery 1.9 is tested, however should work fine all the way back to 1.8, and up to 2.0+
* An understanding of selectors
* An understanding of JavaScript objects


##Installation
Simply include ellipsis.js AFTER jQuery, and you can start using it.


##Usage

###*HTML*
```html
<div>
  <span class="items-that-need-an-ellipsis">This is a string that is too long, so we need to truncate it.</span>
  <span class="items-that-need-an-ellipsis">This is a string that is also too long, so we need to truncate it as well.</span>
  <span class="items-that-need-an-ellipsis">This is yet another string that is too long, so we again need to truncate it.</span>
</div>
```

###*JavaScript*
```javascript
// assuming DOM is ready

var selector = '.items-that-need-an-ellipsis'; // if you don't know what a selector is, please visit jquery.com

var options = {     // a hash of options
  max : 25, // max string length before we use ellipsis. Default: 25
  position : 'END' // 'START'/'MID'/'END' position of the ellipsis. Default: 'END'
}

/**
 *  NOTE: defaults can be overridden by modifying the jQuery.fn.ellipsis.defaults
 **/

$( selector ).ellipsis( options );

/**
 *  NOTE: options can be overridden by html data- attributes. More on this in a few.
 **/

```

###*Result*
```html
<div>
  <span class="items-that-need-an-ellipsis" data-before_ellipsis="This is a string that is too long, so we need to truncate it.">
    This is a string that is ...
  </span>
  <span class="items-that-need-an-ellipsis" data-before_ellipsis="This is a string that is also too long, so we need to truncate it as well.">
    This is a string that is ...
  </span>
  <span class="items-that-need-an-ellipsis" data-before_ellipsis="This is yet another string that is too long, so we again need to truncate it.">
    This is yet another strin...
  </span>
</div>
```

Nifty.

###*Overriding Options*
It's possible to override the passed options for a specific element.

```html
<div>
  <span class="items-that-need-an-ellipsis" data-max="10">This is a string that is too long, so we need to truncate it.</span>
  <span class="items-that-need-an-ellipsis" data-max="15" data-position="start">This is a string that is also too long, so we need to truncate it as well.</span>
  <span class="items-that-need-an-ellipsis">This is yet another string that is too long, so we again need to truncate it.</span>
</div>
```

###*Same JavaScript*
```javascript

var selector = '.items-that-need-an-ellipsis'
,   options = {
      max : 25,
      position : 'END'
    };

$( selector ).ellipsis( options );

```

###*Result*
```html
<div>
  <span class="items-that-need-an-ellipsis" data-max="10" data-before_ellipsis="This is a string that is too long, so we need to truncate it.">
    This is a ...
  </span>
  <span class="items-that-need-an-ellipsis"  data-max="15" data-position="start" data-before_ellipsis="This is a string that is also too long, so we need to truncate it as well.">
    ...ate it as well.
  </span>
  <span class="items-that-need-an-ellipsis" data-before_ellipsis="This is yet another string that is too long, so we again need to truncate it.">
    This is yet another strin...
  </span>
</div>
```

Nifty.

The 'position' option is NOT case-sensitive. It also tries to intelligently figure out what you're trying to do in the event you pass in invalid options, such as 'beginning' or 'center.' Basically if the option is not beginning/start-ish or middle/center-ish, it will put the ellipsis on the end.