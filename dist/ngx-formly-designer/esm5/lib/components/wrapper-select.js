/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { timer } from 'rxjs';
/** @type {?} */
var WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return WrapperSelectComponent; })),
    multi: true
};
var WrapperSelectComponent = /** @class */ (function () {
    function WrapperSelectComponent(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formControl = new FormControl();
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @return {?}
     */
    WrapperSelectComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        timer().subscribe((/**
         * @return {?}
         */
        function () {
            _this.wrappers = Object.keys(_this.formlyDesignerConfig.wrappers);
            if (_this.wrappers.length > 0) {
                _this.formControl.setValue(_this.wrappers[0]);
            }
        }));
    };
    /**
     * @return {?}
     */
    WrapperSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.valueChangesSubscription = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (_this.onChange) {
                _this.onChange(value);
            }
        }));
    };
    /**
     * @return {?}
     */
    WrapperSelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    WrapperSelectComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        this.formControl.setValue(obj);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WrapperSelectComponent.prototype.registerOnChange = /**
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
    WrapperSelectComponent.prototype.registerOnTouched = /**
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
    WrapperSelectComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
    };
    WrapperSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-wrapper-select',
                    template: "\n        <select [formControl]=\"formControl\" class=\"custom-select\">\n            <option *ngFor=\"let wrapper of wrappers\" [ngValue]=\"wrapper\">{{ wrapper }}</option>\n        </select>\n    ",
                    providers: [WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR],
                    styles: ["\n        select {\n            width: 100%;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    WrapperSelectComponent.ctorParameters = function () { return [
        { type: FormlyDesignerConfig }
    ]; };
    return WrapperSelectComponent;
}());
export { WrapperSelectComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WrapperSelectComponent.prototype.valueChangesSubscription;
    /** @type {?} */
    WrapperSelectComponent.prototype.formControl;
    /** @type {?} */
    WrapperSelectComponent.prototype.wrappers;
    /**
     * @type {?}
     * @protected
     */
    WrapperSelectComponent.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    WrapperSelectComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    WrapperSelectComponent.prototype.formlyDesignerConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1zZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd3JhcHBlci1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUF3QixXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQzs7SUFFckMscUNBQXFDLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLHNCQUFzQixFQUF0QixDQUFzQixFQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ2Q7QUFFRDtJQWlCSSxnQ0FDWSxvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUd0RCxnQkFBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFHdEIsYUFBUTs7OztRQUFHLFVBQUMsS0FBVSxJQUFPLENBQUMsRUFBQztRQUMvQixjQUFTOzs7UUFBRyxjQUFRLENBQUMsRUFBQztJQU41QixDQUFDOzs7O0lBUUwsZ0RBQWU7OztJQUFmO1FBQUEsaUJBT0M7UUFORyxLQUFLLEVBQUUsQ0FBQyxTQUFTOzs7UUFBQztZQUNkLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEUsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELHlDQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDekUsSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCw0Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFRCwyQ0FBVTs7OztJQUFWLFVBQVcsR0FBUTtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsaURBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxrREFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELGlEQUFnQjs7OztJQUFoQixVQUFpQixVQUFtQjtRQUNoQyxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUI7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDOztnQkFsRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLFFBQVEsRUFBRSx3TUFJVDtvQkFNRCxTQUFTLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQzs2QkFMekMsK0RBSVI7aUJBRUo7Ozs7Z0JBdEJRLG9CQUFvQjs7SUE0RTdCLDZCQUFDO0NBQUEsQUFuRUQsSUFtRUM7U0FyRFksc0JBQXNCOzs7Ozs7SUFDL0IsMERBQStDOztJQU0vQyw2Q0FBZ0M7O0lBQ2hDLDBDQUFtQjs7Ozs7SUFFbkIsMENBQXlDOzs7OztJQUN6QywyQ0FBZ0M7Ozs7O0lBUDVCLHNEQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgZm9yd2FyZFJlZiwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci1jb25maWcnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuXG5jb25zdCBXUkFQUEVSX1NFTEVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gV3JhcHBlclNlbGVjdENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItc2VsZWN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c2VsZWN0IFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiPlxuICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgd3JhcHBlciBvZiB3cmFwcGVyc1wiIFtuZ1ZhbHVlXT1cIndyYXBwZXJcIj57eyB3cmFwcGVyIH19PC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICBzZWxlY3Qge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBwcm92aWRlcnM6IFtXUkFQUEVSX1NFTEVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBXcmFwcGVyU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgICBwcml2YXRlIHZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZm9ybWx5RGVzaWduZXJDb25maWc6IEZvcm1seURlc2lnbmVyQ29uZmlnXG4gICAgKSB7IH1cblxuICAgIGZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgd3JhcHBlcnM6IHN0cmluZ1tdO1xuXG4gICAgcHJvdGVjdGVkIG9uQ2hhbmdlID0gKHZhbHVlOiBhbnkpID0+IHsgfTtcbiAgICBwcm90ZWN0ZWQgb25Ub3VjaGVkID0gKCkgPT4geyB9O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aW1lcigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJzID0gT2JqZWN0LmtleXModGhpcy5mb3JtbHlEZXNpZ25lckNvbmZpZy53cmFwcGVycyk7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwcGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLndyYXBwZXJzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZShvYmopO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19