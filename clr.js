! function() {
    
    // good 'ol AJAX
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resources = JSON.parse(xhr.responseText);
            
            // loop over all the "keys" which are the selectors
            
            for (key in resources) {
                
                // check if the selector exists in the DOM
                // or is a truthy object of the window
                
                if (document.querySelector(key) || window[key]) {
                    
                    // if so, iterate over the array of resources for that selector
                    
                    resources[key].forEach(function(el) {
                    	var body = document.getElementsByTagName("body")[0];                                               
                        if (/\.js($|\?)/.test(el)) {
                            
                            // for js files, add a script element
                            
                            var newScript = document.createElement("SCRIPT");
                            newScript.src = el;
                            body.appendChild(newScript);                                                                               
                        } else if (/\.css($|\?)/.test(el)) {
                            
                            // for css files, add a link element
                            
                            var newStyle = document.createElement("LINK");
                            newStyle.rel = "stylesheet";
                            newStyle.type = "text/css";
                            newStyle.href = el;
                            body.appendChild(newStyle);
                        }
                    })
                }
            }
        }
    };
    
    // request the file "resources.json" at the root
    // change this to "some/other/path/resources.json" if you want
    
    xhr.open("GET", "resources.json", true);
    xhr.send();
}();
