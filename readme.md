# Dialogs.js

Easy to use dialog boxes for HTML5 applications.

Dialogs uses Bootstrap-compatible markup, meaning it should play nicely with Bootstrap and Bootstrap-compatible CSS libraries like Flat UI.

## Usage
 
```
var dialog = new Dialog($content,[buttons],{options});
```
 
### Basic usage:
Open a dialog box with a message and a simple "OK" button that closes the dialog.

```
var dialog = new Dialog('Hello!');
```

### Custom Buttons:

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

### Common Button Shortcodes:

Dialogs.js includes a few common buttons that can be specified using simple labels, but which will result in more fully functional buttons.

'ok' - results in a button with an "OK" label that, when clicked, closes the dialog.

'cancel' - results in a button with "Cancel" label that, when clicked, closes the dialog.

'back' - results in a button with "< Back" label that, when clicked, will go back to the previous dialog in the chain.

### Mixing Button Types

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
```

### Options

Dialog behavior and appearance can be modified by specifying options.

```
var options = {
	close: true,	// create a close button in the upper right corner
	title: '...',	// specify a title for the dialog
	width: 500,		// specifiy a fixed width for the dialog
	height: 200	// specifiy a fixed height for the dialog. May conflict with some CSS libraries!
}

new Dialog('Hello!',[],options);

```

### Events

Dialogs throw a few handy events, watchable using jQuery's event handling system.

opened - dialog has been created and appended to the DOM and is visible to the user.

closed - dialog has been closed and removed from the DOM.

shown - dialog has been made visible after having been invisible, likely as part of a chain of dialogs

hidden - dialog has been made invisible, likely as part of a chain of dialogs.

```
$(dialog).on('opened',callback);
$(dialog).on('closed',callback);
$(dialog).on('shown',callback);
$(dialog).on('hidden',callback);
```

Dialogs throw 2 events whenever one of the buttons is clicked.

One is a generic "button" event, which will pass a data representation of the clicked button to the callback:
```
$(dialog).on('button',callback(button));
```

The second is a specific event named after the button itself. Dialogs.js will use a tokenized version of the button's label to create the event (IE, "My Cool Button!!" becomes "my_cool_button")

```
var dialog = new Dialog('Hello',["I'm Done","Save Document >"]);
$(dialog).on('im_done',callback);
$(dialog).on('save_document',callback);
```

	