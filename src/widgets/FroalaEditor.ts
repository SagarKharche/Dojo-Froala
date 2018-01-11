import { v } from "@dojo/widget-core/d";
import { WidgetBase } from "@dojo/widget-core/WidgetBase";

// Note that Froala Editor has to be required separately.
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";

import * as $ from "jquery";

/**
 * Toolbar options interface
 */
export interface IToolbarOptions {
    toolbarSticky?: boolean;
    toolbarVisibleWithoutSelection?: boolean;
    toolbarInline?: boolean;
    toolbarContainer?: string;
}

/**
 * Froala editor config object
 */
export interface IFroalaEditorOptions {
    [key: string]: any;
}

/**
 * Froala widget props interface
 */
export interface IFroalaEditorProps {
    toolbarType: IToolbarOptions;
}

/**
 * Froala editor widget
 */
export class FroalaEditor extends WidgetBase<IFroalaEditorProps> {

    // Jquery wrapped element.
    private $element: any;

    // Froala editor object, in which we will get all froala editor API's
    private editor: any;

    // Froala editor initialize check
    private editorInitialized: boolean;

    // Froala element
    private $editor: JQuery;

    // Froala editor event listeners
    private listeningEvents: string[] = [];

    // Froala editor configuration
    private config: IFroalaEditorOptions = {
        charCounterCount: false,
        placeholderText: "Type text here...",
    };

    /**
     * Widget onAttach life cycle hook, call after render
     */
    protected onAttach() {
        if (this.editorInitialized) {
            return;
        }
        this.config = { ...this.config, ...this.properties.toolbarType };
        this.$element = $("#froala-editor");
        this.editor = this.$element.froalaEditor(this.config).data("froala.editor");
        this.$editor = this.editor.$el;
        this.initFroalaListeners();
        this.editorInitialized = true;
    }

    /**
     * Widget detach life cycle hook, call before destroy widget
     */
    protected onDetach() {
        this.destroyEditor();
    }

    /**
     * Destroy froala instance and event listeners
     */
    protected destroyEditor() {
        if (this.$element) {
            this.$element.off(this.listeningEvents.join(" "));
            this.$editor.off("keyup");
            this.$element.froalaEditor("destroy");
            this.listeningEvents.length = 0;
            this.$element = null;
            this.editorInitialized = false;
        }
    }

    /**
     * Bind contentChange and keyup froala events
     */
    protected initFroalaListeners() {
        // bind contentChange and keyup event
        this.registerEvent(this.$element, "froalaEditor.contentChanged", () => {
            // TODO:- May be we want to update the thumbnail here
            console.log(1);
        });

        this.registerEvent(this.$editor, "keyup", () => {
            // TODO:- Generate toolbar data to update
            console.log(2);
        });
    }

    /**
     * Register event on jquery editor element
     * @param element { any }
     * @param eventName { string }
     * @param callback { Function }
     */
    protected registerEvent(element: any, eventName: string, callback: Function) {
        if (!element || !eventName || !callback) {
            return;
        }

        this.listeningEvents.push(eventName);
        element.on(eventName, callback);
    }

	/**
	 * Override WidgetBase#render to produce a virtual DOM tree.
	 * @returns {HNode} Each time render() executes, it should build the entire virtual DOM tree.
	 */
    protected render() {
        return v("div", { id: "froala-editor" });
    }
}

export default FroalaEditor;
