(function($){
    $.shuffle = arr => {
        for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }
})(jQuery);

/**
 * Created by jychoi on 2017. 1. 5.jeju-1.0.0
 * Customized by ggobp on 2020. 10. 26.
 *
 **/
(function ($) {

    'use strict';

    $.fn.SVkeyboard = $.SVkeyboard = $.svk = {  // namespace define & to easy use alias define

        //  default options stored object
        //  To protect default option data from abusing
        _defaults: () => {

            var _defaultSecure = false,
                _defaultEncrypt = false,
                _defaultKey = 'abcdefghijklmnopqrstuvwxyz123456',    // 32bit secure key
                keyboard = {
                    options: {
                        secure: _defaultSecure,
                        secureKey: _defaultKey,
                        encrypt: _defaultEncrypt
                    }
                };
            return keyboard;

        },

        //  public methods
        //
        //  init(randomOption)
        //  this method initializes keyboard
        //
        //  @parameter
        //  userOptions(Object) : if user want to change options (ex. randomized keypad layout)
        //                        you write parameters that want to change
        //
        //  @return
        //  (String) : current keyboard initialized option

        init: function (userOptions, $outputDom , $inputPad) {

            // user options and default options are merged, by this line.
            var options = $.extend({}, this._defaults().options, userOptions),
                layouts = this._defaults().layouts,
                prevEvent = null,                                               // previous touch event
                encrypted,
                state = false,
                state2 = false,
                generatedHTML,                                                  // html tags composing keyboard layout
                $body = $('body');

            // 더블탭 방지
            $body.off('touchstart').on('touchstart', function (event) {

                // touch start time - previous touch start time < 200ms
                if (event.timeStamp - prevEvent < 200) {
                    event.preventDefault();
                }
                prevEvent = event.timeStamp;

            });

            // 키보드 랜덤 레이아웃
            function keyShuffle($keys) {
                var keys = [];
                $keys.each((index, item) => {
                    keys.push(item.innerText);
                });

                $.shuffle(keys);

                $keys.each((index, item) => {
                    item.innerText = keys[index];
                });
            }

            if (options.secure) {
                keyShuffle($('.num'));
            }

            if($inputPad) {
                if($inputPad.hasClass('rnnKeyboard')) {
                    // 주민등록번호 키패드를 클릭할 시 동작
                    $('.rnnKeyboard > .rnn-pad').on('click', function () {

                        var $this = $(this),
                            currentText,
                            character = this.innerText;

                        var $form;

                        if($outputDom.first().val().length < $outputDom.first().attr('maxlength')) {
                            $form = $outputDom.first();
                        } else {
                            $form = $outputDom.last();
                        }

                        if ($this.hasClass('reset')) {
                            currentText = $form.val();
                            $form.val(currentText.substr(currentText.length));
                            return;
                        }

                        if ($this.hasClass('done')) {
                            return;
                        }

                        if ($this.hasClass('enter')) {
                            character = '\n';
                        }

                        if ($this.hasClass('del')) {
                            if($form.val().length == 0){
                                $form = $outputDom.first();
                            } else if ($outputDom.first().val().length >= $outputDom.first().attr('maxlength')) {
                                $form = $outputDom.last();
                                var $hidden = $('.rrn-back-hidden');
                                currentText = $hidden.val();
                                $hidden.val(currentText.substr(0, currentText.length - 1));
                            }
                            currentText = $form.val();
                            $form.val(currentText.substr(0, currentText.length - 1));

                            return;
                        }

                        if($outputDom.last().val().length >= $outputDom.last().attr('maxlength')) {
                            return;
                        }

                        // 문자 입력
                        $form.val($form.val() + character);

                        if($outputDom.last().val().length == 1) {
                            var $hidden = $('.rrn-back-hidden');
                            $hidden.val($hidden.val() + character);
                        }
                        if($outputDom.last().val().length > 1) {
                            var $hidden = $('.rrn-back-hidden');
                            $hidden.val();
                        }

                        if (options.encrypt) {
                            encrypted = _encrypt($form.val(), options.secureKey);
                            // test case #1
                            $('.tv').val('encode value = ' + encrypted);
                            encrypted = _decrypt(encrypted, options.secureKey);
                            // test case #2
                            $('.tv2').val('decode value = ' + encrypted);
                        }
                    });
                }

                if($inputPad.hasClass('numKeyboard')) {
                    // 주민등록번호 키패드를 클릭할 시 동작
                    $('.numKeyboard > .num-pad').on('click', function () {

                        var $this = $(this),
                            currentText,
                            character = this.innerText;

                        var $form;
                        var formIndex;

                        for (formIndex = 0; formIndex < $outputDom.length; formIndex++) {
                            if($outputDom.eq(formIndex).val().length < $outputDom.eq(formIndex).attr('maxlength')) {
                                $form = $outputDom.eq(formIndex);
                                break;
                            }
                        }

                        if ($this.hasClass('reset')) {
                            currentText = $form.val();
                            $form.val(currentText.substr(currentText.length));
                            return;
                        }

                        if ($this.hasClass('done')) {
                            return;
                        }

                        if ($this.hasClass('enter')) {
                            character = '\n';
                        }

                        if ($this.hasClass('del')) {
                            if($form.val().length == 0){
                                $form = $outputDom.eq(formIndex - 1);
                            }

                            currentText = $form.val();
                            $form.val(currentText.substr(0, currentText.length - 1));

                            return;
                        }

                        if($outputDom.last().val().length >= $outputDom.last().attr('maxlength')) {
                            return;
                        }

                        // 문자 입력
                        $form.val($form.val() + character);

                        if (options.encrypt) {
                            encrypted = _encrypt($form.val(), options.secureKey);
                            // test case #1
                            $('.tv').val('encode value = ' + encrypted);
                            encrypted = _decrypt(encrypted, options.secureKey);
                            // test case #2
                            $('.tv2').val('decode value = ' + encrypted);
                        }
                    });
                }
            }

            // 하이브리드 숫자 키패드를 클릭할 시 동작
            $('.hybridNumKey').on('click', function () {

                var $this = $(this),
                    currentText,
                    $form = $('.hybridField'),
                    character = this.innerText;

                if ($this.hasClass('del')) {
                    currentText = $form.val();
                    $form.val(currentText.substr(0, currentText.length - 1));
                    return;
                }

                if ($this.hasClass('enter')) {
                    character = '\n';
                }

                if ($this.hasClass('shiftfield')) {
                    $('.hybridNumPad').hide();
                    $('.hybridCharPad').show();
                    return;
                }

                // Add the character
                $form.val($form.val() + character);

                if (options.encrypt) {
                    encrypted = _encrypt($form.val(), options.secureKey);
                    // test case #1
                    $('.tv').val('encode value = ' + encrypted);
                    encrypted = _decrypt(encrypted, options.secureKey);
                    // test case #2
                    $('.tv2').val('decode value = ' + encrypted);
                }
            });

            // 하이브리드 문자 키패드를 클릭할 시 동작
            $('.hybridCharKey').on('click', function () {

                var $this = $(this),
                    currentText,
                    $form = $('.hybridField'),                      // event.target is clicked input
                    character = this.innerText;

                if ($this.hasClass('shift')) {
                    $('.hybridCharKey > span > span').toggleClass('upper');
                    return;
                }

                if ($this.hasClass('local')) {
                    $('.hybridCharKey > span').toggleClass('kr');
                    state = true;
                    return;
                }

                if ($this.hasClass('del')) {
                    currentText = $form.val();
                    $form.val(currentText.substr(0, currentText.length - 1));
                    return '';
                }

                if ($this.hasClass('shiftfield')) {
                    $('.hybridCharPad').hide();
                    $('.hybridNumPad').show();
                    return;
                }

                if ($this.hasClass('space')) {
                    character = ' ';
                }

                if ($this.hasClass('enter')) {
                    character = '\n';
                }

                // Add the character
                $form.val($form.val() + character);
                $form.val(Hangul.assemble($form.val()));

                if (options.encrypt) {
                    encrypted = _encrypt($form.val(), options.secureKey);
                    // test case #1
                    $('.tv').val('encode value = ' + encrypted);
                    encrypted = _decrypt(encrypted, options.secureKey);
                    // test case #2
                    $('.tv2').val('decode value = ' + encrypted);
                }
            });

            return 'keyboard initialized [ shuffle : ' + options.secure + ' ]';
        }
    };

    //
    //    _encrypt = (input, key)
    //
    //    read input field's string and encrypt it using AES key value
    //
    //    @parameter
    //    input(String)         : input field's data
    //    key(String)           : AES key (32bit)
    //
    //    @return
    //    input(String)         : encrypted input data is returned
    //
    var _encrypt = (input, key) => {
        input = GibberishAES.aesEncrypt(input, key);
        return input;
    };


    //
    //    _decrypt = (input, key)
    //
    //    read encrypted field's string and decrypt it using AES key value
    //
    //    @parameter
    //    input(String)         : input encrypted field's data
    //    key(String)           : AES key (32bit)
    //
    //    @return
    //    input(String)         : decrypted input data is returned
    //
    var _decrypt = (input, key) => {
        input = GibberishAES.aesDecrypt(input, key);
        return input;
    };

})(jQuery);
