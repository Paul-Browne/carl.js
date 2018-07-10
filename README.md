# clr

conditionally load resources

resources are files like `table-sorter.js` or `carousel.css`

conditions are what selectors (classes, ids or plain old html tags) are found in the DOM


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

