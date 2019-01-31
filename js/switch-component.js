/** @module SwitchElement */
/*
 * Switch Web Component
 * @author [Chris Tudhope](http://github.com/cartoonclouds)
 * @version 1.0.0
 * @class
 * @classdesc A HTML switch element with 'on' and 'off' states, the 'on' state value will be passed on a form submit.
 * @extends HTMLElement
 * @property {boolean} checked
 * @property {boolean} disabled
 * @property {boolean} readonly
 * @property {string|number} value
 * @property {string} name
 * @property {string} color
 * @property {string} onText
 * @property {string} offText
 * @param {boolean} [checked=true]
 * @param {boolean} [disabled=false]
 * @param {boolean} [readonly=false]
 * @param {string|number} [value=1] - The value passed when the form is submitted.
 * @param {string} name
 * @param {string} [color=info] - Must be an enumerated value of {@link VALID_COLORS} 
 * @param {string} [on-text=ON]
 * @param {string} [off-text=OFF]
 */
export class SwitchElement extends HTMLElement {
    /**
     * Constructs the switch component object, HTML and shadow DOM.
	 *
	 * @constructor
     */
    constructor() {
        super();

		/**
		 * Possible color themes the switch can be set to.
		 * @readonly
		 * @constant
		 * @enum {number}
		 */
		this.VALID_COLORS = ['success', 'primary', 'secondary', 'danger', 'warning', 'info', 'dark'];

        // Create the shadow root
        this.attachShadow({ mode: 'open' });

		this.shadowRoot.appendChild(template.content.cloneNode(true));


		/** @private */
		this.shadowCheck = this.shadowRoot.querySelector('input');

		/** @private */
		this.label = this.shadowRoot.querySelector('[label]');

		/** @private */
		this.handle = this.shadowRoot.querySelector('[handle]');

		/** @private */
		this.checkbox = document.createElement('input');

		this.checkbox.setAttribute('type', 'checkbox');

		this.appendChild(this.checkbox);

    }


	/**
	 * Callback function when the switch element is appended to the DOM.
	 *
	 * @private
	 * @callback connectedCallback
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks|Web Components - Using the Lifecycle Callbacks}
	 */
	connectedCallback() {
		if (!this.hasAttribute('role'))
			this.setAttribute('role', 'checkbox');

		if (!this.hasAttribute('tabindex'))
			this.setAttribute('tabindex', 0);

		if (!this.hasAttribute('color'))
			this.setAttribute('color', 'info');

		if (!this.hasAttribute('on-text'))
			this.setAttribute('on-text', 'ON');

		if (!this.hasAttribute('off-text'))
			this.setAttribute('off-text', 'OFF');

		if (!this.hasAttribute('value'))
			this.setAttribute('value', 1);


		this.height = 24;
		this.width = 48;

		this.checked = this.hasAttribute('checked') || true;
		this.disabled = this.hasAttribute('disabled') || false;
		this.readonly = this.hasAttribute('readonly') || false;


		/**
		 * Attaches the click event to the switch.
		 * @param {string} type
		 * @param {_click} listener
		 * @param {boolean} useCapture
		 */
		this.addEventListener('click', this._click, true);

		/**
		 * Attaches the keyup event to the switch.
		 * @param {string} type
		 * @param {_keyup} listener
		 * @param {boolean} useCapture
		 */
		this.addEventListener('keyup', this._keyup, true);
	}


	/**
	 * Callback function when the switch element is removed from the DOM.
	 *
	 * @private
	 * @callback disconnectedCallback
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks|Web Components - Using the Lifecycle Callbacks}
	 */
	disconnectedCallback() {
		this.removeEventListener('click', this._click, true);
		this.removeEventListener('keyup', this._keyup, true);
	}


	/**
	 * Toggles the switch on<->off.
	 *
	 * @fires MouseEvent#event:click
	 */
	toggle() {
		return this.click();
	}


	 /**
	 * Response to the _click_ event. Setting the switch 'on' or 'off', immediately returning if the element is readonly/disabled.
	 *
	 * @private
	 * @listens MouseEvent~event:click
	 * @param {MouseEvent~click} e - The mouse-click event.
	 */
	_click(e) {
		if(this.readonly || this.disabled) {
			e.preventDefault();
			return;
		}

		this.checked = !this.checked;

		return true;
	}


