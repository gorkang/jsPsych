/** 
 * jspsych-call-function
 * plugin for calling an arbitrary function during a jspsych experiment
 * Josh de Leeuw
 * 
 * documentation: https://github.com/jodeleeuw/jsPsych/wiki/jspsych-call-function
 * 
**/

(function($) {
    jsPsych['call-function'] = (function() {

        var plugin = {};

        plugin.create = function(params) {
            var trials = new Array(1);
            trials[0] = {
                "func": params.func,
                "args": params.args || []
            };
            return trials;
        };

        plugin.trial = function(display_element, block, trial) {
            var return_val = trial.func.apply({}, [trial.args]);
            if (typeof return_val !== 'undefined') {
                block.writeData($.extend({},{
                    value: return_val
                },trial.data));
            }

            block.next();
        };

        return plugin;
    })();
})(jQuery);
