/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldWrapper } from '@ngx-formly/core';
import { FieldsService } from '../fields.service';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import { cloneDeep, isArray } from '../util';
import { NEVER, timer } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
var FormlyDesignerFieldGroupWrapperComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyDesignerFieldGroupWrapperComponent, _super);
    function FormlyDesignerFieldGroupWrapperComponent(changeDetector, designerConfig, elementRef, fieldsService, formlyDesignerService, zone) {
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
    FormlyDesignerFieldGroupWrapperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.field.templateOptions.$fieldArray) {
            this.type = this.field.templateOptions.$fieldArray.type || 'fieldArray';
        }
        else if (this.field.type) {
            this.type = this.field.type;
        }
        else if (this.field.fieldGroup) {
            this.type = 'fieldGroup';
        }
        this.wrappers = Object.getOwnPropertyNames(this.designerConfig.wrappers);
        this.fieldWrappers = this.formlyDesignerService.convertField(this.field).wrappers || [];
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.ngAfterContentInit = /**
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
    FormlyDesignerFieldGroupWrapperComponent.prototype.ngAfterContentChecked = /**
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
    Object.defineProperty(FormlyDesignerFieldGroupWrapperComponent.prototype, "disabled", {
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
    FormlyDesignerFieldGroupWrapperComponent.prototype.addWrapper = /**
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
    FormlyDesignerFieldGroupWrapperComponent.prototype.removeWrapper = /**
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
    FormlyDesignerFieldGroupWrapperComponent.prototype.edit = /**
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
    FormlyDesignerFieldGroupWrapperComponent.prototype.remove = /**
     * @return {?}
     */
    function () {
        this.formlyDesignerService.removeField(this.field);
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.accept = /**
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
    FormlyDesignerFieldGroupWrapperComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.formlyDesignerService.disabled = false;
        this.editing = false;
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.onFieldSelected = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (isArray(this.field.fieldGroup) &&
            !this.fieldsService.checkField(field, this.formlyDesignerService.fields, this.field)) {
            return;
        }
        /** @type {?} */
        var updatedField = cloneDeep(this.field);
        updatedField.fieldGroup = isArray(updatedField.fieldGroup) ? updatedField.fieldGroup.slice() : [];
        updatedField.fieldGroup.push(field);
        timer()
            .pipe(tap((/**
         * @return {?}
         */
        function () { return _this.formlyDesignerService.updateField(_this.field, updatedField); })), catchError((/**
         * @return {?}
         */
        function () { return NEVER; })))
            .subscribe();
    };
    /**
     * @private
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.checkDesigner = /**
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
    FormlyDesignerFieldGroupWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-field-group-wrapper',
                    template: "\n        <div *ngIf=\"!editing\" class=\"bg-info text-white control-panel\">\n            <span class=\"type\">{{ type }}</span>\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn\" data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\" aria-expanded=\"false\" title=\"wrappers\">\n                    <i class=\"fa fa-clone\" aria-hidden=\"true\"></i>\n                </button>\n                <div class=\"dropdown-menu dropdown-menu-right\">\n                    <button class=\"dropdown-item\" type=\"button\" [disabled]=\"disabled\" title=\"add wrapper\"\n                        *ngFor=\"let wrapper of wrappers\" (click)=\"addWrapper(wrapper)\">\n                        {{ wrapper }}\n                    </button>\n                    <ng-container *ngIf=\"fieldWrappers.length\">\n                        <div *ngIf=\"wrappers.length\" class=\"dropdown-divider\"></div>\n                        <button class=\"dropdown-item\" type=\"button\" [disabled]=\"disabled\"\n                            *ngFor=\"let wrapper of fieldWrappers; let i=index\" (click)=\"removeWrapper(i)\">\n                            {{ wrapper }}&nbsp;&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\" title=\"remove wrapper\"></i>\n                        </button>\n                    </ng-container>\n                </div>\n            </div>\n            <button [disabled]=\"disabled\" type=\"button\" class=\"btn\" (click)=\"edit()\">\n                <i class=\"fa fa-pencil\" aria-hidden=\"true\" title=\"edit\"></i>\n            </button>\n            <button [disabled]=\"disabled\" type=\"button\" class=\"btn\" (click)=\"remove()\">\n                <i class=\"fa fa-times\" aria-hidden=\"true\" title=\"remove\"></i>\n            </button>\n        </div>\n        <div class=\"content\">\n            <div [hidden]=\"!editing\">\n                <formly-designer-field-editor #editor [fieldGroup]=\"true\" [hasContent]=\"true\" [showWrappers]=\"true\"\n                    [formControl]=\"fieldEdit\">\n                    <div class=\"footer\">\n                        <button (click)=\"cancel()\" class=\"btn btn-secondary mr-1\">Cancel</button>\n                        <button [disabled]=\"editor.invalid\" (click)=\"accept()\" class=\"btn btn-primary\">Apply</button>\n                    </div>\n                </formly-designer-field-editor>\n            </div>\n            <div [hidden]=\"editing\">\n                <div class=\"form-group\">\n                    <label>child</label>\n                    <formly-designer-field-picker (selected)=\"onFieldSelected($event)\"></formly-designer-field-picker>\n                </div>\n                <ng-template #fieldComponent></ng-template>\n            </div>\n        </div>\n    ",
                    styles: ["\n        :host {\n            display: flex;\n            position: relative;\n            justify-content: flex-start;\n            align-content: flex-start;\n            align-items: flex-start;\n            margin: .25em;\n        }\n        :host.designerEmpty {\n            display:none;\n        }\n        .btn:not(:disabled), .dropdown-item:not(:disabled) {\n            cursor: pointer;\n        }\n        .control-panel {\n            font-size: .8em;\n            position: absolute;\n            padding: 0 0 0 .5em;\n            border-radius: 0 5px 0 0;\n            right: 0;\n            top: 0;\n        }\n        .control-panel > * {\n            padding-right: .5em;\n        }\n        .control-panel .btn {\n            font-size: unset;\n            background-color: unset;\n            padding: 0 .5em 0 0;\n            color: #fff;\n        }\n        .content {\n            border: 1px dashed #000;\n            border-radius: 5px;\n            padding: 1em;\n            width: 100%;\n        }\n        .footer {\n            display: flex;\n            justify-content: flex-end;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    FormlyDesignerFieldGroupWrapperComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FormlyDesignerConfig },
        { type: ElementRef },
        { type: FieldsService },
        { type: FormlyDesignerService },
        { type: NgZone }
    ]; };
    FormlyDesignerFieldGroupWrapperComponent.propDecorators = {
        fieldComponent: [{ type: ViewChild, args: ['fieldComponent', { read: ViewContainerRef },] }]
    };
    return FormlyDesignerFieldGroupWrapperComponent;
}(FieldWrapper));
export { FormlyDesignerFieldGroupWrapperComponent };
if (false) {
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.fieldComponent;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.type;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.editing;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.fieldEdit;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.fieldWrappers;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.wrappers;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.designerConfig;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.formlyDesignerService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZ3JvdXAtZGVzaWduZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL3dyYXBwZXJzL2ZpZWxkLWdyb3VwLWRlc2lnbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUF5QyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUNwRixNQUFNLEVBQVUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFxQixNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpEO0lBOEY4RCxvRUFBWTtJQVV0RSxrREFDWSxjQUFpQyxFQUNqQyxjQUFvQyxFQUNwQyxVQUFzQixFQUN0QixhQUE0QixFQUM1QixxQkFBNEMsRUFDNUMsSUFBWTtRQU54QixZQVFJLGlCQUFPLFNBQ1Y7UUFSVyxvQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsb0JBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ3BDLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLDJCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFD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SCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUM3QztTQUNKO0lBQ0wsQ0FBQzs7Z0JBeE5KLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUNBQXFDO29CQUMvQyxRQUFRLEVBQUUsd3ZGQStDVDs2QkFDUSw2bUNBMENSO2lCQUNKOzs7O2dCQXhHK0MsaUJBQWlCO2dCQUt4RCxvQkFBb0I7Z0JBTGlELFVBQVU7Z0JBSS9FLGFBQWE7Z0JBRWIscUJBQXFCO2dCQUwxQixNQUFNOzs7aUNBMEdMLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTs7SUF5SDNELCtDQUFDO0NBQUEsQUF6TkQsQ0E4RjhELFlBQVksR0EySHpFO1NBM0hZLHdDQUF3Qzs7O0lBRWpELGtFQUEwRjs7SUFFMUYsd0RBQWE7O0lBQ2IsMkRBQWdCOztJQUNoQiw2REFBZ0M7O0lBQ2hDLGlFQUE2Qjs7SUFDN0IsNERBQXdCOzs7OztJQUdwQixrRUFBeUM7Ozs7O0lBQ3pDLGtFQUE0Qzs7Ozs7SUFDNUMsOERBQThCOzs7OztJQUM5QixpRUFBb0M7Ozs7O0lBQ3BDLHlFQUFvRDs7Ozs7SUFDcEQsd0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZixcbiAgICBOZ1pvbmUsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciwgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkc1NlcnZpY2UgfSBmcm9tICcuLi9maWVsZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci1jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY2xvbmVEZWVwLCBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgeyBORVZFUiwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItZmllbGQtZ3JvdXAtd3JhcHBlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAqbmdJZj1cIiFlZGl0aW5nXCIgY2xhc3M9XCJiZy1pbmZvIHRleHQtd2hpdGUgY29udHJvbC1wYW5lbFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eXBlXCI+e3sgdHlwZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIHRpdGxlPVwid3JhcHBlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jbG9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIHRpdGxlPVwiYWRkIHdyYXBwZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHdyYXBwZXIgb2Ygd3JhcHBlcnNcIiAoY2xpY2spPVwiYWRkV3JhcHBlcih3cmFwcGVyKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgd3JhcHBlciB9fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZpZWxkV3JhcHBlcnMubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwid3JhcHBlcnMubGVuZ3RoXCIgY2xhc3M9XCJkcm9wZG93bi1kaXZpZGVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB3cmFwcGVyIG9mIGZpZWxkV3JhcHBlcnM7IGxldCBpPWluZGV4XCIgKGNsaWNrKT1cInJlbW92ZVdyYXBwZXIoaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB3cmFwcGVyIH19Jm5ic3A7Jm5ic3A7PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwicmVtb3ZlIHdyYXBwZXJcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cImVkaXQoKVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGVuY2lsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJlZGl0XCI+PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIChjbGljayk9XCJyZW1vdmUoKVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cInJlbW92ZVwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgW2hpZGRlbl09XCIhZWRpdGluZ1wiPlxuICAgICAgICAgICAgICAgIDxmb3JtbHktZGVzaWduZXItZmllbGQtZWRpdG9yICNlZGl0b3IgW2ZpZWxkR3JvdXBdPVwidHJ1ZVwiIFtoYXNDb250ZW50XT1cInRydWVcIiBbc2hvd1dyYXBwZXJzXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZmllbGRFZGl0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBtci0xXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJlZGl0b3IuaW52YWxpZFwiIChjbGljayk9XCJhY2NlcHQoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+QXBwbHk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItZmllbGQtZWRpdG9yPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IFtoaWRkZW5dPVwiZWRpdGluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5jaGlsZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtbHktZGVzaWduZXItZmllbGQtcGlja2VyIChzZWxlY3RlZCk9XCJvbkZpZWxkU2VsZWN0ZWQoJGV2ZW50KVwiPjwvZm9ybWx5LWRlc2lnbmVyLWZpZWxkLXBpY2tlcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ZpZWxkQ29tcG9uZW50PjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBtYXJnaW46IC4yNWVtO1xuICAgICAgICB9XG4gICAgICAgIDpob3N0LmRlc2lnbmVyRW1wdHkge1xuICAgICAgICAgICAgZGlzcGxheTpub25lO1xuICAgICAgICB9XG4gICAgICAgIC5idG46bm90KDpkaXNhYmxlZCksIC5kcm9wZG93bi1pdGVtOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAuY29udHJvbC1wYW5lbCB7XG4gICAgICAgICAgICBmb250LXNpemU6IC44ZW07XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMCAuNWVtO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMCA1cHggMCAwO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRyb2wtcGFuZWwgPiAqIHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IC41ZW07XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRyb2wtcGFuZWwgLmJ0biB7XG4gICAgICAgICAgICBmb250LXNpemU6IHVuc2V0O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdW5zZXQ7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIC41ZW0gMCAwO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRlbnQge1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggZGFzaGVkICMwMDA7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICBwYWRkaW5nOiAxZW07XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAuZm9vdGVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RGVzaWduZXJGaWVsZEdyb3VwV3JhcHBlckNvbXBvbmVudCBleHRlbmRzIEZpZWxkV3JhcHBlclxuICAgIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdmaWVsZENvbXBvbmVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBmaWVsZENvbXBvbmVudDogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIHR5cGU6IHN0cmluZztcbiAgICBlZGl0aW5nID0gZmFsc2U7XG4gICAgZmllbGRFZGl0ID0gbmV3IEZvcm1Db250cm9sKHt9KTtcbiAgICBmaWVsZFdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGRlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGZpZWxkc1NlcnZpY2U6IEZpZWxkc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybWx5RGVzaWduZXJTZXJ2aWNlOiBGb3JtbHlEZXNpZ25lclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpZWxkLnRlbXBsYXRlT3B0aW9ucy4kZmllbGRBcnJheSkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdGhpcy5maWVsZC50ZW1wbGF0ZU9wdGlvbnMuJGZpZWxkQXJyYXkudHlwZSB8fCAnZmllbGRBcnJheSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZC50eXBlKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLmZpZWxkLnR5cGU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSAnZmllbGRHcm91cCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cmFwcGVycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuZGVzaWduZXJDb25maWcud3JhcHBlcnMpO1xuICAgICAgICB0aGlzLmZpZWxkV3JhcHBlcnMgPSB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jb252ZXJ0RmllbGQodGhpcy5maWVsZCkud3JhcHBlcnMgfHwgW107XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoZWNrRGVzaWduZXIoKSkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jaGVja0Rlc2lnbmVyKCkpKTtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBhZGRXcmFwcGVyKHdyYXBwZXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKTtcbiAgICAgICAgaWYgKGZpZWxkLndyYXBwZXJzKSB7XG4gICAgICAgICAgICBmaWVsZC53cmFwcGVycy5wdXNoKHdyYXBwZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmllbGQud3JhcHBlcnMgPSBbd3JhcHBlcl07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UudXBkYXRlRmllbGQodGhpcy5maWVsZCwgZmllbGQpO1xuICAgIH1cblxuICAgIHJlbW92ZVdyYXBwZXIoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKTtcbiAgICAgICAgdGhpcy5maWVsZFdyYXBwZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGZpZWxkLndyYXBwZXJzID0gdGhpcy5maWVsZFdyYXBwZXJzO1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS51cGRhdGVGaWVsZCh0aGlzLmZpZWxkLCBmaWVsZCk7XG4gICAgfVxuXG4gICAgZWRpdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmZpZWxkRWRpdC5zZXRWYWx1ZSh0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jb252ZXJ0RmllbGQoY2xvbmVEZWVwKHRoaXMuZmllbGQpKSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5yZW1vdmVGaWVsZCh0aGlzLmZpZWxkKTtcbiAgICB9XG5cbiAgICBhY2NlcHQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5maWVsZHNTZXJ2aWNlLmNoZWNrRmllbGQodGhpcy5maWVsZEVkaXQudmFsdWUsIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmZpZWxkcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLnVwZGF0ZUZpZWxkKHRoaXMuZmllbGQsIHRoaXMuZmllbGRFZGl0LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkZpZWxkU2VsZWN0ZWQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0FycmF5KHRoaXMuZmllbGQuZmllbGRHcm91cCkgJiZcbiAgICAgICAgICAgICF0aGlzLmZpZWxkc1NlcnZpY2UuY2hlY2tGaWVsZChmaWVsZCwgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzLCB0aGlzLmZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXBkYXRlZEZpZWxkID0gY2xvbmVEZWVwKHRoaXMuZmllbGQpO1xuICAgICAgICB1cGRhdGVkRmllbGQuZmllbGRHcm91cCA9IGlzQXJyYXkodXBkYXRlZEZpZWxkLmZpZWxkR3JvdXApID8gdXBkYXRlZEZpZWxkLmZpZWxkR3JvdXAuc2xpY2UoKSA6IFtdO1xuICAgICAgICB1cGRhdGVkRmllbGQuZmllbGRHcm91cC5wdXNoKGZpZWxkKTtcblxuICAgICAgICB0aW1lcigpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UudXBkYXRlRmllbGQodGhpcy5maWVsZCwgdXBkYXRlZEZpZWxkKSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBORVZFUilcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRGVzaWduZXIoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZXNpZ25lckVtcHR5ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtbHktZGVzaWduZXItd3JhcHBlcicpID09IG51bGw7XG4gICAgICAgIGlmIChkZXNpZ25lckVtcHR5ICE9PSBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGVzaWduZXJFbXB0eScpKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIGlmIChkZXNpZ25lckVtcHR5KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkZXNpZ25lckVtcHR5Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGVzaWduZXJFbXB0eScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19