# mr-nav-state
Small Angular.js directive that sets an `is-active` class on elements that have (or contain) an `[href="currentUrl"]`

## Usage

```html
<li mr-nav-state[="/optional/hardcoded/url"] [mr-nav-state-strict]>
  <a ng-href="bar">Foo</a>
</li>
```
