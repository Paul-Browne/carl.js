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

                    resources[key].forEach(function(resource) {
                        var newElement;
                        if (/\.js($|\?)/.test(resource)) {

                            // for js files, add a script element

                            newElement = document.createElement("SCRIPT");
                            newElement.src = resource;
                        } else if (/\.css($|\?)/.test(resource)) {

                            // for css files, add a link element

                            newElement = document.createElement("LINK");
                            newElement.rel = "stylesheet";
                            newElement.href = resource;
                        }
                        document.head.appendChild(newElement);
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
