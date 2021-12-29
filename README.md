# Budget Management App



## Issue with toLocaleString not showing the correct currency

If you want to do the locale string formatting without needing to integrate the entire javascript core, Javascript has Internationalization API which lets you format numbers to language sensitive format. Documentation available at MDN

This API is not available in android and needs to be polyfilled using Intl

In your project root, install the Intl library

`yarn add intl`


And then in your project's index file (index.js) add the following code at the top of the file:

`if(Platform.OS === 'android') { // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/en-IN'); // load the required locale details
}`

After doing the above two steps, you can now get locale string anywhere in your project using

`new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(10000000);`

In case you need to format number for another locale code, all the locale code details are available under the intl/locale-data/jsonp/ directory. Simply require the one