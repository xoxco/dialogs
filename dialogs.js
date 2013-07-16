
			// todo
			// test with scrollwheel mouse

// could fire event after transition
// $(".myClass").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
// function() {
 //do something
// });

		
			(function($){
				
				var overlay = null;
				
				window.overlay_manager = (function() {
					return {
						openDialogs: 0,
						tick: function() {
							if (this.openDialogs > 0) {
								if (!$('.dialog_overlay').length) {
									if (!overlay) {
										overlay = $('<div class="dialog_overlay"></div>');							
									}
									$(overlay).appendTo('body');

									
								} else {
									$(overlay).show();
								}							
							} else {
								$(overlay).hide();
							}
							
						}						
						
						
					}
					
				})();
				
				var Dialog = function(content,buttons,options) {
					//console.log('D: ',content);
				
					this.children = [];
					
					this.visible = false;
					
					this.options = $.extend({
						close: true,
						header: true,
						title:'&nbsp;'					
					},options);

					this.buttons = buttons;
												
					if (!this.buttons) {
						this.buttons = [];
						this.buttons.push('ok');
					}
										
					this._buttonShortcodes();					
										
					this.content = content;
					
					this.el = $('<div class="modal"><section><div class="modal-body">'+this.content+'</div></section></div>');
					
					$(this.el).css('position','absolute');
					$(this.el).css('margin',0);
					
					if (this.options.header) {
						this.header = $('<header class="modal-header"/>');
						$('<h3>'+this.options.title+'</h3>').prependTo(this.header);
						if (this.options.close) {
							this.close_button = $('<button class="close">&times;</button>');
							$(this.close_button).prependTo(this.header);
						}
						if (this.options.chained) {
							this.back_button = $('<button class="back"></button>');
							$(this.back_button).prependTo(this.header);
						}
						$(this.el).prepend(this.header);

					}
					
					

					if (this.buttons.length) {
						this.footer = $('<footer class="modal-footer" />');
						
						$(this.el).append(this.footer);
		
						for (var b in this.buttons) {
							
							(function(button,dialog) {	
	
								button.el = $('<button class="btn">'+button.label+'</button>');
								if (button.class) {
									$(button.el).addClass(button.class);
								}
								$(button.el).appendTo(dialog.footer);		
								
							})(this.buttons[b],this);
						}
					}

					if (this.options.width) {
						$(this.el).css('width',this.options.width);
					}

					if (this.options.height) {
						$(this.el).css('height',this.options.height);
					}
										
				
					this.open();
					return this;
				
					}
					
				Dialog.prototype._tokenize = function(str) {
					
					var newstr = str.replace(/<.*?>/ig,'');
					newstr = newstr.toLowerCase();
					newstr = newstr.replace(/^\s+/,'').replace(/\s+$/,'');
					newstr = newstr.replace(/\s+/ig,'_');
					newstr = newstr.replace(/\W/ig,'');
					return newstr;
					
				}	
					
				Dialog.prototype._buttonShortcodes = function() {
					
					for (var b in this.buttons) {
						
						if (typeof(this.buttons[b])=='string') {
							
							switch(this.buttons[b]) {
								
								case 'ok': 
									this.buttons[b] = {
										label: '<span class="fui-check-inverted"></span> OK',
										class:'btn-primary',
										click: function() {
											this.done();
										}
									};
									break;								
								case 'cancel': 
									this.buttons[b] = {
										label: 'Cancel',
										click: function() {
											this.done();
										}
									};
									break;								
								case 'back': 
									this.buttons[b] = {
										label: '<span class="fui-arrow-left"></span> Back',
										click: function() {
											this.back();
										}
									};
									break;
								default: 
									this.buttons[b] = 	{
										label: this.buttons[b]
									};
									break;							
							}
						}
					}
				}
				
				Dialog.prototype.bind = function() {
					for (var b in this.buttons) {
						
						(function(button,dialog) {	
							button.el.on('click',function(e) {
								e.preventDefault();
								$(dialog).triggerHandler('button',button);
								$(dialog).triggerHandler(dialog._tokenize(button.label));
								if (button.click) {
									button.click.call(dialog);
								}
							});			
						})(this.buttons[b],this);
					}					
					if (this.options.header && this.options.close) {
						(function(dialog) {
							dialog.close_button.on('click',function(e) { e.preventDefault(); dialog.close(); });
							if (dialog.back_button) {
								dialog.back_button.on('click',function(e) { e.preventDefault(); dialog.back(); });
							}

						})(this);
					}
					
				}
				
				Dialog.prototype.open = function() {
					
					if (this.options.chained) {
						this.options.parent.hide();
					}
					overlay_manager.openDialogs++;	
					overlay_manager.tick();
				
					$(this.el).appendTo('body');
					this.center();
					this.bind();
					
					this.visible = true;
					
					if (this.options.height) {
						var target_height = this.options.height;
						
						if (this.header) {
							target_height = target_height - $(this.header).outerHeight();
						}						
						if (this.footer) {
							target_height = target_height - $(this.footer).outerHeight();
						}
						
						$(this.el).find('.modal-body').css('max-height',target_height+'px');
					}


					$(this).triggerHandler('opened');
					// focus the primary button
				
				}
				
				Dialog.prototype.dialog = function(content,buttons,options) {
					
					options = $.extend({
						'chained':true,
						'parent':this						
					},options);
					var child = new Dialog(content,buttons,options);
					this.children.push(child);
					return child;
					
				}
				
				Dialog.prototype.center = function() {
										
					$(this.el).css('top',(($(window).height() - $(this.el).outerHeight()) / 2)+$(window).scrollTop());
					$(this.el).css('left',($(window).width() - $(this.el).outerWidth()) / 2);

				}
				
				Dialog.prototype.back = function() {
					this.close();
				}
				
				Dialog.prototype.done = function() {
					this.close();
					if (this.options.parent) {
						this.options.parent.done();
					}
				}
				
				Dialog.prototype.close = function() {
					
					if (!this.visible) { 
						return;
					}
					$(this.el).remove();
					if (this.children.length) {
						for (var c in this.children) {
							this.children[c].close();
						}
					}

					overlay_manager.openDialogs--;
					overlay_manager.tick();	

					this.visible = false;

					if (this.options.chained) {
						this.options.parent.show();
					} else if (this.options.parent) {
						this.options.parent.close();						
					}
					$(this).triggerHandler('closed');

					
				}
				
				Dialog.prototype.hide = function() {
					$(this.el).hide();
					this.visible = false;
					overlay_manager.openDialogs--;
					overlay_manager.tick();	
					$(this).triggerHandler('hidden');

				}
				Dialog.prototype.show = function() {
					overlay_manager.openDialogs++;
					overlay_manager.tick();	

					$(this.el).show();
					this.center();
					this.visible = true;
					$(this).triggerHandler('shown');

				}
				
				
				
				window.Dialog = Dialog;
								
			})(jQuery);
		
