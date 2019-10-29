/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldsService } from '../fields.service';
import { timer } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { cloneDeep, isObject } from '../util';
/** @type {?} */
const WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => WrapperEditorComponent)),
    multi: true
};
export class WrapperEditorComponent {
    /**
     * @param {?} fieldsService
     * @param {?} formBuilder
     */
    constructor(fieldsService, formBuilder) {
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.subscriptions = [];
        this.fields = [];
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this.fieldForm = formBuilder.group({});
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.fieldForm.statusChanges
            .pipe(switchMap((/**
         * @return {?}
         */
        () => timer())))
            .subscribe((/**
         * @return {?}
         */
        () => this.invalid = this.fieldForm.invalid)));
        this.subscribeValueChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
        this.subscriptions.splice(0).forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        subscription => subscription.unsubscribe()));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.valueChangesSubscription.unsubscribe();
        if (!isObject(obj)) {
            obj = {};
        }
        this.fields = this.fieldsService.getWrapperFields(this.wrapper);
        this.fieldForm = this.formBuilder.group({});
        this.field = cloneDeep(obj);
        this.subscribeValueChanges();
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
            this.fieldForm.disable();
        }
        else {
            this.fieldForm.enable();
        }
    }
    /**
     * @private
     * @return {?}
     */
    subscribeValueChanges() {
        this.valueChangesSubscription = this.fieldForm.valueChanges
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        () => this.updateValue()));
    }
    /**
     * @private
     * @return {?}
     */
    updateValue() {
        if (!this.onChange) {
            return;
        }
        this.onChange(this.field);
    }
}
WrapperEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-wrapper-editor',
                template: `
        <form [formGroup]="fieldForm" novalidate>
            <div class="card">
                <div class="card-body">
                    <formly-form [form]="fieldForm" [fields]="fields" [model]="field">
                    </formly-form>
                    <ng-content></ng-content>
                </div>
            </div>
        </form>
    `,
                providers: [
                    WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR
                ]
            }] }
];
/** @nocollapse */
WrapperEditorComponent.ctorParameters = () => [
    { type: FieldsService },
    { type: FormBuilder }
];
WrapperEditorComponent.propDecorators = {
    wrapper: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1lZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd3JhcHBlci1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUF3QixXQUFXLEVBQWEsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFnQixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7TUFFeEMscUNBQXFDLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLEVBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDZDtBQW1CRCxNQUFNLE9BQU8sc0JBQXNCOzs7OztJQU0vQixZQUNZLGFBQTRCLEVBQzVCLFdBQXdCO1FBRHhCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTG5CLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQWFwRCxXQUFNLEdBQXdCLEVBQUUsQ0FBQztRQUV2QixhQUFROzs7O1FBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBQztRQUMvQixjQUFTOzs7UUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUM7UUFUNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FB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QUM7Ozs7O0lBRU8sV0FBVztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7OztZQXhHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0tBVVQ7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLHFDQUFxQztpQkFDeEM7YUFDSjs7OztZQTNCUSxhQUFhO1lBRlMsV0FBVzs7O3NCQStCckMsS0FBSzs7OztJQUFOLHlDQUF5Qjs7Ozs7SUFFekIsK0NBQW9EOzs7OztJQUNwRCwwREFBK0M7O0lBUy9DLHlDQUFpQjs7SUFDakIsMkNBQXFCOztJQUNyQix1Q0FBeUI7O0lBQ3pCLHdDQUFpQzs7Ozs7SUFFakMsMENBQXlDOzs7OztJQUN6QywyQ0FBZ0M7Ozs7O0lBWjVCLCtDQUFvQzs7Ozs7SUFDcEMsNkNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkc1NlcnZpY2UgfSBmcm9tICcuLi9maWVsZHMuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNsb25lRGVlcCwgaXNPYmplY3QgfSBmcm9tICcuLi91dGlsJztcblxuY29uc3QgV1JBUFBFUl9FRElUT1JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFdyYXBwZXJFZGl0b3JDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJmaWVsZEZvcm1cIiBub3ZhbGlkYXRlPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtbHktZm9ybSBbZm9ybV09XCJmaWVsZEZvcm1cIiBbZmllbGRzXT1cImZpZWxkc1wiIFttb2RlbF09XCJmaWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm1seS1mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFdSQVBQRVJfRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFdyYXBwZXJFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gICAgQElucHV0KCkgd3JhcHBlcjogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlclxuICAgICkge1xuICAgICAgICB0aGlzLmZpZWxkRm9ybSA9IGZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgICB9XG5cbiAgICBpbnZhbGlkOiBib29sZWFuO1xuICAgIGZpZWxkRm9ybTogRm9ybUdyb3VwO1xuICAgIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcbiAgICBmaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10gPSBbXTtcblxuICAgIHByb3RlY3RlZCBvbkNoYW5nZSA9ICh2YWx1ZTogYW55KSA9PiB7IH07XG4gICAgcHJvdGVjdGVkIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmZpZWxkRm9ybS5zdGF0dXNDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzd2l0Y2hNYXAoKCkgPT4gdGltZXIoKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaW52YWxpZCA9IHRoaXMuZmllbGRGb3JtLmludmFsaWQpKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmliZVZhbHVlQ2hhbmdlcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKDApLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLndyYXBwZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IHRoaXMuZmllbGRzU2VydmljZS5nZXRXcmFwcGVyRmllbGRzKHRoaXMud3JhcHBlcik7XG4gICAgICAgICAgICB0aGlzLmZpZWxkRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgICAgICAgICAgdGhpcy5maWVsZCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmllbGQpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVWYWx1ZUNoYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpZWxkcyA9IHRoaXMuZmllbGRzU2VydmljZS5nZXRXcmFwcGVyRmllbGRzKHRoaXMud3JhcHBlcik7XG4gICAgICAgIHRoaXMuZmllbGRGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG4gICAgICAgIHRoaXMuZmllbGQgPSBjbG9uZURlZXAob2JqKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVWYWx1ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGRGb3JtLmRpc2FibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGRGb3JtLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVWYWx1ZUNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5maWVsZEZvcm0udmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlVmFsdWUoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZmllbGQpO1xuICAgIH1cbn1cbiJdfQ==