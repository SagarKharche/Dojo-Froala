import { w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { FroalaEditor } from "./FroalaEditor";


/**
 * A themed "Hello World" widget that renders a spinning Dojo 2 logo and the text
 * "Hello, Dojo 2 World!".
 *
 * Refer to these tutorials for more help with creating a widget:
 * 	- Creating widgets, https://dojo.io/tutorials/003_creating_widgets/
 */
export class HelloWorld extends WidgetBase {
	/**
	 * Override WidgetBase#render to produce a virtual DOM tree.
	 * @returns {HNode} Each time render() executes, it should build the entire virtual DOM tree.
	 */
	protected render() {
		let toolbarType = {
			toolbarContainer: "#temp",
		};
		// Use WidgetBase#classes() to assign CSS classnames from the theme to the virtual DOM nodes.
		return w(FroalaEditor, { toolbarType });
	}
}

export default HelloWorld;
