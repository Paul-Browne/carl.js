# clr

conditionally load resources in ~400 bytes

resources are files like `table-sorter.js` or `carousel.css`

conditions are what selectors (classes, ids or plain old html tags) are found in the DOM or is a truthy object of the window, eg `window.something = true`

So, for example if you want to put a carousel on one page, but only want to load the dependant `carousel.css` and `carousel.js` files **if** the class `amazing-carousel` is present in the DOM, rather than including carousel resources on every page.

### testing for selectors

in the `resources.json`

```json
{
  ".amazing-carousel" : [
    "css/carousel.css",
    "js/carousel.js"
  ]
}
```

now, if the class `amazing-carousel` was presnt on the page, eg.

```html
<div class="amazing-carousel">
  ...
</div>
```

then the `css/carousel.css` and `js/carousel.js` resources would be loaded


you could use it to load a polyfill based on Modernizr feature detection like so

```json
{
  ".no-objectfit" : [
    "js/object-fit-polyfil.js"
  ]
}
```

As mentioned, you can test for truthy, falsey or undefined values on window objects

```json
{
  "Modernizr.scrollsnappoints" : [
    "css/scroll-snap-cool-stuff.css"
  ]
}
```

or, like the object-fit example, load a fallback/polyfill if the test returns false

```json
{
  "!Modernizr.cssgrid" : [
    "css/flexbox-fallback.css"
  ]
}
```

and finally, test if a window object is undefined or falsey

```json
{
  "!!dataLayer" : [
    "js/some-google-analytics-script.js"
  ]
}
```

Just include the `resources.json` in the root of your project and place the `clr.min.js` file just before the closing body tag on every page like so.

```html
  <script src="js/clr.min.js"></script>
</body>
```

and your good to go. Start adding your dependencies to selectors or window objects in the resources.json




