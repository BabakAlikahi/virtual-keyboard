// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "jkeyboard",
        defaults = {
            layout: "korean",
            selectable: ['korean', 'english'],
            input: $('#input'),
            customLayouts: {
                selectable: []
            },
        };


    var function_keys = {
        backspace: {
            text: '&nbsp;',
        },
        backspace1:{
            text:'&nbsp'
        },
        return: {
            text: 'Enter'
        },
        shift: {
            text: '&nbsp;',
        },
        space: {
            text: '&nbsp;'
        },
        tab: {
            text: 'tab'
        },
        close: {
            text: 'Done / 입력완'
        },
        numeric_switch: {
            text: '123',
            command: function() {
                this.createKeyboard('numeric');
                this.events();
            }
        },
        layout_switch: {
            text: 'En / 한',
            command: function() {
                var l = this.toggleLayout();
                this.createKeyboard(l);
                this.events();
                $('.letter').on('click', function() {
                    var value = $('#text_number_input').val();
                    var value1 = value.innerText = Hangul.assemble(value);
                    $('#text_number_input').val(value1);
                })
                $('#text_number_input').focus();
            }
        },
        character_switch: {
            text: 'ABC',
            command: function() {
                this.createKeyboard(layout);
                this.events();
                $('.letter').on('click', function() {
                    var value = $('#text_number_input').val();
                    var value1 = value.innerText = Hangul.assemble(value);
                    $('#text_number_input').val(value1);
                })
            }
        },
        symbol_switch: {
            text: '#+=',
            command: function() {
                this.createKeyboard('symbolic');
                this.events();
            }
        },
        cap: {
            text: 'cap',
            command: function() {
                this.createKeyboard('cap');
                this.events();
                $('.letter').on('click', function() {
                    var value = $('#text_number_input').val();
                    var value1 = value.innerText = Hangul.assemble(value);
                    $('#text_number_input').val(value1);
                })
                $('#text_number_input').focus();
            }
        },
        cap1: {
            text: 'cap',
            command: function() {
                this.createKeyboard('english');
                this.events();
                $('.letter').on('click', function() {
                    var value = $('#text_number_input').val();
                    var value1 = value.innerText = Hangul.assemble(value);
                    $('#text_number_input').val(value1);
                })
                $('#text_number_input').focus();
            }
        },
        cap2: {
            text: 'cap',
            command: function() {
                this.createKeyboard('korean1');
                this.events();
                $('.letter').on('click', function() {
                    var value = $('#text_number_input').val();
                    var value1 = value.innerText = Hangul.assemble(value);
                    $('#text_number_input').val(value1);
                })
                $('#text_number_input').focus();
            }
        },
        cap3: {
            text: 'cap',
            command: function() {
                this.createKeyboard('korean');
                this.events();
                $('.letter').on('click', function() {
                    var value = $('#text_number_input').val();
                    var value1 = value.innerText = Hangul.assemble(value);
                    $('#text_number_input').val(value1);
                })
                $('#text_number_input').focus();
            }
        },
        num: {
            text: 'num',
            command: function() {
                this.createKeyboard('numbers_only');
                this.events();
            }
        },
        shift1: {
            text: '&nbsp;',
            command: function() {
                this.createKeyboard('korean');
                this.events();
                $('.letter').on('click', function() {

                    var value = $('#text_number_input').val();
                    var value1 = value.innerText = Hangul.assemble(value);
                    $('#text_number_input').val(value1);
                })
                $('#text_number_input').focus();
            }
        },
        // shift2:{
        //     text: '&nbsp;',
        //     command: function () {
        //         this.createKeyboard('korean1');
        //         this.events();
        //         $('.letter').on('click', function () {
        //             var value = $('#text_number_input').val();
        //             var value1 = value.innerText = Hangul.assemble(value);
        //             $('#text_number_input').val(value1);
        //         })
        //         $('#text_number_input').focus();
        //     }
        // },
        shift2: {
            text: '&nbsp;',
            command: function() {
                this.createKeyboard('korean1');
                this.events();
                $('.letter').on('click', function() {
                    $('.shift1').trigger('click');
                    var value = $('#text_number_input').val();
                    var value1 = value.innerText = Hangul.assemble(value);
                    $('#text_number_input').val(value1);
                });
                $('#text_number_input').focus();
            }
        },
    };


    var layouts = {

        english: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'return'],
            ['tab', 'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
            ['cap', '@', 'layout_switch', 'space', 'close']
        ],
        cap: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'return'],
            ['tab', 'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace'],
            ['cap1', '@', 'layout_switch', 'space', 'close']
        ],
        korean: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
            ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'return'],
            ['tab', 'shift2', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', 'backspace'],
            ['cap2', '@', 'layout_switch', 'space', 'close']
        ],
        korean1: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ'],
            ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'return'],
            ['tab', 'shift1', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', 'backspace'],
            ['cap3', '@', 'layout_switch', 'space', 'close']
        ],
        numbers_only: [
            ['1', '2', '3', '4', '5', ],
            ['6', '7', '8', '9', '0', ],
            ['backspace1', 'close']
        ],
        symbolic: [
            ['[', ']', '{', '}', '#', '%', '^'],
            ['_', '\\', '|', '*', '+', '=', "'"],
            ['.', ',', '?', '!', '~', '<', '>'],
            ['num', 'backspace1'],


        ],
        numeric: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
            ['symbol_switch', '.', ',', '?', '!', "'", 'backspace'],
            ['character_switch', 'layout_switch', 'space', 'return'],
        ],


    }

    var shift = false,
        capslock = false,
        layout = 'english',
        layout_id = 0;

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        // Extend & Merge the cusom layouts
        layouts = $.extend(true, {}, this.settings.customLayouts, layouts);
        if (Array.isArray(this.settings.customLayouts.selectable)) {
            $.merge(this.settings.selectable, this.settings.customLayouts.selectable);
        }
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            layout = this.settings.layout;
            this.createKeyboard(layout);
            this.events();
        },

        setInput: function(newInputField) {
            this.settings.input = newInputField;
        },

        createKeyboard: function(layout) {
            shift = false;
            capslock = false;

            var keyboard_container = $('<ul/>').addClass('jkeyboard'),
                me = this;

            layouts[layout].forEach(function(line, index) {
                var line_container = $('<li/>').addClass('jline');
                line_container.append(me.createLine(line));
                keyboard_container.append(line_container);
            });

            $(this.element).html('').append(keyboard_container);
        },

        createLine: function(line) {
            var line_container = $('<ul/>');

            line.forEach(function(key, index) {
                var key_container = $('<li/>').addClass('jkey').data('command', key);

                if (function_keys[key]) {
                    key_container.addClass(key).html(function_keys[key].text);
                } else {
                    key_container.addClass('letter').html(key);
                }

                line_container.append(key_container);
            })

            return line_container;
        },

        events: function() {
            var letters = $(this.element).find('.letter'),
                shift_key = $(this.element).find('.shift'),
                space_key = $(this.element).find('.space'),
                backspace_key = $(this.element).find('.backspace'),
                backspace1_key = $(this.element).find('.backspace1'),
                return_key = $(this.element).find('.return'),
                tab = $(this.element).find('.tab'),
                close = $(this.element).find('.close'),
                me = this,
                fkeys = Object.keys(function_keys).map(function(k) {
                    return '.' + k;
                }).join(',');

            letters.on('click', function() {
                me.type((shift || capslock) ? $(this).text().toUpperCase() : $(this).text());
            });

            space_key.on('click', function() {
                me.type(' ');
            });
            return_key.on('click', function() {
                me.type("\n");
                me.settings.input.parents('form').submit();
            });
            tab.on('click', function() {
                me.type("   ");
            });
            close.on('click', function() {
                $('.keyboard').fadeOut();
            });
            backspace_key.on('click', function() {
                me.backspace();
            });
            backspace1_key.on('click', function() {
                me.backspace1();
            });
            shift_key.on('click', function() {
                if (shift) {
                    me.toggleShiftOff();

                } else {
                    me.toggleShiftOn();
                }
            }).on('dblclick', function() {
                me.toggleShiftOn(true);
            });
            $(fkeys).on('click', function(e) {
                //prevent bubbling to avoid side effects when used as floating keyboard which closes on click outside of keyboard container
                e.stopPropagation();

                var command = function_keys[$(this).data('command')].command;
                if (!command) return;

                command.call(me);
            });
        },

        type: function(key) {
            var input = this.settings.input,
                val = input.val(),
                input_node = input.get(0),
                start = input_node.selectionStart,
                end = input_node.selectionEnd;

            var max_length = $(input).attr("maxlength");
            if (start == end && end == val.length) {
                if (!max_length || val.length < max_length) {
                    input.val(val + key);
                }
            } else {
                var new_string = this.insertToString(start, end, val, key);
                input.val(new_string);
                start++;
                end = start;
                input_node.setSelectionRange(start, end);
            }

            input.trigger('focus');

            if (shift && !capslock) {
                this.toggleShiftOff();
            }
        },

        backspace: function() {
            var input = this.settings.input,
                input_node = input.get(0),
                start = input_node.selectionStart,
                val = input.val();
            disable = Hangul.disassemble(val).join(''),
                length = disable.length,
                bar = disable.substring(0, length - 1),
                assemble = Hangul.assemble(bar),
                $('#text_number_input').val(assemble);
            $('#text_number_input').focus();
        },
        backspace1: function() {
            var input = this.settings.input,
                input_node = input.get(0),
                start = input_node.selectionStart,
                val = input.val();
            disable = Hangul.disassemble(val).join(''),
                length = disable.length,
                bar = disable.substring(0, length - 1),
                assemble = Hangul.assemble(bar),
                $('#number_input').val(assemble);
            $('#number_input').focus();
        },

        toggleShiftOn: function(lock) {
            var letters = $(this.element).find('.letter'),
                shift_key = $(this.element).find('.shift');

            letters.addClass('uppercase');
            shift_key.addClass('active');
            if (typeof lock !== 'undefined' && lock) {
                shift_key.addClass('lock');
                capslock = true;
            }
            shift = true;

        },

        toggleShiftOff: function() {
            var letters = $(this.element).find('.letter'),
                shift_key = $(this.element).find('.shift');

            letters.removeClass('uppercase');
            shift_key.removeClass('active lock');
            shift = capslock = false;
        },

        toggleLayout: function() {
            layout_id = layout_id || 0;
            var plain_layouts = this.settings.selectable;
            layout_id++;

            var current_id = layout_id % plain_layouts.length;
            return plain_layouts[current_id];
        },

        insertToString: function(start, end, string, insert_string) {
            return string.substring(0, start) + insert_string + string.substring(end, string.length);
        }
    };


    var methods = {
        init: function(options) {
            if (!this.data("plugin_" + pluginName)) {
                this.data("plugin_" + pluginName, new Plugin(this, options));
            }
        },
        setInput: function(content) {
            this.data("plugin_" + pluginName).setInput($(content));
        },
        setLayout: function(layoutname) {
            // change layout if it is not match current
            object = this.data("plugin_" + pluginName);
            if (typeof(layouts[layoutname]) !== 'undefined' && object.settings.layout != layoutname) {
                object.settings.layout = layoutname;
                object.createKeyboard(layoutname);
                object.events();
            };
        },
    };

    $.fn[pluginName] = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this.first(), Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this.first(), arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.jkeyboard');
        }
    };

})(jQuery, window, document);