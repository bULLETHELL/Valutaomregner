$(document).ready(function(){
    var currencyopt_html = "";
    var selected_option = $('#toCurrencyDropdown option:selected').val();
    
    var getXMLFile = function(path, callback){
        var request = new XMLHttpRequest();
        request.open("GET", path, true);
        request.setRequestHeader("Content-Type", "text/xml");
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                callback(request.responseXML);
            }
        };
        request.send();
    };

    getXMLFile("rates.xml", function(xml){
        var c = xml.getElementsByTagName('currency');

        //console.log(c);
        //console.log(c.length);

        for (var i = 0; i < c.length; i++){
            currencyopt_html += `
                            <option>
                                ` + c[i].attributes[1].nodeValue + ` 
                            </option>
            `;
        }
        $("#toCurrencyDropdown").html(currencyopt_html);
    });
    
    document.getElementById("inputDkk").addEventListener('keypress', function(evt){
        var ch = String.fromCharCode(evt.which);
        // Only allow numeric values as input
        if(!(/[0-9]/.test(ch))){
            evt.preventDefault();
        }
    });

    document.getElementById("inputDkk").addEventListener('input', function(evt){

        selected_option = $('#toCurrencyDropdown option:selected').val();

        //console.log(selected_option);
        
        getXMLFile("rates.xml", function(xml){
            var c = xml.getElementsByTagName('currency');

            for(var i = 0; i < c.length; i++){
                if(c[i].attributes[1].nodeValue === selected_option){
                    document.getElementById('currencyflagdiv').className = "currency-flag currency-flag-lg currency-flag-" + c[i].attributes[0].nodeValue.toLowerCase();
                    var rate = parseInt(c[i].attributes[2].nodeValue);
                    //console.log(rate);
                    var initVal = parseInt(document.getElementById('inputDkk').value);
                    //console.log(initVal);
                    var convVal = initVal / rate * 100;
                    //console.log(convVal);
                    document.getElementById('outputCurr').value = convVal;
                }
            }
        });
    });

    document.getElementById("toCurrencyDropdown").addEventListener('change', function(evt){
        selected_option = $('#toCurrencyDropdown option:selected').val();

        //console.log(selected_option);
        
        getXMLFile("rates.xml", function(xml){
            var c = xml.getElementsByTagName('currency');

            for(var i = 0; i < c.length; i++){
                if(c[i].attributes[1].nodeValue === selected_option){
                    document.getElementById('currencyflagdiv').className = "currency-flag currency-flag-lg currency-flag-" + c[i].attributes[0].nodeValue.toLowerCase();
                    var rate = parseFloat(c[i].attributes[2].nodeValue);
                    //console.log(rate);
                    var initVal = parseFloat(document.getElementById('inputDkk').value);
                    //console.log(initVal);
                    var convVal = initVal / rate * 100;
                    //console.log(convVal);
                    document.getElementById('outputCurr').value = convVal;
                }
            }
        });
    });
});