	/**
	 * Response to the _keyup_ event ENTER (13) and SPACE (32) settings the switch 'on' or 'off', immediately returning if the element is readonly/disabled.
	 *
	 * @private
	 * @listens KeyboardEvent~event:keyup
	 * @param {KeyboardEvent~keyup} e - The keyup event.
	 */
	_keyup(e) {
		if(this.readonly || this.disabled) return false;

		if(e.which === 32 || e.which === 13)
			return this.checked = !this.checked;

		return false;
	}


    /**
     * Gets the width of the switch.
     *
     * @return {string} The width of the switch in px.
     */
    get width() { return this.getAttribute('width'); }

    /**
     * Sets the width theme of the switch (must be in px).
     * 96 48
     * @param {string} value - The width of the switch.
     */
    set width(value) {
		this.setAttribute('width', value);

		this.style.setProperty('width', `${value}px`);
		this.handle.style.setProperty('width', `${value * 0.45}px`);
		this.handle.style.setProperty('--handle-left', `${value - Number.parseInt(getComputedStyle(this.handle).getPropertyValue('width')) - 4}px`);
    }


    /**
     * Gets the height of the switch.
     *
     * @return {string} The height of the switch in px.
     */
    get height() { return this.getAttribute('height'); }

    /**
     * Sets the height theme of the switch (must be in px).
     *
     * @param {string} value - The height of the switch.
     */
    set height(value) {
		this.setAttribute('height', value);

		this.style.setProperty('height', `${value}px`);
		this.handle.style.setProperty('height', `${value - 4}px`);
    }


    /**
     * Gets the color of the switch.
     *
     * @return {string} The color of the switch.
     */
    get color() { return this.getAttribute('color'); }

    /**
     * Sets the color theme of the switch. Must be one of:
	 * - success
	 * - primary
	 * - info
	 * - secondary
	 * - warning
	 * - danger
	 * - dark
     *
     * @param {string} value - One of the possible switch color themes.
     */
    set color(value) {
		if( !this.VALID_COLORS.includes(value) ) {
			return;
		}

		this.setAttribute('color', value);
    }


	/**
	 * Gets the text displayed when the switch is 'on'.
	 *
	 * @see {@link get onText}
	 * @return {string} 'on' text.
	 */
	get 'on-text'() { return this.label.getAttribute('on-text'); }

	/**
	 * A helper for the _get_ on-text() function.
	 * 
	 * This is due to the inconsistancy of attribute names having hyphens yet 
	 * function names not. This is a logical function re-name using the Javascript 
	 * convention converting kebab-case to camelCase.
	 *
	 * @see {@link get on-text}
	 * @return {string} 'on' text.
	 */
	get onText() { return this['on-text']; }


	/**
	 * Sets the text to display when the switch is 'on'.
	 *
	 * @see {@link set onText}
	 * @param {string} value - The 'on' text.
	 */
	set 'on-text'(value) {
		this.label.setAttribute('on-text', value);
		this.setAttribute('on-text', value);
	}

	/**
	 * A helper for the _set_ on-text() function.
	 * 
	 * This is due to the inconsistancy of attribute names having hyphens yet 
	 * function names not. This is a logical function re-name using the Javascript 
	 * convention converting kebab-case to camelCase.
	 *
	 * @see {@link set on-text}
	 * @param {string} value - The value shown when the switch is 'on'.
	 */
	set onText(value) { this['on-text'] = value; }


	/**
	 * Gets the text displayed when the switch is 'off'.
	 *
	 * @see {@link get offText}
	 * @return {string} 'off' text.
	 */
	get 'off-text'() { return this.label.getAttribute('off-text'); }

	/**
	 * A helper for the _get_ off-text() function.
	 * 
	 * This is due to the inconsistancy of attribute names having hyphens yet 
	 * function names not. This is a logical function re-name using the Javascript 
	 * convention converting kebab-case to camelCase.
	 *
	 * @see {@link get off-text}
	 * @return {string} 'off' text.
	 */
	get offText() { return this['off-text']; }


