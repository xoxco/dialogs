# Dialogs.js

Easy to use dialog boxes for HTML5 applications.

## Usage

*Basic usage:*
Open a dialog box with a message and a simple "OK" button that closes the dialog.

```
var dialog = new Dialog('Hello!');
```

*Custom Buttons:*

One or more buttons can be added to a dialog by passing in an array describing said buttons.
Simple buttons can be specified with a label only, though information such as additional CSS classes and default click-handlers can be provided as well.


```
// specify label-only buttons:
var dialog = new Dialog('Hello!',['Yes','No']);

// specify button details:
var dialog = new Dialog('Hello!',[
	{
		label: 'Yes',
		class: 'btn-primary',
		click: function() { ... }
	},
	{
		label: 'No',
		click: function() { ... }
	},
]);
```

*Common Button Shortcodes:*

Dialogs.js includes a few common buttons that can be specified using simple labels, but which will result in more fully functional buttons.

'ok' - results in a button with an "OK" label that, when clicked, closes the dialog.
'cancel' - results in a button with "Cancel" label that, when clicked, closes the dialog.
'back' - results in a button with "< Back" label that, when clicked, will go back to the previous dialog in the chain.

*Mixing Button Types*

You can do this. Its OK!

```
var dialog = new Dialog('Hello!',[
	{
		label: Yes,
		class: 'btn-primary',
		click: function() { ... }
	},
	'No',
	'cancel'
]);

*Options*



	