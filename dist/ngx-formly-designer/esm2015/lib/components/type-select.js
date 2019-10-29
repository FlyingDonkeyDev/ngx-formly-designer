/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { timer } from 'rxjs';
/** @type {?} */
const TYPE_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => TypeSelectComponent)),
    multi: true
};
export class TypeSelectComponent {
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
            this.types = Object.keys(this.formlyDesignerConfig.types);
            if (this.types.length > 0) {
                this.formControl.setValue(this.types[0]);
            }
            this.types.push('fieldGroup');
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
TypeSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-type-select',
                template: `
        <select [formControl]="formControl" class="custom-select">
            <option *ngFor="let type of types" [ngValue]="type">{{ type }}</option>
        </select>
    `,
                providers: [TYPE_SELECT_CONTROL_VALUE_ACCESSOR],
                styles: [`
        select {
            width: 100%;
        }
    `]
            }] }
];
/** @nocollapse */
TypeSelectComponent.ctorParameters = () => [
    { type: FormlyDesignerConfig }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1zZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdHlwZS1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUF3QixXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQzs7TUFFckMsa0NBQWtDLEdBQVE7SUFDNUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLEVBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDZDtBQWdCRCxNQUFNLE9BQU8sbUJBQW1COzs7O0lBTTVCLFlBQ1ksb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFKdEQsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBT3RCLGFBQVE7Ozs7UUFBRyxDQUFDLEtBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFDO1FBQy9CLGNBQVM7OztRQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQztJQUg1QixDQUFDOzs7O0lBS0wsZUFBZTtRQUNYLEtBQUssRUFBRSxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUM1RSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsR0FBUTtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUI7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDOzs7WUFuRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFFBQVEsRUFBRTs7OztLQUlUO2dCQU1ELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO3lCQUx0Qzs7OztLQUlSO2FBRUo7Ozs7WUF0QlEsb0JBQW9COzs7Ozs7O0lBd0J6Qix1REFBK0M7O0lBRS9DLDBDQUFnQzs7SUFDaEMsb0NBQWdCOzs7OztJQU1oQix1Q0FBeUM7Ozs7O0lBQ3pDLHdDQUFnQzs7Ozs7SUFKNUIsbURBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IFRZUEVfU0VMRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUeXBlU2VsZWN0Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItdHlwZS1zZWxlY3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWxlY3QgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCIgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCI+XG4gICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCB0eXBlIG9mIHR5cGVzXCIgW25nVmFsdWVdPVwidHlwZVwiPnt7IHR5cGUgfX08L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIHNlbGVjdCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgIGBdLFxuICAgIHByb3ZpZGVyczogW1RZUEVfU0VMRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFR5cGVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBPbkluaXQge1xuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBmb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgIHR5cGVzOiBzdHJpbmdbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZ1xuICAgICkgeyB9XG5cbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2UgPSAodmFsdWU6IGFueSkgPT4geyB9O1xuICAgIHByb3RlY3RlZCBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRpbWVyKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHlwZXMgPSBPYmplY3Qua2V5cyh0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLnR5cGVzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMudHlwZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50eXBlcy5wdXNoKCdmaWVsZEdyb3VwJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUob2JqKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==