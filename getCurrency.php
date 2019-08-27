<?php
$xml = simplexml_load_file("http://www.nationalbanken.dk/_vti_bin/DN/DataService.svc/CurrencyRatesXML?lang=da");
$dom = new DOMDocument;
$dom->loadXML($xml);
$dom->save('rates.xml')
?>