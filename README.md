# clr

conditionally load resources in ~450 bytes (~300 after gzip)

resources are files like `table-sorter.js` or `carousel.css`

conditions are what selectors (classes, ids or plain old html tags) are found in the DOM or is a truthy object of the window, eg `window.something = true`

So, for example if you want to put a carousel on one page, but only want to load the dependant `carousel.css` and `carousel.js` files **if** the class `amazing-carousel` is present in the DOM, rather than including carousel resources on every page.

```html
<div class="amazing-carousel">
  ...
</div>
```

and in the `resources.json`

```json
{
  ".amazing-carousel" : [
    "css/carousel.css",
    "js/carousel.js"
  ]
}
```

or to load a polyfil based on Modernizr feature detection

```json
{
  ".no-objectfit" : [
    "js/object-fit-polyfil.js"
  ]
}
```

Just include the `resources.json` in the root of your project and place the `clr.min.js` file just before the closing body tag on every page like so.

```html
  <script src="js/clr.min.js"></script>
</body>
```

and your good to go. Start adding your dependencies to selectors or window objects in the resources.json
