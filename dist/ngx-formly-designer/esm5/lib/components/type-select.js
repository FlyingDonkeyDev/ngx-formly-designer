/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { timer } from 'rxjs';
/** @type {?} */
var TYPE_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return TypeSelectComponent; })),
    multi: true
};
var TypeSelectComponent = /** @class */ (function () {
    function TypeSelectComponent(formlyDesignerConfig) {
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
    TypeSelectComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        timer().subscribe((/**
         * @return {?}
         */
        function () {
            _this.types = Object.keys(_this.formlyDesignerConfig.types);
            if (_this.types.length > 0) {
                _this.formControl.setValue(_this.types[0]);
            }
            _this.types.push('fieldGroup');
        }));
    };
    /**
     * @return {?}
     */
    TypeSelectComponent.prototype.ngOnInit = /**
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
    TypeSelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    TypeSelectComponent.prototype.writeValue = /**
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
    TypeSelectComponent.prototype.registerOnChange = /**
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
    TypeSelectComponent.prototype.registerOnTouched = /**
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
    TypeSelectComponent.prototype.setDisabledState = /**
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
    TypeSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-type-select',
                    template: "\n        <select [formControl]=\"formControl\" class=\"custom-select\">\n            <option *ngFor=\"let type of types\" [ngValue]=\"type\">{{ type }}</option>\n        </select>\n    ",
                    providers: [TYPE_SELECT_CONTROL_VALUE_ACCESSOR],
                    styles: ["\n        select {\n            width: 100%;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    TypeSelectComponent.ctorParameters = function () { return [
        { type: FormlyDesignerConfig }
    ]; };
    return TypeSelectComponent;
}());
export { TypeSelectComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TypeSelectComponent.prototype.valueChangesSubscription;
    /** @type {?} */
    TypeSelectComponent.prototype.formControl;
    /** @type {?} */
    TypeSelectComponent.prototype.types;
    /**
     * @type {?}
     * @protected
     */
    TypeSelectComponent.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    TypeSelectComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    TypeSelectComponent.prototype.formlyDesignerConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1zZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdHlwZS1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUF3QixXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQzs7SUFFckMsa0NBQWtDLEdBQVE7SUFDNUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLG1CQUFtQixFQUFuQixDQUFtQixFQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ2Q7QUFFRDtJQW9CSSw2QkFDWSxvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUp0RCxnQkFBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFPdEIsYUFBUTs7OztRQUFHLFVBQUMsS0FBVSxJQUFPLENBQUMsRUFBQztRQUMvQixjQUFTOzs7UUFBRyxjQUFRLENBQUMsRUFBQztJQUg1QixDQUFDOzs7O0lBS0wsNkNBQWU7OztJQUFmO1FBQUEsaUJBUUM7UUFQRyxLQUFLLEVBQUUsQ0FBQyxTQUFTOzs7UUFBQztZQUNkLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUQsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZCLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QztZQUNELEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDekUsSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFRCx3Q0FBVTs7OztJQUFWLFVBQVcsR0FBUTtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsOENBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCwrQ0FBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELDhDQUFnQjs7OztJQUFoQixVQUFpQixVQUFtQjtRQUNoQyxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUI7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDOztnQkFuRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRSw0TEFJVDtvQkFNRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQzs2QkFMdEMsK0RBSVI7aUJBRUo7Ozs7Z0JBdEJRLG9CQUFvQjs7SUE2RTdCLDBCQUFDO0NBQUEsQUFwRUQsSUFvRUM7U0F0RFksbUJBQW1COzs7Ozs7SUFDNUIsdURBQStDOztJQUUvQywwQ0FBZ0M7O0lBQ2hDLG9DQUFnQjs7Ozs7SUFNaEIsdUNBQXlDOzs7OztJQUN6Qyx3Q0FBZ0M7Ozs7O0lBSjVCLG1EQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgZm9yd2FyZFJlZiwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci1jb25maWcnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuXG5jb25zdCBUWVBFX1NFTEVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVHlwZVNlbGVjdENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyLXR5cGUtc2VsZWN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c2VsZWN0IFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiPlxuICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgdHlwZSBvZiB0eXBlc1wiIFtuZ1ZhbHVlXT1cInR5cGVcIj57eyB0eXBlIH19PC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICBzZWxlY3Qge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBwcm92aWRlcnM6IFtUWVBFX1NFTEVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBUeXBlU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgICBwcml2YXRlIHZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICB0eXBlczogc3RyaW5nW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWdcbiAgICApIHsgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2hhbmdlID0gKHZhbHVlOiBhbnkpID0+IHsgfTtcbiAgICBwcm90ZWN0ZWQgb25Ub3VjaGVkID0gKCkgPT4geyB9O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aW1lcigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnR5cGVzID0gT2JqZWN0LmtleXModGhpcy5mb3JtbHlEZXNpZ25lckNvbmZpZy50eXBlcyk7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLnR5cGVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudHlwZXMucHVzaCgnZmllbGRHcm91cCcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKG9iaik7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=