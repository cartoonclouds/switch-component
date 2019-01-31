# switch-component
A switch form Web Component utilising the latest ES6 and other web technologies to create [reusable custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components). While not explicitly extending the HTML checkbox element ([<input type="checkbox">](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)) the underlying state management uses a standard checkbox in order to keep track of the "checked"\"unchecked" state and allow for a value to be sent via submissions<sup>[[1](#footnotes)]</sup>.

The component is reactive in size - the handle will grow/shrink with respect to the set width/height (which can be configured either via the width/height attributes or using CSS styling).   

Listeners are attached to work as other standard HTML elements of similar functionality. The click, spacebar and enter keyboard events (once having focus) will all change the state of the switch. 

Additionally all custom attributes also have the same named properties and are kept in sync for any Javascript manipulation.

## Installation
1. Add the `switch-component.js` file to your `/js` folder.

2. Include the javascript file into the page you're wanting to use it in. It's recommended *not* to use the _async_ keyword so that the file loads as soon as possible. 

`<script charset="utf-8" defer src="js/switch-component.js" type="module"></script>`

It is also recommended to include the **web components polyfill** for the older browsers unable to understand the new ES6 functions. 

```html
<!-- The web component polyfill -->
<script src="https://cdn.rawgit.com/webcomponents/webcomponentsjs/edf84e6e/webcomponents-sd-ce.js"></script>
```

## Usage
```html
  <cloud-switch
          name="cloudSwitch"
          value="1"
  ></cloud-switch> <!-- Minimum required code, additional attributes are defined below. -->
```

## Attributes

|Attribute|Property|Default|Value(s)|Required|Description|
|---|---|---|---|---|---|
|name|name|-|`string`|:heavy_check_mark:|The name which will be sent upon form submission.|
|value|value|"1"|`string`|:heavy_check_mark:|The value to be send upon form submission.|
|disabled|disabled|`false`|`boolean`|:x:|Prevents the element from obtaining focus or sending it's value.|
|readonly|readonly|`false`|`boolean`|:x:|The element can still obtain focus, and value submitted but unable to have it's value changed.|
|checked|checked|`true`|`boolean`|:x:|Sets by default as the switch in "on" mode.|
|width|width|-|[`integer`, `double`]|:x:|Sets the width of the switch.|
|height|width|-|[`integer`, `double`]|:x:|Sets the height of the switch.|
|on-text|onText|"ON"|`string`|:x:|Sets the text which is displayed when the switch is in it's "on" mode.|
|off-text|offText|"OFF"|`string`|:x:|Sets the text which is displayed when the switch is in it's "off" mode.|
|role|role|"checkbox"|`string`|:x:|The correct value for WAI-ARIA accecssable-compliant components.|
|color|color|"info"|["success", "primary", "secondary", "danger", "warning", "info", "dark"]|:x:|Changes the color of the switch. The names and values are taken from [Bootstrap 4.0](https://getbootstrap.com/). See below for a list of possible colors and their hex values.|

### Color Options
|Color|Background|Border|Example|
| --- | --- | --- | --- |---|
|"success"|#4dbd74|#3a9d5d|![Success theme Switch element](/readme-images/switch-color-success.png?raw=true)|



## Example
![Minimal Switch element](/readme-images/switch-minimal.png?raw=true)
```html
<!-- Minimal example -->
  <cloud-switch>
  </cloud-switch>
```

![Example Switch element](/readme-images/switch-example.png?raw=true)
```html
<!-- Example -->
  <cloud-switch 
          name="Send Value?"
          on-text="Hell Yea" 
          off-text="No, no!" 
          color="primary"
          value="Yes"
  ></cloud-switch>
```


![Verbose Switch element](/readme-images/switch-verbose.png?raw=true)
```html
<!--  Verbose example -->
  <cloud-switch
          name="cloudSwitch"
          value="1"
          color="info"
          id="customerChkbox"
          role="checkbox"
          width="96"
          height="48"
  ></cloud-switch>
```

## TODO
* Provide values which will be submitted whether the switch is "on" or "off".
* Allow any color to be set (and complementary border/gradient auto-generated).


## Footnotes
[1] The current state of web components prevent custom form inputs from being able to be submitted. Offical [thread here](https://github.com/w3c/webcomponents/issues/509)<sub>[**closed**]</sub>
