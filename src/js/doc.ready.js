/*!***************************************************************************
 *****************************************************************************
 **
 ** Filename    : doc.ready.js
 **
 *****************************************************************************
 ****************************************************************************/
(function () {
    'use strict';

    // Utilize JQuery to verify that the page is ready
    $( document ).ready(function() {
        console.log( 'doc.ready.js - website is now ready to be displayed!' );
        $( '.stateDisplay' ).css( 'visible', 'true' );
    });

}());

/*****************************************************************************
 ** END OF FILE - doc.ready.js
 ****************************************************************************/