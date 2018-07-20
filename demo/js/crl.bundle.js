!function(){
  var e={         
    "form" : [
      "css/form.css",
      "js/form-validator.js"
    ]
  };
  for(var s in e)(!~s.indexOf("!")&&(document.querySelector(s)||window[s])||~s.indexOf("!")&&0==window[s.slice("1")]||~s.indexOf("!!")&&!window[s.slice("2")])&&e[s].forEach(function(e){var t;if(/\.js($|\?)/.test(e))(t=document.createElement("SCRIPT")).src=e,document.head.appendChild(t);else if(/\.css($|\?)/.test(e))(t=document.createElement("LINK")).rel="stylesheet",t.href=e,document.head.appendChild(t);else if(/\.html($|\?)/.test(e)){var c=s,n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){document.querySelector(c).outerHTML=n.responseText;for(var e=(new DOMParser).parseFromString(n.responseText,"text/html").querySelectorAll("script"),t=e.length;t--;){var s=document.createElement("SCRIPT");e[t].src?s.src=e[t].src:s.innerHTML=e[t].innerHTML,document.head.appendChild(s)}}},n.open("GET",e,!0),n.send()}})
 }();
