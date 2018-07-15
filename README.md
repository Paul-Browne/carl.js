# crl

Conditional Resource Loader in ~500 bytes of javascript

If your lazy but efficient and want just one place where you can manage what css or javascript resources are loaded, depending on wheather are not they are actually needed, then maybe crl is for you

##### How does it work

crl works in two parts; the resources json and the script, basically the script runs tests, then if the test is passed a resource or resources will be loaded. simple.

##### the resources.json

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

and finally, use the `!!` to test if a window object is **undefined** or falsey

```json
{
  "!!dataLayer" : [
    "js/some-google-analytics-script.js"
  ]
}
```

Just include the `resources.json` in the root of your project and place the `crl.min.js` file just before the closing body tag on every page like so.

```html
  <script src="js/crl.min.js"></script>
</body>
```

and your good to go. Start adding your tests and resources in the resources.json







