! function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resources = JSON.parse(xhr.responseText);
            for (key in resources) {
                if (document.querySelector(key)) {
                    resources[key].forEach(function(el) {
                    	var body = document.getElementsByTagName("body")[0];
                        if (/\.js($|\?)/.test(el)) {
                            var newScript = document.createElement("SCRIPT");
                            newScript.src = el;
                            body.appendChild(newScript);
                        } else if (/\.css($|\?)/.test(el)) {
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
    xhr.open("GET", "resources.json", true);
    xhr.send();
}();