	/**
	 * Sets the text to display when the switch is 'off'.
	 *
	 * @see {@link set offText}
	 * @param {string} value - The 'off' text.
	 */
	set 'off-text'(value) {
		this.label.setAttribute('off-text', value);
		this.setAttribute('off-text', value);
	}

	/**
	 * A helper for the _set_ off-text() function.
	 * 
	 * This is due to the inconsistancy of attribute names having hyphens yet 
	 * function names not. This is a logical function re-name using the Javascript 
	 * convention converting kebab-case to camelCase.
	 *
	 * @see {@link set off-text}
	 * @param {string} value - The value shown when the switch is 'off'.
	 */
	set offText(value) { this['off-text'] = value; }



	/**
	 * Gets the name of the switch.
	 *
	 * @return {string} The name of the switch.
	 */
	get name() { return this.getAttribute('name'); }

    /**
     * Sets the name of the switch.
     *
     * @param {string} value - The name of the switch and the key used when the form is submitted.
     */
	set name(value) {
		this.checkbox.setAttribute('name', value);
		this.setAttribute('name', value);
	}


    /**
     * Gets the value of the switch.
     *
     * @return {string} The value of the switch.
     */
    get value() { return this.getAttribute('value'); }

    /**
     * Sets the value of the switch.
     *
     * @param {string} value - The value of the switch and what will be used when the form is submitted.
     */
    set value(value) {
		this.setAttribute('value', value);
		this.checkbox.setAttribute('value', value);
    }


    /**
     * Gets the on/off state.
     *
     * @return {boolean} True if the switch is 'on', false otherwise.
     */
    get checked() { return this.hasAttribute('checked'); }

    /**
     * Sets the on/off state of the switch.
     *
     * @param {boolean|int} value - A (boolean-castable) value which sets the switch's state.
     */
    set checked(value) {
		const isChecked = Boolean(value);

		if(isChecked) {
			if(!this.hasAttribute('checked'))
				this.setAttribute('checked', '');

			if(!this.shadowCheck.hasAttribute('checked'))
				this.shadowCheck.setAttribute('checked', '');

			if(!this.checkbox.hasAttribute('checked'))
				this.checkbox.setAttribute('checked', '');
		} else {
			if(this.hasAttribute('checked'))
				this.removeAttribute('checked');

			if(this.shadowCheck.hasAttribute('checked'))
				this.shadowCheck.removeAttribute('checked');

			if(this.checkbox.hasAttribute('checked'))
				this.checkbox.removeAttribute('checked');
		}
    }


    /**
     * Gets the disabled state.
     *
     * @return {boolean} True if disabled, false otherwise.
     */
    get disabled() { return this.hasAttribute('disabled'); }

    /**
     * Sets the disabled state.
	 *
	 * If the switch is set as disabled, the value is _not_ passed when the form is submitted.
     *
     * @param {boolean|int} value - A (boolean-castable) value which sets whether the switch is disabled.
     */
    set disabled(value) {
		const isDisabled = Boolean(value);

		if(isDisabled) {
			if(!this.hasAttribute('disabled'))
				this.setAttribute('disabled', '');

			if(!this.shadowCheck.hasAttribute('disabled'))
				this.shadowCheck.setAttribute('disabled', '');

			if(!this.checkbox.hasAttribute('disabled'))
				this.checkbox.setAttribute('disabled', '');
		} else {
			if(this.hasAttribute('disabled'))
				this.removeAttribute('disabled');

			if(this.shadowCheck.hasAttribute('disabled'))
				this.shadowCheck.removeAttribute('disabled');

			if(this.checkbox.hasAttribute('disabled'))
				this.checkbox.removeAttribute('disabled');
		}
    }


    /**
     * Gets the readonly state.
     *
     * @return {boolean} True if readonly, false otherwise.
     */
    get readonly() { return this.hasAttribute('readonly'); }

