$(document).ready(function() {

    sassText();

    function sassText() {
        var text = ("Den här sidan Gulpar med SASS. Och nu har jag fått dig att stanna kvar tills texten är slut!");
        var delay = 100;
        var elem = $("#one-by-one");

        var addTextByDelay = function(text, elem, delay) {
            if (!elem) {
                elem = $("body");
            }
            if (!delay) {
                delay = 300;
            }
            if (text.length > 0) {
                //append first character 
                elem.append(text[0]);
                setTimeout(
                    function() {
                        //Slice text by 1 character and call function again                
                        addTextByDelay(text.slice(1), elem, delay);
                    }, delay
                );
            }
        }

        addTextByDelay(text, elem, delay);

    }
});