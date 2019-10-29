/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldWrapper } from '@ngx-formly/core';
import { FieldsService } from '../fields.service';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import { cloneDeep } from '../util';
import { timer } from 'rxjs';
var FormlyDesignerFieldWrapperComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyDesignerFieldWrapperComponent, _super);
    function FormlyDesignerFieldWrapperComponent(changeDetector, designerConfig, elementRef, fieldsService, formlyDesignerService, zone) {
        var _this = _super.call(this) || this;
        _this.changeDetector = changeDetector;
        _this.designerConfig = designerConfig;
        _this.elementRef = elementRef;
        _this.fieldsService = fieldsService;
        _this.formlyDesignerService = formlyDesignerService;
        _this.zone = zone;
        _this.editing = false;
        _this.fieldEdit = new FormControl({});
        _this.fieldWrappers = [];
        _this.wrappers = [];
        return _this;
    }
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.type = this.field.type;
        this.wrappers = Object.getOwnPropertyNames(this.designerConfig.wrappers);
        this.fieldWrappers = this.formlyDesignerService.getWrappers(this.formlyDesignerService.convertField(this.field)) || [];
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return setTimeout((/**
         * @return {?}
         */
        function () { return _this.checkDesigner(); })); }));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return setTimeout((/**
         * @return {?}
         */
        function () { return _this.checkDesigner(); })); }));
    };
    Object.defineProperty(FormlyDesignerFieldWrapperComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.formlyDesignerService.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} wrapper
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.addWrapper = /**
     * @param {?} wrapper
     * @return {?}
     */
    function (wrapper) {
        /** @type {?} */
        var field = cloneDeep(this.field);
        if (field.wrappers) {
            field.wrappers.push(wrapper);
        }
        else {
            field.wrappers = [wrapper];
        }
        this.formlyDesignerService.updateField(this.field, field);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.removeWrapper = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var field = cloneDeep(this.field);
        this.fieldWrappers.splice(index, 1);
        field.wrappers = this.fieldWrappers;
        this.formlyDesignerService.updateField(this.field, field);
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.edit = /**
     * @return {?}
     */
    function () {
        this.editing = true;
        this.formlyDesignerService.disabled = true;
        this.fieldEdit.setValue(this.formlyDesignerService.convertField(cloneDeep(this.field)));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.remove = /**
     * @return {?}
     */
    function () {
        this.formlyDesignerService.removeField(this.field);
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.accept = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.fieldsService.checkField(this.fieldEdit.value, this.formlyDesignerService.fields)) {
            return;
        }
        timer().subscribe((/**
         * @return {?}
         */
        function () {
            _this.formlyDesignerService.updateField(_this.field, _this.fieldEdit.value);
            _this.formlyDesignerService.disabled = false;
            _this.editing = false;
        }));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.formlyDesignerService.disabled = false;
        this.editing = false;
    };
    /**
     * @private
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.checkDesigner = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = (/** @type {?} */ (this.elementRef.nativeElement));
        if (element.parentNode == null) {
            return;
        }
        /** @type {?} */
        var designerEmpty = element.querySelector('formly-designer-wrapper') == null;
        if (designerEmpty !== element.classList.contains('designerEmpty')) {
            this.changeDetector.detectChanges();
            if (designerEmpty) {
                element.classList.add('designerEmpty');
            }
            else {
                element.classList.remove('designerEmpty');
            }
        }
    };
    FormlyDesignerFieldWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-field-wrapper',
                    template: "\n        <div *ngIf=\"!editing\" class=\"bg-info text-white control-panel\">\n            <span class=\"type\">{{ type }}</span>\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn\" data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\" aria-expanded=\"false\" title=\"wrappers\">\n                    <i class=\"fa fa-clone\" aria-hidden=\"true\"></i>\n                </button>\n                <div class=\"dropdown-menu dropdown-menu-right\">\n                    <button class=\"dropdown-item\" type=\"button\" [disabled]=\"disabled\" title=\"add wrapper\"\n                        *ngFor=\"let wrapper of wrappers\" (click)=\"addWrapper(wrapper)\">\n                        {{ wrapper }}\n                    </button>\n                    <ng-container *ngIf=\"fieldWrappers.length\">\n                        <div *ngIf=\"wrappers.length\" class=\"dropdown-divider\"></div>\n                        <button class=\"dropdown-item\" type=\"button\" [disabled]=\"disabled\"\n                            *ngFor=\"let wrapper of fieldWrappers; let i=index\" (click)=\"removeWrapper(i)\">\n                            {{ wrapper }}&nbsp;&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\" title=\"remove wrapper\"></i>\n                        </button>\n                    </ng-container>\n                </div>\n            </div>\n            <button class=\"btn\" type=\"button\" [disabled]=\"disabled\" (click)=\"edit()\">\n                <i class=\"fa fa-pencil\" aria-hidden=\"true\" title=\"edit\"></i>\n            </button>\n            <button class=\"btn\" type=\"button\" [disabled]=\"disabled\" (click)=\"remove()\">\n                <i class=\"fa fa-times\" aria-hidden=\"true\" title=\"remove\"></i>\n            </button>\n        </div>\n        <div class=\"content\">\n            <div class=\"editor\" [hidden]=\"!editing\">\n                <formly-designer-field-editor #editor [hasContent]=\"true\" [showType]=\"true\" [showWrappers]=\"true\" [formControl]=\"fieldEdit\">\n                    <div class=\"footer\">\n                        <button (click)=\"cancel()\" class=\"btn btn-secondary mr-1\">Cancel</button>\n                        <button [disabled]=\"editor.invalid\" (click)=\"accept()\" class=\"btn btn-primary\">Apply</button>\n                    </div>\n                </formly-designer-field-editor>\n            </div>\n            <div [hidden]=\"editing\">\n                <ng-template #fieldComponent></ng-template>\n            </div>\n        </div>\n    ",
                    styles: ["\n        :host {\n            display: flex;\n            position: relative;\n            justify-content: flex-start;\n            align-content: flex-start;\n            align-items: flex-start;\n            margin: .25em;\n        }\n        :host.designerEmpty {\n            display:none;\n        }\n        .btn:not(:disabled), .dropdown-item:not(:disabled) {\n            cursor: pointer;\n        }\n        .control-panel {\n            font-size: .8em;\n            position: absolute;\n            padding: 0 0 0 .5em;\n            border-radius: 0 5px 0 0;\n            right: 0;\n            top: 0;\n        }\n        .control-panel > * {\n            padding-right: .5em;\n        }\n        .control-panel .btn {\n            font-size: unset;\n            background-color: unset;\n            padding: 0 .5em 0 0;\n            color: #fff;\n        }\n        .content {\n            border: 1px dashed #000;\n            border-radius: 5px;\n            min-height: 2em;\n            padding: 1.5em 1em 0 1em;\n            width: 100%;\n        }\n        .content:first-child {\n            padding-top: 0;\n        }\n        .editor {\n            margin: 1em 0;\n        }\n        .footer {\n            display: flex;\n            justify-content: flex-end;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    FormlyDesignerFieldWrapperComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FormlyDesignerConfig },
        { type: ElementRef },
        { type: FieldsService },
        { type: FormlyDesignerService },
        { type: NgZone }
    ]; };
    FormlyDesignerFieldWrapperComponent.propDecorators = {
        fieldComponent: [{ type: ViewChild, args: ['fieldComponent', { read: ViewContainerRef },] }]
    };
    return FormlyDesignerFieldWrapperComponent;
}(FieldWrapper));
export { FormlyDesignerFieldWrapperComponent };
if (false) {
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.fieldComponent;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.editing;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.fieldEdit;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.fieldWrappers;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.wrappers;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.type;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.designerConfig;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.formlyDesignerService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZGVzaWduZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL3dyYXBwZXJzL2ZpZWxkLWRlc2lnbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUF5QyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUNwRixNQUFNLEVBQVUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU3QjtJQWdHeUQsK0RBQVk7SUFVakUsNkNBQ1ksY0FBaUMsRUFDakMsY0FBb0MsRUFDcEMsVUFBc0IsRUFDdEIsYUFBNEIsRUFDNUIscUJBQTRDLEVBQzVDLElBQVk7UUFOeEIsWUFRSSxpQkFBTyxTQUNWO1FBUlcsb0JBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLG9CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQUNwQyxnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixtQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QiwyQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLFVBQUksR0FBSixJQUFJLENBQVE7UUFaeEIsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxD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LFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLFFBQVEsRUFBRSwwZ0ZBMENUOzZCQUNRLHl4Q0FpRFI7aUJBQ0o7Ozs7Z0JBekcrQyxpQkFBaUI7Z0JBS3hELG9CQUFvQjtnQkFMaUQsVUFBVTtnQkFJL0UsYUFBYTtnQkFFYixxQkFBcUI7Z0JBTDFCLE1BQU07OztpQ0EyR0wsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOztJQWdHM0QsMENBQUM7Q0FBQSxBQWxNRCxDQWdHeUQsWUFBWSxHQWtHcEU7U0FsR1ksbUNBQW1DOzs7SUFFNUMsNkRBQTBGOztJQUUxRixzREFBZ0I7O0lBQ2hCLHdEQUFnQzs7SUFDaEMsNERBQTZCOztJQUM3Qix1REFBd0I7O0lBQ3hCLG1EQUFhOzs7OztJQUdULDZEQUF5Qzs7Ozs7SUFDekMsNkRBQTRDOzs7OztJQUM1Qyx5REFBOEI7Ozs7O0lBQzlCLDREQUFvQzs7Ozs7SUFDcEMsb0VBQW9EOzs7OztJQUNwRCxtREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLFxuICAgIE5nWm9uZSwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRXcmFwcGVyIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJDb25maWcgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXItY29uZmlnJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyU2VydmljZSB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci5zZXJ2aWNlJztcbmltcG9ydCB7IGNsb25lRGVlcCB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgdGltZXIgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItZmllbGQtd3JhcHBlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAqbmdJZj1cIiFlZGl0aW5nXCIgY2xhc3M9XCJiZy1pbmZvIHRleHQtd2hpdGUgY29udHJvbC1wYW5lbFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eXBlXCI+e3sgdHlwZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIHRpdGxlPVwid3JhcHBlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jbG9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIHRpdGxlPVwiYWRkIHdyYXBwZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHdyYXBwZXIgb2Ygd3JhcHBlcnNcIiAoY2xpY2spPVwiYWRkV3JhcHBlcih3cmFwcGVyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgd3JhcHBlciB9fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZpZWxkV3JhcHBlcnMubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwid3JhcHBlcnMubGVuZ3RoXCIgY2xhc3M9XCJkcm9wZG93bi1kaXZpZGVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB3cmFwcGVyIG9mIGZpZWxkV3JhcHBlcnM7IGxldCBpPWluZGV4XCIgKGNsaWNrKT1cInJlbW92ZVdyYXBwZXIoaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB3cmFwcGVyIH19Jm5ic3A7Jm5ic3A7PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwicmVtb3ZlIHdyYXBwZXJcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cImVkaXQoKVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJlZGl0XCI+PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJyZW1vdmUoKVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cInJlbW92ZVwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3JcIiBbaGlkZGVuXT1cIiFlZGl0aW5nXCI+XG4gICAgICAgICAgICAgICAgPGZvcm1seS1kZXNpZ25lci1maWVsZC1lZGl0b3IgI2VkaXRvciBbaGFzQ29udGVudF09XCJ0cnVlXCIgW3Nob3dUeXBlXT1cInRydWVcIiBbc2hvd1dyYXBwZXJzXT1cInRydWVcIiBbZm9ybUNvbnRyb2xdPVwiZmllbGRFZGl0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBtci0xXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJlZGl0b3IuaW52YWxpZFwiIChjbGljayk9XCJhY2NlcHQoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+QXBwbHk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItZmllbGQtZWRpdG9yPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IFtoaWRkZW5dPVwiZWRpdGluZ1wiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZmllbGRDb21wb25lbnQ+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgICAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgICAgIG1hcmdpbjogLjI1ZW07XG4gICAgICAgIH1cbiAgICAgICAgOmhvc3QuZGVzaWduZXJFbXB0eSB7XG4gICAgICAgICAgICBkaXNwbGF5Om5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgLmJ0bjpub3QoOmRpc2FibGVkKSwgLmRyb3Bkb3duLWl0ZW06bm90KDpkaXNhYmxlZCkge1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG4gICAgICAgIC5jb250cm9sLXBhbmVsIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogLjhlbTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAwIC41ZW07XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwIDVweCAwIDA7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgfVxuICAgICAgICAuY29udHJvbC1wYW5lbCA+ICoge1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogLjVlbTtcbiAgICAgICAgfVxuICAgICAgICAuY29udHJvbC1wYW5lbCAuYnRuIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogdW5zZXQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB1bnNldDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgLjVlbSAwIDA7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgfVxuICAgICAgICAuY29udGVudCB7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBkYXNoZWQgIzAwMDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDJlbTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEuNWVtIDFlbSAwIDFlbTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC5jb250ZW50OmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgICAgICB9XG4gICAgICAgIC5lZGl0b3Ige1xuICAgICAgICAgICAgbWFyZ2luOiAxZW0gMDtcbiAgICAgICAgfVxuICAgICAgICAuZm9vdGVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RGVzaWduZXJGaWVsZFdyYXBwZXJDb21wb25lbnQgZXh0ZW5kcyBGaWVsZFdyYXBwZXJcbiAgICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnZmllbGRDb21wb25lbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgZmllbGRDb21wb25lbnQ6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBlZGl0aW5nID0gZmFsc2U7XG4gICAgZmllbGRFZGl0ID0gbmV3IEZvcm1Db250cm9sKHt9KTtcbiAgICBmaWVsZFdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHR5cGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBkZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWcsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyU2VydmljZTogRm9ybWx5RGVzaWduZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLmZpZWxkLnR5cGU7XG4gICAgICAgIHRoaXMud3JhcHBlcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLmRlc2lnbmVyQ29uZmlnLndyYXBwZXJzKTtcbiAgICAgICAgdGhpcy5maWVsZFdyYXBwZXJzID0gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZ2V0V3JhcHBlcnModGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuY29udmVydEZpZWxkKHRoaXMuZmllbGQpKSB8fCBbXTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2hlY2tEZXNpZ25lcigpKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoZWNrRGVzaWduZXIoKSkpO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGFkZFdyYXBwZXIod3JhcHBlcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gY2xvbmVEZWVwKHRoaXMuZmllbGQpO1xuICAgICAgICBpZiAoZmllbGQud3JhcHBlcnMpIHtcbiAgICAgICAgICAgIGZpZWxkLndyYXBwZXJzLnB1c2god3JhcHBlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWVsZC53cmFwcGVycyA9IFt3cmFwcGVyXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS51cGRhdGVGaWVsZCh0aGlzLmZpZWxkLCBmaWVsZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlV3JhcHBlcihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gY2xvbmVEZWVwKHRoaXMuZmllbGQpO1xuICAgICAgICB0aGlzLmZpZWxkV3JhcHBlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZmllbGQud3JhcHBlcnMgPSB0aGlzLmZpZWxkV3JhcHBlcnM7XG4gICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLnVwZGF0ZUZpZWxkKHRoaXMuZmllbGQsIGZpZWxkKTtcbiAgICB9XG5cbiAgICBlZGl0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZmllbGRFZGl0LnNldFZhbHVlKHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNvbnZlcnRGaWVsZChjbG9uZURlZXAodGhpcy5maWVsZCkpKTtcbiAgICB9XG5cbiAgICByZW1vdmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLnJlbW92ZUZpZWxkKHRoaXMuZmllbGQpO1xuICAgIH1cblxuICAgIGFjY2VwdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmZpZWxkc1NlcnZpY2UuY2hlY2tGaWVsZCh0aGlzLmZpZWxkRWRpdC52YWx1ZSwgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRpbWVyKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLnVwZGF0ZUZpZWxkKHRoaXMuZmllbGQsIHRoaXMuZmllbGRFZGl0LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRGVzaWduZXIoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZXNpZ25lckVtcHR5ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtbHktZGVzaWduZXItd3JhcHBlcicpID09IG51bGw7XG4gICAgICAgIGlmIChkZXNpZ25lckVtcHR5ICE9PSBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGVzaWduZXJFbXB0eScpKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIGlmIChkZXNpZ25lckVtcHR5KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkZXNpZ25lckVtcHR5Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGVzaWduZXJFbXB0eScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19