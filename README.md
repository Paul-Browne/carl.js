# crl

Conditional Resource Loader in about 500 bytes of javascript

If your lazy but efficient and want just one place where you can manage what css, javascript or even html resources are loaded, depending on wheather are not they are actually needed, then maybe crl is for you

### How does it work

crl works in two parts; A script and a the resources json, basically the script runs tests, then if the test is passed a resource - defined in the `resources.json` will be loaded. simple.

### the resources.json

the `resources.json` is a json file that lives at the root of your project and might look something like this

```json
{
  ".amazing-carousel" : [
    "css/carousel.css",
    "js/carousel.js"
  ],
  ".no-objectfit" : [
    "js/object-fit-polyfill.js"
  ]
}
```

So basically whats happening here is that if the class `amazing-carousel` is found in the DOM, then the carousel resources `carousel.css` and `carousel.js` will be loaded. Similarly if the class `no-objectfit` is found, then the `object-fit-polyfill.js` will be loaded

You aren't just limited to classes. You can also use id's, plain tag names or even data-attribute selectors. Basically any valid css selector that would work in a `querySelector()`, like so

### test for css selectors

```json
{
  "form" : [
    "css/form.css",
    "js/form-validator.js"
  ],
  "#home-page" : [
    "css/home-page.css"
  ],
  "[data-table-sorter]" : [
    "js/table-sorter.js"
  ],
  "pre > code": [
      "css/github-syntax-highlighting.css",
      "js/highlight.pack.js"
  ],
  "html:not(#contact-page)" : [
    "css/every-page-but-contact-page.css"
  ]
}
```

### test for window.objects

As well as testing for css selectors, you can also test window objects, like `window.something`. So, for example, if you wanted to test if the browser supports scroll snap points using Modernizr

```json
{
  "Modernizr.scrollsnappoints" : [
    "css/cool-scroll-snap-stuff.css"
  ]
}
```

or, like the object-fit example, to load a fallback/polyfill if the test returns false use `!`

```json
{
  "!Modernizr.cssgrid" : [
    "css/flexbox-fallback.css"
  ]
}
```

or use the `!!` to test if a window object is **undefined** or falsey

```json
{
  "!!dataLayer" : [
    "js/some-google-analytics-script.js"
  ]
}
```

### Loading html 

You can also use crl to load snippets of html, like a footer for example.

```json
{
  "footer.main-footer" : [
    "components/footer.html"
  ]
}
```

and the footer.html would replace the DOM element that "passed" the test

```html
  <footer class"main-footer"></footer>
```


Just include the `resources.json` in the root of your project and place the `crl.min.js` file just before the closing body tag on every page like so.

```html
  <script src="js/crl.min.js"></script>
</body>
```

and your good to go. Start adding your tests and resources in the `resources.json`


#### Q & A

##### Will there be FLOC (flashes of unstyled content)?
Yes, until the resource is loaded the html will be seen unstyled. You could get around this by hiding the html, then loading a small piece of css thet unhides it.

```json
{
  "html" : [
    "css/unhide-the-page.css"
  ]
}
```

##### What size should the resources be?
If the resource is only a few bytes of css like `h1.big { font-size: 5rem; line-height: 1.2 }` then it's not really worth creating a test just for that. Any resource that is over 1kb is ok to load conditionally.

##### What about content that is added to the DOM dynamically?
The `crl.min.js` is loaded once just before the closing body tag, so any css selectors or window objects would have to be already present in the DOM. The script can of cource be called again as a callback after you've loaded your dynamic content, then all the tests would be ran again

##### Can I include scripts in html resources?
Yes. Any script that is included in a html resource (like the footer.html) will be executed

##### How can I gaurentee that a script will fire after a html resource has been loaded
You would need to include the script inside the html resource to absolutely gaurentee that it is loaded after the html has been added to the DOM.

Ajax is Asyncronous (its what the "A" stands for). So there is no gaurentee that one resource is loaded before the other, so rather than doing this...

```json
{
  "footer.main-footer" : [
    "components/footer.html",
    "js/footer-script.js",
    "css/footer-styles.css"
  ]
}
```

Do this...

```html
  <!-- footer.html -->
  <link rel="stylesheet" href="css/footer-styles.css" >

  <div>
    <p>Copyright 2020<p>
    <div>
      site map, social media, contacts etc...
    </div>      
  </div>

  <script src="js/footer-script.js"></script>
```

Even better would be to inline the scripts and styles to reduce http requests (since footer.html will be cached anyway)

```html
  <!-- footer.html -->
  <style>
    /* contents of footer-styles.css */
  </style>

  <div>
    <p>Copyright 2020<p>
    <div>
      site map, social media, contacts etc...
    </div>      
  </div>

  <script>
    /* contents of footer-scripts.js */
  </script>
```
