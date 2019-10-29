/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldsService } from './fields.service';
import { FormlyDesignerService } from './formly-designer.service';
import { merge, NEVER, timer } from 'rxjs';
import { catchError, debounceTime, tap } from 'rxjs/operators';
export class FormlyDesignerComponent {
    /**
     * @param {?} fieldsService
     * @param {?} formBuilder
     * @param {?} formlyDesignerService
     */
    constructor(fieldsService, formBuilder, formlyDesignerService) {
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.formlyDesignerService = formlyDesignerService;
        this.fieldsChange = new EventEmitter();
        this.modelChange = new EventEmitter();
        this.types = [];
        this.wrappers = [];
        this.properties = [];
        this.debugFields = [];
        this.options = {};
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.formlyDesignerService.disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this.formlyDesignerService.disabled = value;
    }
    /**
     * @return {?}
     */
    get fields() {
        return this.formlyDesignerService.fields;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set fields(value) {
        /** @type {?} */
        const fields = this.formlyDesignerService.convertFields(value);
        this.fieldsService.mutateFields(fields, false);
        this.formlyDesignerService.fields = fields;
    }
    /**
     * @return {?}
     */
    get model() {
        return this.formlyDesignerService.model;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set model(value) {
        this.formlyDesignerService.model = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Designer forms will be restricted to a single field depth; all designer keys should be
        // complex (e.g. "templateOptions.some.property")
        this.form = this.formBuilder.group({});
        this.subscriptions.push(this.formlyDesignerService.fields$
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.form = this.formBuilder.group({});
            this.fieldsChange.emit(this.formlyDesignerService.createDesignerFields());
        })));
        this.subscriptions.push(merge(this.formlyDesignerService.model$, this.form.valueChanges)
            .pipe(debounceTime(50))
            .subscribe((/**
         * @return {?}
         */
        () => this.modelChange.emit(this.formlyDesignerService.model))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.splice(0).forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        subscription => subscription.unsubscribe()));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onFieldSelected(field) {
        timer().pipe(tap((/**
         * @return {?}
         */
        () => {
            if (this.fieldsService.checkField(field, this.formlyDesignerService.fields)) {
                this.formlyDesignerService.addField(field);
            }
        })), catchError((/**
         * @return {?}
         */
        () => NEVER))).subscribe();
    }
}
FormlyDesignerComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer',
                template: `
        <formly-designer-field-picker (selected)="onFieldSelected($event)">
        </formly-designer-field-picker>
        <form novalidate [formGroup]="form">
            <formly-form [options]="options" [model]="formlyDesignerService.model" [form]="form" [fields]="formlyDesignerService.fields">
            </formly-form>
        </form>
        <!--<div>
            Designer Fields Debug:
            <pre>{{ fields | decycle | json }}</pre>
        </div>-->
    `,
                encapsulation: ViewEncapsulation.None,
                providers: [FormlyDesignerService],
                styles: [`
        formly-designer-field-picker .form-group > .input-group > formly-designer-type-select > select {
            border-radius: .25rem 0 0 .25rem;
            border-right: 0;
        }
        formly-designer-wrapper-editor .card > .card-body .form-control {
            width: 100%;
        }
        formly-designer-wrapper-picker .form-group > .input-group > formly-designer-wrapper-select > select {
            border-radius: .25rem 0 0 .25rem;
            border-right: 0;
        }
    `]
            }] }
];
/** @nocollapse */
FormlyDesignerComponent.ctorParameters = () => [
    { type: FieldsService },
    { type: FormBuilder },
    { type: FormlyDesignerService }
];
FormlyDesignerComponent.propDecorators = {
    formlyFormContainer: [{ type: ViewChild, args: ['formlyFormContainer', { read: ViewContainerRef },] }],
    fieldsChange: [{ type: Output }],
    modelChange: [{ type: Output }],
    disabled: [{ type: Input }],
    fields: [{ type: Input }],
    model: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FormlyDesignerComponent.prototype.formlyFormContainer;
    /** @type {?} */
    FormlyDesignerComponent.prototype.fieldsChange;
    /** @type {?} */
    FormlyDesignerComponent.prototype.modelChange;
    /** @type {?} */
    FormlyDesignerComponent.prototype.types;
    /** @type {?} */
    FormlyDesignerComponent.prototype.wrappers;
    /** @type {?} */
    FormlyDesignerComponent.prototype.properties;
    /** @type {?} */
    FormlyDesignerComponent.prototype.debugFields;
    /** @type {?} */
    FormlyDesignerComponent.prototype.form;
    /** @type {?} */
    FormlyDesignerComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerComponent.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerComponent.prototype.formBuilder;
    /** @type {?} */
    FormlyDesignerComponent.prototype.formlyDesignerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFJLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWdDL0QsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7O0lBZWhDLFlBQ1ksYUFBNEIsRUFDNUIsV0FBd0IsRUFDekIscUJBQTRDO1FBRjNDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3pCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFoQjdDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQXVCLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRWhELFVBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLGdCQUFXLEdBQXdCLEVBQUUsQ0FBQztRQUd0QyxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBRUQsa0JB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V1Q7Z0JBY0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO3lCQWR6Qjs7Ozs7Ozs7Ozs7O0tBWVI7YUFHSjs7OztZQWxDUSxhQUFhO1lBRmIsV0FBVztZQUdYLHFCQUFxQjs7O2tDQW1DekIsU0FBUyxTQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzJCQUMzRCxNQUFNOzBCQUNOLE1BQU07dUJBa0JOLEtBQUs7cUJBU0wsS0FBSztvQkFXTCxLQUFLOzs7O0lBeENOLHNEQUFrRjs7SUFDbEYsK0NBQWlFOztJQUNqRSw4Q0FBZ0Q7O0lBRWhELHdDQUFxQjs7SUFDckIsMkNBQXdCOztJQUN4Qiw2Q0FBMEI7O0lBQzFCLDhDQUFzQzs7SUFFdEMsdUNBQWdCOztJQUNoQiwwQ0FBa0I7Ozs7O0lBRWxCLGdEQUFvRDs7Ozs7SUFHaEQsZ0RBQW9DOzs7OztJQUNwQyw4Q0FBZ0M7O0lBQ2hDLHdEQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi9maWVsZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lclNlcnZpY2UgfSBmcm9tICcuL2Zvcm1seS1kZXNpZ25lci5zZXJ2aWNlJztcbmltcG9ydCB7IG1lcmdlLCBORVZFUiwgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLWZpZWxkLXBpY2tlciAoc2VsZWN0ZWQpPVwib25GaWVsZFNlbGVjdGVkKCRldmVudClcIj5cbiAgICAgICAgPC9mb3JtbHktZGVzaWduZXItZmllbGQtcGlja2VyPlxuICAgICAgICA8Zm9ybSBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICAgICAgPGZvcm1seS1mb3JtIFtvcHRpb25zXT1cIm9wdGlvbnNcIiBbbW9kZWxdPVwiZm9ybWx5RGVzaWduZXJTZXJ2aWNlLm1vZGVsXCIgW2Zvcm1dPVwiZm9ybVwiIFtmaWVsZHNdPVwiZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmZpZWxkc1wiPlxuICAgICAgICAgICAgPC9mb3JtbHktZm9ybT5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8IS0tPGRpdj5cbiAgICAgICAgICAgIERlc2lnbmVyIEZpZWxkcyBEZWJ1ZzpcbiAgICAgICAgICAgIDxwcmU+e3sgZmllbGRzIHwgZGVjeWNsZSB8IGpzb24gfX08L3ByZT5cbiAgICAgICAgPC9kaXY+LS0+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIGZvcm1seS1kZXNpZ25lci1maWVsZC1waWNrZXIgLmZvcm0tZ3JvdXAgPiAuaW5wdXQtZ3JvdXAgPiBmb3JtbHktZGVzaWduZXItdHlwZS1zZWxlY3QgPiBzZWxlY3Qge1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjI1cmVtIDAgMCAuMjVyZW07XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItZWRpdG9yIC5jYXJkID4gLmNhcmQtYm9keSAuZm9ybS1jb250cm9sIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1seS1kZXNpZ25lci13cmFwcGVyLXBpY2tlciAuZm9ybS1ncm91cCA+IC5pbnB1dC1ncm91cCA+IGZvcm1seS1kZXNpZ25lci13cmFwcGVyLXNlbGVjdCA+IHNlbGVjdCB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAuMjVyZW0gMCAwIC4yNXJlbTtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMDtcbiAgICAgICAgfVxuICAgIGBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbRm9ybWx5RGVzaWduZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlEZXNpZ25lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdmb3JtbHlGb3JtQ29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGZvcm1seUZvcm1Db250YWluZXI7XG4gICAgQE91dHB1dCgpIGZpZWxkc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9ybWx5RmllbGRDb25maWdbXT4oKTtcbiAgICBAT3V0cHV0KCkgbW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHR5cGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByb3BlcnRpZXM6IHN0cmluZ1tdID0gW107XG4gICAgZGVidWdGaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10gPSBbXTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcbiAgICBvcHRpb25zOiBhbnkgPSB7fTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZpZWxkc1NlcnZpY2U6IEZpZWxkc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwdWJsaWMgZm9ybWx5RGVzaWduZXJTZXJ2aWNlOiBGb3JtbHlEZXNpZ25lclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBmaWVsZHMoKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHM7XG4gICAgfVxuXG4gICAgc2V0IGZpZWxkcyh2YWx1ZTogRm9ybWx5RmllbGRDb25maWdbXSkge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jb252ZXJ0RmllbGRzKHZhbHVlKTtcbiAgICAgICAgdGhpcy5maWVsZHNTZXJ2aWNlLm11dGF0ZUZpZWxkcyhmaWVsZHMsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzID0gZmllbGRzO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1vZGVsKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5tb2RlbDtcbiAgICB9XG5cbiAgICBzZXQgbW9kZWwodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5tb2RlbCA9IHZhbHVlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBEZXNpZ25lciBmb3JtcyB3aWxsIGJlIHJlc3RyaWN0ZWQgdG8gYSBzaW5nbGUgZmllbGQgZGVwdGg7IGFsbCBkZXNpZ25lciBrZXlzIHNob3VsZCBiZVxuICAgICAgICAvLyBjb21wbGV4IChlLmcuIFwidGVtcGxhdGVPcHRpb25zLnNvbWUucHJvcGVydHlcIilcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzJFxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNDaGFuZ2UuZW1pdCh0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jcmVhdGVEZXNpZ25lckZpZWxkcygpKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChtZXJnZShcbiAgICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLm1vZGVsJCxcbiAgICAgICAgICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXNcbiAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tb2RlbENoYW5nZS5lbWl0KHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLm1vZGVsKSkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKDApLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICBvbkZpZWxkU2VsZWN0ZWQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgICAgIHRpbWVyKCkucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzU2VydmljZS5jaGVja0ZpZWxkKGZpZWxkLCB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmFkZEZpZWxkKGZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gTkVWRVIpKS5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4iXX0=