    /**
     * Sets the readonly state.
	 *
	 * Setting as readonly, the element will become unresponsive to user input however the value _will_ 
	 * still be passed when the form is submitted.
     *
     * @param {boolean|int} value - A (boolean-castable) value which sets whether the switch is readonly.
     */
    set readonly(value) {
		const isReadonly = Boolean(value);

		if(isReadonly) {
			if(!this.hasAttribute('readonly'))
				this.setAttribute('readonly', '');

			if(!this.shadowCheck.hasAttribute('readonly')) {
				this.shadowCheck.setAttribute('readonly', '');
				this.shadowCheck.readonly = true;
			}

			if(!this.checkbox.hasAttribute('readonly')) {
				this.checkbox.setAttribute('readonly', '');
				this.checkbox.readonly = true;
			}
		} else {
			if(this.hasAttribute('readonly'))
				this.removeAttribute('readonly');

			if(this.shadowCheck.hasAttribute('readonly')) {
				this.shadowCheck.removeAttribute('readonly');
				this.shadowCheck.readonly = false;
			}

			if(this.checkbox.hasAttribute('readonly')) {
				this.checkbox.removeAttribute('readonly');
				this.checkbox.readonly = false;
			}
		}
    }


	/**
     * Returns an array of attributes names observed by the HTMLElement attributeChangedCallback() callback.
     *
	 * @private
	 * @see attributeChangedCallback()
     * @return {array} A list of attribute namese.
     */
    static get observedAttributes() {
        return [
            'disabled',
            'readonly',
            'checked',
            'value',
            'width',
            'height',
            'name',
            'color',
			'on-text',
			'off-text',
        ];
    }


	/**
     * This function is _not_ to be called directly!
	 * 
	 * @private
	 * @callback attributeChangedCallback
     */
    attributeChangedCallback(attr, oldValue, newValue) {

		switch (attr) {
            case 'checked':
            case 'disabled':
            case 'readonly':
				const hasAttr = newValue !== null;

				this[attr] = hasAttr;

                if (hasAttr) {
                    this.classList.add(attr);
                } else {
                    this.classList.remove(attr);
                }

				break;

			default:
				// update component property
				if (oldValue !== newValue) {
					this[attr] = newValue;
				}

        }

    }


}


const template = document.createElement('template');


