/*****
 *  ellipsis v0.1
 *
 *  Author: @brianblocker
 *  (c) CloudPassage, Inc.
 *
 *  Configurable tool to create an ellipsis on the beginning, middle, or end of a string, based on a configurable max char length.
 *****/

( function( $ ) {
  "use_strict";

  $.fn.ellipsis = function( method ) {
    if ( methods[ method ] )
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
    else if ( typeof method === 'object' || ! method )
      return methods.init.apply( this, arguments );
    else
      $.error( method + ' is not a valid argument for ellipsis.' );
  }

  $.fn.ellipsis.defaults = {
    max : 25, // max characters (overridden by data-max attribute on element)
    position : 'end' // START|MID|END position of the ellipsis (overridden by data-position attribute on element)
  }

  var methods = {
    init : function( options ) {
      return this.each( function() {
        var $this = $( this )
        ,   opts = $.extend( {}, $.fn.ellipsis.defaults, options )
        ,   text = $this.text();

        opts.max = determineMax( $this, opts.max );

        if ( text.length <= opts.max )
          return true;

        $this.data( 'before_ellipsis', text );
        opts.position = determinePosition( $this, opts.position );

        text = ellipsenize( text, opts.position, opts.max );

        $this.text( text );
      });
    },
    destroy : function( options ) {
      return this.each( function() {
        var $this = $( this )
        ,   before = $this.data( 'before_ellipsis' );

        if ( before )
          $this.text( before );

        $this.removeData( 'before_ellipsis' );
      });
    }
  }

  function determinePosition( $element, position ) {
    var override = $element.data( 'position' );

    position = override || position;

    if ( /^(sta|beg)/i.test( position ) )
      return 's';

    if ( /^(mid|cen)/i.test( position ) )
      return 'm';

    return 'e';
  }

  function determineMax( $element, max ) {
    return $element.data( 'max' ) || max;
  }

  function ellipsenize( text, position, length ) {
    var handlers = {
      s : function() {
        return '...' + text.substring( text.length - length );
      },
      e : function() {
        return text.substring( 0, length ) + '...';
      },
      m : function() {
        var half = Math.floor( length / 2 )
        ,   beginning = text.substring( 0, half )
        ,   ending = text.substring( text.length - half );

        return beginning + '...' + ending;
      }
    }

    return handlers[ position ]();
  }

})( window.jQuery || window.Zepto );