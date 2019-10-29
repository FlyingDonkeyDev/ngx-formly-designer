/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldsService } from '../fields.service';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { cloneDeep, isObject, isString } from '../util';
/** @type {?} */
var FIELD_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return FieldEditorComponent; })),
    multi: true
};
var FieldEditorComponent = /** @class */ (function () {
    function FieldEditorComponent(fieldsService, fb, formlyDesignerConfig) {
        var _this = this;
        this.fieldsService = fieldsService;
        this.fb = fb;
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.subscriptions = [];
        this.field = {};
        this.fields = [];
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        this.form = fb.group({
            key: this.key = fb.control(''),
            className: this.className = fb.control(''),
            fieldGroupClassName: this.fieldGroupClassName = fb.control(''),
            type: this.type = fb.control('')
        }, { validator: (/**
             * @param {?} control
             * @return {?}
             */
            function (control) { return _this.validator(control); }) });
        this.fieldForm = fb.group({});
    }
    /**
     * @return {?}
     */
    FieldEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.type.valueChanges
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.onTypeChange(); })));
        this.subscriptions.push(this.form.statusChanges
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.invalid = _this.form.invalid; })));
        this.subscribeValueChanges();
    };
    /**
     * @return {?}
     */
    FieldEditorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
        this.subscriptions.splice(0).forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        function (subscription) { return subscription.unsubscribe(); }));
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    FieldEditorComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        this.valueChangesSubscription.unsubscribe();
        this.updateField(obj);
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.subscribeValueChanges();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FieldEditorComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FieldEditorComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    FieldEditorComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    };
    /**
     * @private
     * @return {?}
     */
    FieldEditorComponent.prototype.subscribeValueChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.valueChangesSubscription = merge(this.fieldForm.valueChanges, this.form.valueChanges)
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.updateValue(); }));
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FieldEditorComponent.prototype.updateField = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (!isObject(field)) {
            field = {};
        }
        this.key.setValue(isString(field.key) ? field.key : '');
        this.className.setValue(isString(field.className) ? field.className : '');
        this.fieldGroupClassName.setValue(isString(field.fieldGroupClassName) ? field.fieldGroupClassName : '');
        this.type.setValue(isString(field.type) ? field.type : '');
        this.fields = this.fieldsService.getTypeFields(this.type.value);
        this.fieldForm = this.fb.group({});
        this.field = cloneDeep(field);
    };
    /**
     * @private
     * @return {?}
     */
    FieldEditorComponent.prototype.updateValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.onChange) {
            return;
        }
        /** @type {?} */
        var field = this.field;
        field.key = this.key.value;
        field.className = this.className.value;
        field.fieldGroupClassName = this.fieldGroupClassName.value;
        field.type = this.type.value;
        this.onChange(field);
    };
    /**
     * @private
     * @return {?}
     */
    FieldEditorComponent.prototype.onTypeChange = /**
     * @private
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
        /** @type {?} */
        var type = this.type.value;
        this.fields = this.fieldsService.getTypeFields(type);
        /** @type {?} */
        var designerType = this.formlyDesignerConfig.types[type];
        this.fieldArray = designerType && designerType.fieldArray;
        this.fieldForm = this.fb.group({});
        this.field = Object.assign({}, this.field);
        this.subscribeValueChanges();
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FieldEditorComponent.prototype.onWrappersSelected = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.updateField(field);
    };
    /**
     * @private
     * @param {?} control
     * @return {?}
     */
    FieldEditorComponent.prototype.validator = /**
     * @private
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
        var type = (/** @type {?} */ (control.get('type')));
        /** @type {?} */
        var hasType = isString(type.value) && type.value.trim().length > 0;
        /** @type {?} */
        var key = (/** @type {?} */ (control.get('key')));
        /** @type {?} */
        var result = { key: false, type: this.showType && !hasType, conflict: false };
        if (hasType && (!isString(key.value) || key.value.trim().length === 0)) {
            result.key = true;
        }
        return result.key || result.type ? result : null;
    };
    FieldEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-field-editor',
                    template: "\n        <form [formGroup]=\"form\" novalidate>\n            <div class=\"card\">\n                <div class=\"card-header\" [ngClass]=\"{solo: !hasContent && fields.length === 0}\">\n                    <div class=\"form-group\" [ngClass]=\"{'has-danger': form.hasError('key') && (key.dirty || key.touched)}\">\n                        <label class=\"form-control-label\">key</label>\n                        <input formControlName=\"key\" class=\"form-control\">\n                        <div *ngIf=\"form.hasError('key') && (key.dirty || key.touched)\" class=\"form-control-feedback\">\n                            key required.\n                        </div>\n                    </div>\n                    <div *ngIf=\"formlyDesignerConfig.settings.showClassName\" class=\"form-group\">\n                        <label class=\"form-control-label\">className</label>\n                        <input formControlName=\"className\" class=\"form-control\">\n                    </div>\n                    <div *ngIf=\"fieldGroup && formlyDesignerConfig.settings.showClassName\" class=\"form-group\">\n                        <label class=\"form-control-label\">fieldGroupClassName</label>\n                        <input formControlName=\"fieldGroupClassName\" class=\"form-control\">\n                    </div>\n                    <div *ngIf=\"showType\" class=\"form-group\"\n                        [ngClass]=\"{'has-danger': form.hasError('type') && (type.dirty || type.touched)}\">\n                        <label class=\"form-control-label\">type</label>\n                        <formly-designer-type-select formControlName=\"type\"></formly-designer-type-select>\n                        <div *ngIf=\"form.hasError('type') && (type.dirty || type.touched)\" class=\"form-control-feedback\">\n                            type required.\n                        </div>\n                    </div>\n                    <div *ngIf=\"showWrappers\" class=\"form-group\">\n                        <label class=\"form-control-label\">wrappers</label>\n                        <formly-designer-wrappers-picker [field]=\"field\"\n                            (selected)=\"onWrappersSelected($event)\">\n                        </formly-designer-wrappers-picker>\n                    </div>\n                </div>\n                <div #block class=\"card-body\">\n                    <formly-form *ngIf=\"fields.length > 0\" [form]=\"fieldForm\" [fields]=\"fields\" [model]=\"field\">\n                    </formly-form>\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </form>\n    ",
                    providers: [
                        FIELD_EDITOR_CONTROL_VALUE_ACCESSOR
                    ],
                    styles: ["\n        .card-header.solo {\n            border-bottom: 0;\n        }\n        .card-header.solo + .card-body {\n            display: none;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    FieldEditorComponent.ctorParameters = function () { return [
        { type: FieldsService },
        { type: FormBuilder },
        { type: FormlyDesignerConfig }
    ]; };
    FieldEditorComponent.propDecorators = {
        fieldGroup: [{ type: Input }],
        showType: [{ type: Input }],
        showWrappers: [{ type: Input }],
        hasContent: [{ type: Input }],
        blockElRef: [{ type: ViewChild, args: ['block',] }]
    };
    return FieldEditorComponent;
}());
export { FieldEditorComponent };
if (false) {
    /** @type {?} */
    FieldEditorComponent.prototype.fieldGroup;
    /** @type {?} */
    FieldEditorComponent.prototype.showType;
    /** @type {?} */
    FieldEditorComponent.prototype.showWrappers;
    /** @type {?} */
    FieldEditorComponent.prototype.hasContent;
    /** @type {?} */
    FieldEditorComponent.prototype.blockElRef;
    /**
     * @type {?}
     * @private
     */
    FieldEditorComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    FieldEditorComponent.prototype.valueChangesSubscription;
    /** @type {?} */
    FieldEditorComponent.prototype.form;
    /** @type {?} */
    FieldEditorComponent.prototype.key;
    /** @type {?} */
    FieldEditorComponent.prototype.className;
    /** @type {?} */
    FieldEditorComponent.prototype.fieldGroupClassName;
    /** @type {?} */
    FieldEditorComponent.prototype.type;
    /** @type {?} */
    FieldEditorComponent.prototype.fieldForm;
    /** @type {?} */
    FieldEditorComponent.prototype.field;
    /** @type {?} */
    FieldEditorComponent.prototype.fields;
    /** @type {?} */
    FieldEditorComponent.prototype.fieldArray;
    /** @type {?} */
    FieldEditorComponent.prototype.invalid;
    /**
     * @type {?}
     * @protected
     */
    FieldEditorComponent.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    FieldEditorComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    FieldEditorComponent.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    FieldEditorComponent.prototype.fb;
    /** @type {?} */
    FieldEditorComponent.prototype.formlyDesignerConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZvcm1seS1kZXNpZ25lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2ZpZWxkLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBd0IsV0FBVyxFQUEwQixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsS0FBSyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBVyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDOztJQUUzRCxtQ0FBbUMsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLEVBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDZDtBQUVEO0lBa0VJLDhCQUNZLGFBQTRCLEVBQzVCLEVBQWUsRUFDaEIsb0JBQTBDO1FBSHJELGlCQVlDO1FBWFcsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNoQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBTnBDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQXdCcEQsVUFBSyxHQUFzQixFQUFFLENBQUM7UUFDOUIsV0FBTSxHQUF3QixFQUFFLENBQUM7UUFJdkIsYUFBUTs7OztRQUFHLFVB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VDtvQkFTRCxTQUFTLEVBQUU7d0JBQ1AsbUNBQW1DO3FCQUN0Qzs2QkFWUSxnS0FPUjtpQkFJSjs7OztnQkFuRVEsYUFBYTtnQkFGUyxXQUFXO2dCQUdqQyxvQkFBb0I7Ozs2QkFvRXhCLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsU0FBUyxTQUFDLE9BQU87O0lBcUl0QiwyQkFBQztDQUFBLEFBbE1ELElBa01DO1NBMUlZLG9CQUFvQjs7O0lBQzdCLDBDQUE2Qjs7SUFDN0Isd0NBQTJCOztJQUMzQiw0Q0FBK0I7O0lBQy9CLDBDQUE2Qjs7SUFDN0IsMENBQTJDOzs7OztJQUUzQyw2Q0FBb0Q7Ozs7O0lBQ3BELHdEQUErQzs7SUFnQi9DLG9DQUF5Qjs7SUFDekIsbUNBQTBCOztJQUMxQix5Q0FBZ0M7O0lBQ2hDLG1EQUEwQzs7SUFDMUMsb0NBQTJCOztJQUUzQix5Q0FBcUI7O0lBQ3JCLHFDQUE4Qjs7SUFDOUIsc0NBQWlDOztJQUNqQywwQ0FBb0I7O0lBQ3BCLHVDQUFpQjs7Ozs7SUFFakIsd0NBQXFDOzs7OztJQUNyQyx5Q0FBZ0M7Ozs7O0lBMUI1Qiw2Q0FBb0M7Ozs7O0lBQ3BDLGtDQUF1Qjs7SUFDdkIsb0RBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJDb25maWcgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXItY29uZmlnJztcbmltcG9ydCB7IG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNsb25lRGVlcCwgaXNBcnJheSwgaXNPYmplY3QsIGlzU3RyaW5nIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmNvbnN0IEZJRUxEX0VESVRPUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmllbGRFZGl0b3JDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lci1maWVsZC1lZGl0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwiZm9ybVwiIG5vdmFsaWRhdGU+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiIFtuZ0NsYXNzXT1cIntzb2xvOiAhaGFzQ29udGVudCAmJiBmaWVsZHMubGVuZ3RoID09PSAwfVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnaGFzLWRhbmdlcic6IGZvcm0uaGFzRXJyb3IoJ2tleScpICYmIChrZXkuZGlydHkgfHwga2V5LnRvdWNoZWQpfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jb250cm9sLWxhYmVsXCI+a2V5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJrZXlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZvcm0uaGFzRXJyb3IoJ2tleScpICYmIChrZXkuZGlydHkgfHwga2V5LnRvdWNoZWQpXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wtZmVlZGJhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgcmVxdWlyZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmb3JtbHlEZXNpZ25lckNvbmZpZy5zZXR0aW5ncy5zaG93Q2xhc3NOYW1lXCIgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wtbGFiZWxcIj5jbGFzc05hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGZvcm1Db250cm9sTmFtZT1cImNsYXNzTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmllbGRHcm91cCAmJiBmb3JtbHlEZXNpZ25lckNvbmZpZy5zZXR0aW5ncy5zaG93Q2xhc3NOYW1lXCIgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wtbGFiZWxcIj5maWVsZEdyb3VwQ2xhc3NOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJmaWVsZEdyb3VwQ2xhc3NOYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93VHlwZVwiIGNsYXNzPVwiZm9ybS1ncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J2hhcy1kYW5nZXInOiBmb3JtLmhhc0Vycm9yKCd0eXBlJykgJiYgKHR5cGUuZGlydHkgfHwgdHlwZS50b3VjaGVkKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbC1sYWJlbFwiPnR5cGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm1seS1kZXNpZ25lci10eXBlLXNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJ0eXBlXCI+PC9mb3JtbHktZGVzaWduZXItdHlwZS1zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZm9ybS5oYXNFcnJvcigndHlwZScpICYmICh0eXBlLmRpcnR5IHx8IHR5cGUudG91Y2hlZClcIiBjbGFzcz1cImZvcm0tY29udHJvbC1mZWVkYmFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgcmVxdWlyZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93V3JhcHBlcnNcIiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbC1sYWJlbFwiPndyYXBwZXJzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtbHktZGVzaWduZXItd3JhcHBlcnMtcGlja2VyIFtmaWVsZF09XCJmaWVsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGVjdGVkKT1cIm9uV3JhcHBlcnNTZWxlY3RlZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm1seS1kZXNpZ25lci13cmFwcGVycy1waWNrZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgI2Jsb2NrIGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtbHktZm9ybSAqbmdJZj1cImZpZWxkcy5sZW5ndGggPiAwXCIgW2Zvcm1dPVwiZmllbGRGb3JtXCIgW2ZpZWxkc109XCJmaWVsZHNcIiBbbW9kZWxdPVwiZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtbHktZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLmNhcmQtaGVhZGVyLnNvbG8ge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMDtcbiAgICAgICAgfVxuICAgICAgICAuY2FyZC1oZWFkZXIuc29sbyArIC5jYXJkLWJvZHkge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIGBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBGSUVMRF9FRElUT1JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUlxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRmllbGRFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBPbkluaXQge1xuICAgIEBJbnB1dCgpIGZpZWxkR3JvdXA6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2hvd1R5cGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2hvd1dyYXBwZXJzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGhhc0NvbnRlbnQ6IGJvb2xlYW47XG4gICAgQFZpZXdDaGlsZCgnYmxvY2snKSBibG9ja0VsUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHVibGljIGZvcm1seURlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLmZvcm0gPSBmYi5ncm91cCh7XG4gICAgICAgICAgICBrZXk6IHRoaXMua2V5ID0gZmIuY29udHJvbCgnJyksXG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY2xhc3NOYW1lID0gZmIuY29udHJvbCgnJyksXG4gICAgICAgICAgICBmaWVsZEdyb3VwQ2xhc3NOYW1lOiB0aGlzLmZpZWxkR3JvdXBDbGFzc05hbWUgPSBmYi5jb250cm9sKCcnKSxcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSA9IGZiLmNvbnRyb2woJycpXG4gICAgICAgIH0sIHsgdmFsaWRhdG9yOiAoY29udHJvbCkgPT4gdGhpcy52YWxpZGF0b3IoY29udHJvbCkgfSk7XG4gICAgICAgIHRoaXMuZmllbGRGb3JtID0gZmIuZ3JvdXAoe30pO1xuICAgIH1cblxuICAgIHJlYWRvbmx5IGZvcm06IEZvcm1Hcm91cDtcbiAgICByZWFkb25seSBrZXk6IEZvcm1Db250cm9sO1xuICAgIHJlYWRvbmx5IGNsYXNzTmFtZTogRm9ybUNvbnRyb2w7XG4gICAgcmVhZG9ubHkgZmllbGRHcm91cENsYXNzTmFtZTogRm9ybUNvbnRyb2w7XG4gICAgcmVhZG9ubHkgdHlwZTogRm9ybUNvbnRyb2w7XG5cbiAgICBmaWVsZEZvcm06IEZvcm1Hcm91cDtcbiAgICBmaWVsZDogRm9ybWx5RmllbGRDb25maWcgPSB7fTtcbiAgICBmaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10gPSBbXTtcbiAgICBmaWVsZEFycmF5OiBib29sZWFuO1xuICAgIGludmFsaWQ6IGJvb2xlYW47XG5cbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG4gICAgcHJvdGVjdGVkIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnR5cGUudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMub25UeXBlQ2hhbmdlKCkpKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmZvcm0uc3RhdHVzQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDApKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmludmFsaWQgPSB0aGlzLmZvcm0uaW52YWxpZCkpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVmFsdWVDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoMCkuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVGaWVsZChvYmopO1xuICAgICAgICB0aGlzLmZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgdGhpcy5mb3JtLm1hcmtBc1VudG91Y2hlZCgpO1xuICAgICAgICB0aGlzLnN1YnNjcmliZVZhbHVlQ2hhbmdlcygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmRpc2FibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3Vic2NyaWJlVmFsdWVDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IG1lcmdlKHRoaXMuZmllbGRGb3JtLnZhbHVlQ2hhbmdlcywgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcylcbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVWYWx1ZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgICAgICBpZiAoIWlzT2JqZWN0KGZpZWxkKSkge1xuICAgICAgICAgICAgZmllbGQgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleS5zZXRWYWx1ZShpc1N0cmluZyhmaWVsZC5rZXkpID8gZmllbGQua2V5IDogJycpO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZS5zZXRWYWx1ZShpc1N0cmluZyhmaWVsZC5jbGFzc05hbWUpID8gZmllbGQuY2xhc3NOYW1lIDogJycpO1xuICAgICAgICB0aGlzLmZpZWxkR3JvdXBDbGFzc05hbWUuc2V0VmFsdWUoaXNTdHJpbmcoZmllbGQuZmllbGRHcm91cENsYXNzTmFtZSkgPyBmaWVsZC5maWVsZEdyb3VwQ2xhc3NOYW1lIDogJycpO1xuICAgICAgICB0aGlzLnR5cGUuc2V0VmFsdWUoaXNTdHJpbmcoZmllbGQudHlwZSkgPyBmaWVsZC50eXBlIDogJycpO1xuICAgICAgICB0aGlzLmZpZWxkcyA9IHRoaXMuZmllbGRzU2VydmljZS5nZXRUeXBlRmllbGRzKHRoaXMudHlwZS52YWx1ZSk7XG4gICAgICAgIHRoaXMuZmllbGRGb3JtID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgICAgIHRoaXMuZmllbGQgPSBjbG9uZURlZXAoZmllbGQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5vbkNoYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkO1xuICAgICAgICBmaWVsZC5rZXkgPSB0aGlzLmtleS52YWx1ZTtcbiAgICAgICAgZmllbGQuY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWUudmFsdWU7XG4gICAgICAgIGZpZWxkLmZpZWxkR3JvdXBDbGFzc05hbWUgPSB0aGlzLmZpZWxkR3JvdXBDbGFzc05hbWUudmFsdWU7XG4gICAgICAgIGZpZWxkLnR5cGUgPSB0aGlzLnR5cGUudmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoZmllbGQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25UeXBlQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICBjb25zdCB0eXBlID0gdGhpcy50eXBlLnZhbHVlO1xuICAgICAgICB0aGlzLmZpZWxkcyA9IHRoaXMuZmllbGRzU2VydmljZS5nZXRUeXBlRmllbGRzKHR5cGUpO1xuICAgICAgICBjb25zdCBkZXNpZ25lclR5cGUgPSB0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLnR5cGVzW3R5cGVdO1xuICAgICAgICB0aGlzLmZpZWxkQXJyYXkgPSBkZXNpZ25lclR5cGUgJiYgZGVzaWduZXJUeXBlLmZpZWxkQXJyYXk7XG4gICAgICAgIHRoaXMuZmllbGRGb3JtID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgICAgIHRoaXMuZmllbGQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpZWxkKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVWYWx1ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvbldyYXBwZXJzU2VsZWN0ZWQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlRmllbGQoZmllbGQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdG9yKGNvbnRyb2w6IEZvcm1Hcm91cCk6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9IHtcbiAgICAgICAgY29uc3QgdHlwZSA9IGNvbnRyb2wuZ2V0KCd0eXBlJykgYXMgRm9ybUNvbnRyb2w7XG4gICAgICAgIGNvbnN0IGhhc1R5cGUgPSBpc1N0cmluZyh0eXBlLnZhbHVlKSAmJiB0eXBlLnZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xuXG4gICAgICAgIGNvbnN0IGtleSA9IGNvbnRyb2wuZ2V0KCdrZXknKSBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyBrZXk6IGZhbHNlLCB0eXBlOiB0aGlzLnNob3dUeXBlICYmICFoYXNUeXBlLCBjb25mbGljdDogZmFsc2UgfTtcbiAgICAgICAgaWYgKGhhc1R5cGUgJiYgKCFpc1N0cmluZyhrZXkudmFsdWUpIHx8IGtleS52YWx1ZS50cmltKCkubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgcmVzdWx0LmtleSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0LmtleSB8fCByZXN1bHQudHlwZSA/IHJlc3VsdCA6IG51bGw7XG4gICAgfVxufVxuIl19