template.innerHTML = `
	<style>
		:host([hidden]) { display: none }

		:host([disabled]) {
			opacity: 0.5;
			filter: alpha(opacity=50);
			border: 1px solid #bababa;
		}

		:host([disabled]), :host([disabled]) *,
		:host([readonly]), :host([readonly]) *
		{
			cursor: default !important;
			-webkit-user-select: none;
		    -moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		:host {
			position: relative;
			display: inline-block;
			background-color: transparent;
			font-family: "Quattrocento Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
			cursor: pointer;
			-ms-touch-action: manipulation;
			touch-action: manipulation;
		}


		[type="checkbox"] {
			display: none;
			position: absolute;
			opacity: 0;
			width: 0;
			height: 0;
		}

		:host([color="success"]) [type="checkbox"]:checked ~ [label] {
			background-color: #4dbd74;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#4dbd74), to(#3a9d5d));
			background-image: -webkit-linear-gradient(top, #4dbd74, #3a9d5d);
			background-image: -o-linear-gradient(top, #4dbd74, #3a9d5d);
			background-image: linear-gradient(to bottom, #4dbd74, #3a9d5d);
			border-color: #3a9d5d;
		}

		:host([color="success"]) [type="checkbox"]:checked ~ [handle] {
			left: var(--handle-left);
			border-color: #3a9d5d;
		}
		
		
		:host([color="primary"]) [type="checkbox"]:checked ~ [label] {
			background-color: #20a8d8;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#20a8d8), to(#1985ac));
			background-image: -webkit-linear-gradient(top, #20a8d8, #1985ac);
			background-image: -o-linear-gradient(top, #20a8d8, #1985ac);
			background-image: linear-gradient(to bottom, #20a8d8, #1985ac);
			border-color: #1985ac;
		}


		:host([color="primary"]) [type="checkbox"]:checked ~ [handle] {
			left: var(--handle-left);
			border-color: #1985ac;
		}
		
		
		:host([color="secondary"]) [type="checkbox"]:checked ~ [label] {
			background-color: #c8ced3;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#c8ced3), to(#acb5bc));
			background-image: -webkit-linear-gradient(top, #c8ced3, #acb5bc);
			background-image: -o-linear-gradient(top, #c8ced3, #acb5bc);
			background-image: linear-gradient(to bottom, #c8ced3, #acb5bc);
			border-color: #acb5bc;
		}

		:host([color="secondary"]) [type="checkbox"]:checked ~ [handle] {
			left: var(--handle-left);
			border-color: #acb5bc;
		}

		
		:host([color="danger"]) [type="checkbox"]:checked ~ [label] {
			background-color: #f86c6b;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#f86c6b), to(#f63c3a));
			background-image: -webkit-linear-gradient(top, #f86c6b, #f63c3a);
			background-image: -o-linear-gradient(top, #f86c6b, #f63c3a);
			background-image: linear-gradient(to bottom, #f86c6b, #f63c3a);
			border-color: #f63c3a
		}

		:host([color="danger"]) [type="checkbox"]:checked ~ [handle] {
			left: var(--handle-left);
			border-color: #f63c3a;
		}

		
		:host([color="warning"]) [type="checkbox"]:checked ~ [label] {
			background-color: #ffc107;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#ffc107), to(#d39e00));
			background-image: -webkit-linear-gradient(top, #ffc107, #d39e00);
			background-image: -o-linear-gradient(top, #ffc107, #d39e00);
			background-image: linear-gradient(to bottom, #ffc107, #d39e00);
			border-color: #d39e00;
		}

		:host([color="warning"]) [type="checkbox"]:checked ~ [handle] {
			left: var(--handle-left);
			border-color: #d39e00;
		}


		:host([color="info"]) [type="checkbox"]:checked ~ [label] {
			background-color: #63c2de;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#63c2de), to(#39b2d5));
			background-image: -webkit-linear-gradient(top, #63c2de, #39b2d5);
			background-image: -o-linear-gradient(top, #63c2de, #39b2d5);
			background-image: linear-gradient(to bottom, #63c2de, #39b2d5);
			border-color: #39b2d5;
		}

		:host([color="info"]) [type="checkbox"]:checked ~ [handle] {
			left: var(--handle-left);
			border-color: #39b2d5;
		}

			
		:host([color="dark"]) [type="checkbox"]:checked ~ [label] {
			background-color: #2f353a;
			background-image: -webkit-gradient(linear, left top, left bottom, from(#2f353a), to(#181b1e));
			background-image: -webkit-linear-gradient(top, #2f353a, #181b1e);
			background-image: -o-linear-gradient(top, #2f353a, #181b1e);
			background-image: linear-gradient(to bottom, #2f353a, #181b1e);
			border-color: #181b1e;
		}

		:host([color="dark"]) [type="checkbox"]:checked ~ [handle] {
			left: var(--handle-left);
			border-color: #181b1e;
		}


		[handle] {
			position: absolute;
			top: 2px;
			left: 2px;
			background: #fff;
			border: 1px solid #e4e6eb;
			border-radius: 1px;
			-webkit-transition: left .15s ease-out;
			-o-transition: left .15s ease-out;
			transition: left .15s ease-out;
		}


		[label] {
			position: relative;
			display: block;
			height: inherit;
			font-size: 10px;
			background-color: #fff;
			border: 1px solid #e4e6eb;
			border-radius: 2px;
			text-transform: uppercase;
			-webkit-transition: opacity background .15s ease-out;
			-o-transition: opacity background .15s ease-out;
			transition: opacity background .15s ease-out;
		}
		

		[label]::after, [label]::before {
			position: absolute;
			top: 50%;
			width: 45%;
			margin-top: -.5em;
			line-height: 1;
			text-align: center;
			-webkit-transition: inherit;
			-o-transition: inherit;
			transition: inherit;
		}


		[label]::before {
			right: 0;
			color: #e4e6eb;
			content: attr(off-text);
		}


		[type="checkbox"]:checked ~ [label]::before {
			opacity: 0;
		}


		[label]::after {
			left: 0;
			color: #fff;
			content: attr(on-text);
			opacity: 0;
		}

		[type="checkbox"]:checked ~ [label]::after {
			opacity: 1;
		}
	</style>

	<input type="checkbox" tabindex="-1">
	<span label></span>
	<span handle></span>
`;


export default customElements.define('cloud-switch', SwitchElement);

/**
 * This event is fired when a pointing device button (usually a mouse's primary button) is pressed and released on a single element.
 * @event MouseEvent#click
 * @type {object}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/click}
 */

/**
 * This event is fired when a key is released.
 * @event KeyboardEvent#keyup
 * @type {object}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/keyup}
 */
