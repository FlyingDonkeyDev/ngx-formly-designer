/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { timer } from 'rxjs';
/** @type {?} */
const WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => WrapperSelectComponent)),
    multi: true
};
export class WrapperSelectComponent {
    /**
     * @param {?} formlyDesignerConfig
     */
    constructor(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formControl = new FormControl();
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        timer().subscribe((/**
         * @return {?}
         */
        () => {
            this.wrappers = Object.keys(this.formlyDesignerConfig.wrappers);
            if (this.wrappers.length > 0) {
                this.formControl.setValue(this.wrappers[0]);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.valueChangesSubscription = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            if (this.onChange) {
                this.onChange(value);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.formControl.setValue(obj);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
    }
}
WrapperSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-wrapper-select',
                template: `
        <select [formControl]="formControl" class="custom-select">
            <option *ngFor="let wrapper of wrappers" [ngValue]="wrapper">{{ wrapper }}</option>
        </select>
    `,
                providers: [WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR],
                styles: [`
        select {
            width: 100%;
        }
    `]
            }] }
];
/** @nocollapse */
WrapperSelectComponent.ctorParameters = () => [
    { type: FormlyDesignerConfig }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1zZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd3JhcHBlci1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUF3QixXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQzs7TUFFckMscUNBQXFDLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLEVBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDZDtBQWdCRCxNQUFNLE9BQU8sc0JBQXNCOzs7O0lBRy9CLFlBQ1ksb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFHdEQsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBR3RCLGFBQVE7Ozs7UUFBRyxDQUFDLEtBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFDO1FBQy9CLGNBQVM7OztRQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQztJQU41QixDQUFDOzs7O0lBUUwsZUFBZTtRQUNYLEtBQUssRUFBRSxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0M7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUM1RSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsR0FBUTtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUI7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDOzs7WUFsRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLFFBQVEsRUFBRTs7OztLQUlUO2dCQU1ELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO3lCQUx6Qzs7OztLQUlSO2FBRUo7Ozs7WUF0QlEsb0JBQW9COzs7Ozs7O0lBd0J6QiwwREFBK0M7O0lBTS9DLDZDQUFnQzs7SUFDaEMsMENBQW1COzs7OztJQUVuQiwwQ0FBeUM7Ozs7O0lBQ3pDLDJDQUFnQzs7Ozs7SUFQNUIsc0RBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IFdSQVBQRVJfU0VMRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBXcmFwcGVyU2VsZWN0Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItd3JhcHBlci1zZWxlY3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWxlY3QgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCIgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCI+XG4gICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCB3cmFwcGVyIG9mIHdyYXBwZXJzXCIgW25nVmFsdWVdPVwid3JhcHBlclwiPnt7IHdyYXBwZXIgfX08L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIHNlbGVjdCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgIGBdLFxuICAgIHByb3ZpZGVyczogW1dSQVBQRVJfU0VMRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFdyYXBwZXJTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBPbkluaXQge1xuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWdcbiAgICApIHsgfVxuXG4gICAgZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICB3cmFwcGVyczogc3RyaW5nW107XG5cbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2UgPSAodmFsdWU6IGFueSkgPT4geyB9O1xuICAgIHByb3RlY3RlZCBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRpbWVyKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlcnMgPSBPYmplY3Qua2V5cyh0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLndyYXBwZXJzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLndyYXBwZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMud3JhcHBlcnNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKG9iaik7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=