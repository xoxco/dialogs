# Dialogs.js

Easy to use dialog boxes for HTML5 applications.

Dialogs uses Bootstrap-compatible markup, meaning it should play nicely with Bootstrap and Bootstrap-compatible CSS libraries like Flat UI.

[View Demo](http://xoxco.com/projects/code/dialogs/demo.html)

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


### Interacting with Dialogs

```
var dialog = new Dialog('Hello');

// close a dialog
dialog.close();

// open a dialog
dialog.open();

// re-center a dialog
dialog.center();

// hide but do not close a dialog
dialog.hide();

// show a hidden dialog
dialog.show();
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

### Chaining Dialogs

One dialog can open another dialog, and those dialogs become inherently "chained" to one another. Child dialogs will have a back button which will lead to their parent dialogs, and closing a child dialog will cause the parent dialog to reopen. Similarly, closing a parent dialog will close all child dialogs.

This is helpful when creating multi-stage interactions that may require the user to navigate forward and backwards through several steps.

Chained dialogs are created using the .dialog() method on an existing dialog:

```
var dialog = new Dialog("Let's take the next step",['Next']);
$(dialog).on('next',function() {
	var step2 = this.dialog('This is step 2!',['back']);
});
```

Since the default behavior of a child dialog is to open its parent as if the back button had been clicked, an additional method, .done(), is provided to close the child and all parent dialogs in the chain.
```
var dialog = new Dialog("Let's take the next step",['Next']);
$(dialog).on('next',function() {
	var step2 = this.dialog('This is step 2!',['back','Done']);
	$(step2).on('done',function() { this.done(); }); // causes all dialogs to close
});
```