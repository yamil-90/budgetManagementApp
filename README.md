# Budget Management App

with this app you can add your day to day expenses and it will keep track of how much of your budget is available and spent.

* the budget and expenses are saved with asyncStorage
* the expenses can be edited, deleted and filtered
* all data can be reset to re-use the app

# Screenshots

![screenshot1](https://github.com/yamil-90/budgetManagementApp/blob/main/assets/screenshots/screenshot1.png?raw=true)
![screenshot2](https://github.com/yamil-90/budgetManagementApp/blob/main/assets/screenshots/screenshot2.png?raw=true)
![screenshot3](https://github.com/yamil-90/budgetManagementApp/blob/main/assets/screenshots/screenshot3.png?raw=true)

# Technologies

* @react-native-async-storage/async-storage: "^1.15.14",
* @react-native-picker/picker: "react-native-picker/picker",
* intl: "^1.2.5",
* jsc-android: "^250230.2.1",
* react: "17.0.2",
* react-native: "0.66.4",
* react-native-circular-progress: "^1.3.7",
* react-native-svg: "^12.1.1"
  
# installation

* download/ clone the repo

      yarn install

  then you can test it with 

      react-native start 

  and on a second terminal 

      react-native run-android

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