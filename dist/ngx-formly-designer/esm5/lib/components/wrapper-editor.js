/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldsService } from '../fields.service';
import { timer } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { cloneDeep, isObject } from '../util';
/** @type {?} */
var WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return WrapperEditorComponent; })),
    multi: true
};
var WrapperEditorComponent = /** @class */ (function () {
    function WrapperEditorComponent(fieldsService, formBuilder) {
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.subscriptions = [];
        this.fields = [];
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        this.fieldForm = formBuilder.group({});
    }
    /**
     * @return {?}
     */
    WrapperEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.fieldForm.statusChanges
            .pipe(switchMap((/**
         * @return {?}
         */
        function () { return timer(); })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.invalid = _this.fieldForm.invalid; })));
        this.subscribeValueChanges();
    };
    /**
     * @return {?}
     */
    WrapperEditorComponent.prototype.ngOnDestroy = /**
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
     * @param {?} changes
     * @return {?}
     */
    WrapperEditorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.wrapper) {
            if (this.valueChangesSubscription) {
                this.valueChangesSubscription.unsubscribe();
            }
            this.fields = this.fieldsService.getWrapperFields(this.wrapper);
            this.fieldForm = this.formBuilder.group({});
            this.field = Object.assign({}, this.field);
            if (this.valueChangesSubscription) {
                this.subscribeValueChanges();
            }
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    WrapperEditorComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        this.valueChangesSubscription.unsubscribe();
        if (!isObject(obj)) {
            obj = {};
        }
        this.fields = this.fieldsService.getWrapperFields(this.wrapper);
        this.fieldForm = this.formBuilder.group({});
        this.field = cloneDeep(obj);
        this.subscribeValueChanges();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WrapperEditorComponent.prototype.registerOnChange = /**
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
    WrapperEditorComponent.prototype.registerOnTouched = /**
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
    WrapperEditorComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.fieldForm.disable();
        }
        else {
            this.fieldForm.enable();
        }
    };
    /**
     * @private
     * @return {?}
     */
    WrapperEditorComponent.prototype.subscribeValueChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.valueChangesSubscription = this.fieldForm.valueChanges
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.updateValue(); }));
    };
    /**
     * @private
     * @return {?}
     */
    WrapperEditorComponent.prototype.updateValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.onChange) {
            return;
        }
        this.onChange(this.field);
    };
    WrapperEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-wrapper-editor',
                    template: "\n        <form [formGroup]=\"fieldForm\" novalidate>\n            <div class=\"card\">\n                <div class=\"card-body\">\n                    <formly-form [form]=\"fieldForm\" [fields]=\"fields\" [model]=\"field\">\n                    </formly-form>\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </form>\n    ",
                    providers: [
                        WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR
                    ]
                }] }
    ];
    /** @nocollapse */
    WrapperEditorComponent.ctorParameters = function () { return [
        { type: FieldsService },
        { type: FormBuilder }
    ]; };
    WrapperEditorComponent.propDecorators = {
        wrapper: [{ type: Input }]
    };
    return WrapperEditorComponent;
}());
export { WrapperEditorComponent };
if (false) {
    /** @type {?} */
    WrapperEditorComponent.prototype.wrapper;
    /**
     * @type {?}
     * @private
     */
    WrapperEditorComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    WrapperEditorComponent.prototype.valueChangesSubscription;
    /** @type {?} */
    WrapperEditorComponent.prototype.invalid;
    /** @type {?} */
    WrapperEditorComponent.prototype.fieldForm;
    /** @type {?} */
    WrapperEditorComponent.prototype.field;
    /** @type {?} */
    WrapperEditorComponent.prototype.fields;
    /**
     * @type {?}
     * @protected
     */
    WrapperEditorComponent.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    WrapperEditorComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    WrapperEditorComponent.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    WrapperEditorComponent.prototype.formBuilder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1lZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd3JhcHBlci1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUF3QixXQUFXLEVBQWEsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFnQixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7SUFFeEMscUNBQXFDLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLHNCQUFzQixFQUF0QixDQUFzQixFQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ2Q7QUFFRDtJQXVCSSxnQ0FDWSxhQUE0QixFQUM1QixXQUF3QjtRQUR4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUxuQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFhcEQsV0FBTSxHQUF3QixFQUFFLENBQUM7UUFFdkIsYUFBUTs7OztRQUFHLFVBQUMsS0FBVSxJQUFPLENBQUMsRUFBQztRQUMvQixjQUFTOzs7UUFBRyxjQUFRLENBQUMsRUFBQztRQVQ1QixJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7OztJQVVELHlDQUFROzs7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QUMsQ0FBQyxDQUFDO2FBQ3JCLFNBQVM7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxFQUFFLEVBQWxCLENBQWtCLEVBQUMsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUVPLDRDQUFXOzs7O0lBQW5CO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Z0JBeEdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxRQUFRLEVBQUUsd1hBVVQ7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQLHFDQUFxQztxQkFDeEM7aUJBQ0o7Ozs7Z0JBM0JRLGFBQWE7Z0JBRlMsV0FBVzs7OzBCQStCckMsS0FBSzs7SUF1RlYsNkJBQUM7Q0FBQSxBQXpHRCxJQXlHQztTQXhGWSxzQkFBc0I7OztJQUMvQix5Q0FBeUI7Ozs7O0lBRXpCLCtDQUFvRDs7Ozs7SUFDcEQsMERBQStDOztJQVMvQyx5Q0FBaUI7O0lBQ2pCLDJDQUFxQjs7SUFDckIsdUNBQXlCOztJQUN6Qix3Q0FBaUM7Ozs7O0lBRWpDLDBDQUF5Qzs7Ozs7SUFDekMsMkNBQWdDOzs7OztJQVo1QiwrQ0FBb0M7Ozs7O0lBQ3BDLDZDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjbG9uZURlZXAsIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbCc7XG5cbmNvbnN0IFdSQVBQRVJfRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBXcmFwcGVyRWRpdG9yQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItd3JhcHBlci1lZGl0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwiZmllbGRGb3JtXCIgbm92YWxpZGF0ZT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybWx5LWZvcm0gW2Zvcm1dPVwiZmllbGRGb3JtXCIgW2ZpZWxkc109XCJmaWVsZHNcIiBbbW9kZWxdPVwiZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtbHktZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBXUkFQUEVSX0VESVRPUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBXcmFwcGVyRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICAgIEBJbnB1dCgpIHdyYXBwZXI6IHN0cmluZztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIHZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZmllbGRzU2VydmljZTogRmllbGRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXJcbiAgICApIHtcbiAgICAgICAgdGhpcy5maWVsZEZvcm0gPSBmb3JtQnVpbGRlci5ncm91cCh7fSk7XG4gICAgfVxuXG4gICAgaW52YWxpZDogYm9vbGVhbjtcbiAgICBmaWVsZEZvcm06IEZvcm1Hcm91cDtcbiAgICBmaWVsZDogRm9ybWx5RmllbGRDb25maWc7XG4gICAgZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW107XG5cbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2UgPSAodmFsdWU6IGFueSkgPT4geyB9O1xuICAgIHByb3RlY3RlZCBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5maWVsZEZvcm0uc3RhdHVzQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoc3dpdGNoTWFwKCgpID0+IHRpbWVyKCkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmludmFsaWQgPSB0aGlzLmZpZWxkRm9ybS5pbnZhbGlkKSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpYmVWYWx1ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZSgwKS5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy53cmFwcGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maWVsZHMgPSB0aGlzLmZpZWxkc1NlcnZpY2UuZ2V0V3JhcHBlckZpZWxkcyh0aGlzLndyYXBwZXIpO1xuICAgICAgICAgICAgdGhpcy5maWVsZEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgICAgICAgICAgIHRoaXMuZmllbGQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpZWxkKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVmFsdWVDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgICAgICAgICAgb2JqID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWVsZHMgPSB0aGlzLmZpZWxkc1NlcnZpY2UuZ2V0V3JhcHBlckZpZWxkcyh0aGlzLndyYXBwZXIpO1xuICAgICAgICB0aGlzLmZpZWxkRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgICAgICB0aGlzLmZpZWxkID0gY2xvbmVEZWVwKG9iaik7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVmFsdWVDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkRm9ybS5kaXNhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpZWxkRm9ybS5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3Vic2NyaWJlVmFsdWVDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuZmllbGRGb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDApKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVZhbHVlKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5vbkNoYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmZpZWxkKTtcbiAgICB9XG59XG4iXX0=