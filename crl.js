! function() {

    // good 'ol AJAX

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resources = JSON.parse(xhr.responseText);

            // loop over all the "keys" which are the selectors

            for (var key in resources) {

                // check if the selector exists in the DOM
                // or is a truthy object of the window, eg window.abc = true or window.abc = 42 or window.abc = "hello world!" etc
                // or, if "!" is found, is a falsey object of the window, eg window.abc = false or window.abc = 0
                // or, if "!!" is found, is falsey or undefined, eg window.abc = undefined

                if ((!~key.indexOf('!') && (document.querySelector(key) || window[key])) || (~key.indexOf('!') && window[key.slice("1")] == false) || (~key.indexOf('!!') && !window[key.slice("2")])) {

                    // if so, iterate over the array of resources for that selector

                    resources[key].forEach(function(resource) {
                        var newElement;
                        if (/\.js($|\?)/.test(resource)) {

                            // for js files, add a script element

                            newElement = document.createElement("SCRIPT");
                            newElement.src = resource;
                            document.head.appendChild(newElement);
                        } else if (/\.css($|\?)/.test(resource)) {

                            // for css files, add a link element

                            newElement = document.createElement("LINK");
                            newElement.rel = "stylesheet";
                            newElement.href = resource;
                            document.head.appendChild(newElement);
                        } else if (/\.html($|\?)/.test(resource)) {

                            // for an html snippet, eg. header or footer

                            var xhr = new XMLHttpRequest();
                            xhr.onreadystatechange = function() {
                                if (xhr.readyState == 4 && xhr.status == 200) {

                                    // get the resource and replace the element that "passed" the test

                                    document.querySelector(key).outerHTML = xhr.responseText;

                                    // run javascript that is included in the resource (if any)

                                    var scripts = new DOMParser().parseFromString(xhr.responseText, 'text/html').querySelectorAll("script");
                                    var i = scripts.length;
                                    while(i--){                                        
                                        newElement = document.createElement("SCRIPT");
                                        scripts[i].src ? newElement.src = scripts[i].src : "";
                                        scripts[i].innerHTML ? newElement.innerHTML = scripts[i].innerHTML : "";
                                        document.head.appendChild(newElement);
                                    }                                    
                                }
                            };
                            xhr.open("GET", resource, true);
                            xhr.send();
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
