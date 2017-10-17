# lil-dnd
A little implementation of drag-and-drop ([DEMO](http://incleaf.com/lil-dnd/demo))

## Usage

```javascript
var lilDnd = new LilDnd('#wrapper'); // Selector
var lilDnd = new LilDnd(document.getElementById('wrapper')); // Element
```

## API

### LilDnd(target)

A constructor of module. `target` should be either an [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or [selector](http://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).
