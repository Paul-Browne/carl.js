! function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resources = JSON.parse(xhr.responseText);
            for (var key in resources) {
                if ((!~key.indexOf('!') && (document.querySelector(key) || window[key])) || (~key.indexOf('!') && window[key.slice("1")] == false) || (~key.indexOf('!!') && !window[key.slice("2")])) {
                    resources[key].forEach(function(resource) {
                        var newElement;
                        if (/\.js($|\?)/.test(resource)) {
                            newElement = document.createElement("SCRIPT");
                            newElement.src = resource;
                            document.head.appendChild(newElement);
                        } else if (/\.css($|\?)/.test(resource)) {
                            newElement = document.createElement("LINK");
                            newElement.rel = "stylesheet";
                            newElement.href = resource;
                            document.head.appendChild(newElement);
                        } else if (/\.html($|\?)/.test(resource)) {
                            var storeKey = key;
                            var xhr = new XMLHttpRequest();
                            xhr.onreadystatechange = function() {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                    document.querySelector(storeKey).outerHTML = xhr.responseText;
                                    var scripts = new DOMParser().parseFromString(xhr.responseText, 'text/html').querySelectorAll("script");
                                    var i = scripts.length;
                                    while(i--){                                        
                                        var newScript = document.createElement("SCRIPT");
                                        scripts[i].src ? newScript.src = scripts[i].src : newScript.innerHTML = scripts[i].innerHTML;
                                        document.head.appendChild(newScript);
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
    xhr.open("GET", "resources.json", true);
    xhr.send();
}();
