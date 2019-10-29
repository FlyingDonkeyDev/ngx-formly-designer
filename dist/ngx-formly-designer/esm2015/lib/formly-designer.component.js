/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            <formly-form [options]="options" [model]="model" [form]="form" [fields]="fields">
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
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerComponent.prototype.formlyDesignerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFJLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWdDL0QsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7O0lBZWhDLFlBQ1ksYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIscUJBQTRDO1FBRjVDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFoQjlDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQXVCLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRWhELFVBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLGdCQUFXLEdBQXdCLEVBQUUsQ0FBQztRQUd0QyxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBRUQsa0JB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V1Q7Z0JBY0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO3lCQWR6Qjs7Ozs7Ozs7Ozs7O0tBWVI7YUFHSjs7OztZQWxDUSxhQUFhO1lBRmIsV0FBVztZQUdYLHFCQUFxQjs7O2tDQW1DekIsU0FBUyxTQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzJCQUMzRCxNQUFNOzBCQUNOLE1BQU07dUJBa0JOLEtBQUs7cUJBU0wsS0FBSztvQkFXTCxLQUFLOzs7O0lBeENOLHNEQUFrRjs7SUFDbEYsK0NBQWlFOztJQUNqRSw4Q0FBZ0Q7O0lBRWhELHdDQUFxQjs7SUFDckIsMkNBQXdCOztJQUN4Qiw2Q0FBMEI7O0lBQzFCLDhDQUFzQzs7SUFFdEMsdUNBQWdCOztJQUNoQiwwQ0FBa0I7Ozs7O0lBRWxCLGdEQUFvRDs7Ozs7SUFHaEQsZ0RBQW9DOzs7OztJQUNwQyw4Q0FBZ0M7Ozs7O0lBQ2hDLHdEQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi9maWVsZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lclNlcnZpY2UgfSBmcm9tICcuL2Zvcm1seS1kZXNpZ25lci5zZXJ2aWNlJztcbmltcG9ydCB7IG1lcmdlLCBORVZFUiwgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLWZpZWxkLXBpY2tlciAoc2VsZWN0ZWQpPVwib25GaWVsZFNlbGVjdGVkKCRldmVudClcIj5cbiAgICAgICAgPC9mb3JtbHktZGVzaWduZXItZmllbGQtcGlja2VyPlxuICAgICAgICA8Zm9ybSBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICAgICAgPGZvcm1seS1mb3JtIFtvcHRpb25zXT1cIm9wdGlvbnNcIiBbbW9kZWxdPVwibW9kZWxcIiBbZm9ybV09XCJmb3JtXCIgW2ZpZWxkc109XCJmaWVsZHNcIj5cbiAgICAgICAgICAgIDwvZm9ybWx5LWZvcm0+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgPCEtLTxkaXY+XG4gICAgICAgICAgICBEZXNpZ25lciBGaWVsZHMgRGVidWc6XG4gICAgICAgICAgICA8cHJlPnt7IGZpZWxkcyB8IGRlY3ljbGUgfCBqc29uIH19PC9wcmU+XG4gICAgICAgIDwvZGl2Pi0tPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICBmb3JtbHktZGVzaWduZXItZmllbGQtcGlja2VyIC5mb3JtLWdyb3VwID4gLmlucHV0LWdyb3VwID4gZm9ybWx5LWRlc2lnbmVyLXR5cGUtc2VsZWN0ID4gc2VsZWN0IHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IC4yNXJlbSAwIDAgLjI1cmVtO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvciAuY2FyZCA+IC5jYXJkLWJvZHkgLmZvcm0tY29udHJvbCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtbHktZGVzaWduZXItd3JhcHBlci1waWNrZXIgLmZvcm0tZ3JvdXAgPiAuaW5wdXQtZ3JvdXAgPiBmb3JtbHktZGVzaWduZXItd3JhcHBlci1zZWxlY3QgPiBzZWxlY3Qge1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjI1cmVtIDAgMCAuMjVyZW07XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0Zvcm1seURlc2lnbmVyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RGVzaWduZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnZm9ybWx5Rm9ybUNvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBmb3JtbHlGb3JtQ29udGFpbmVyO1xuICAgIEBPdXRwdXQoKSBmaWVsZHNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1seUZpZWxkQ29uZmlnW10+KCk7XG4gICAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICB0eXBlczogc3RyaW5nW10gPSBbXTtcbiAgICB3cmFwcGVyczogc3RyaW5nW10gPSBbXTtcbiAgICBwcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGRlYnVnRmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW107XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgb3B0aW9uczogYW55ID0ge307XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lclNlcnZpY2U6IEZvcm1seURlc2lnbmVyU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGZpZWxkcygpOiBGb3JtbHlGaWVsZENvbmZpZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmZpZWxkcztcbiAgICB9XG5cbiAgICBzZXQgZmllbGRzKHZhbHVlOiBGb3JtbHlGaWVsZENvbmZpZ1tdKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNvbnZlcnRGaWVsZHModmFsdWUpO1xuICAgICAgICB0aGlzLmZpZWxkc1NlcnZpY2UubXV0YXRlRmllbGRzKGZpZWxkcywgZmFsc2UpO1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHMgPSBmaWVsZHM7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgbW9kZWwoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLm1vZGVsO1xuICAgIH1cblxuICAgIHNldCBtb2RlbCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLm1vZGVsID0gdmFsdWU7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIERlc2lnbmVyIGZvcm1zIHdpbGwgYmUgcmVzdHJpY3RlZCB0byBhIHNpbmdsZSBmaWVsZCBkZXB0aDsgYWxsIGRlc2lnbmVyIGtleXMgc2hvdWxkIGJlXG4gICAgICAgIC8vIGNvbXBsZXggKGUuZy4gXCJ0ZW1wbGF0ZU9wdGlvbnMuc29tZS5wcm9wZXJ0eVwiKVxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHMkXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc0NoYW5nZS5lbWl0KHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNyZWF0ZURlc2lnbmVyRmllbGRzKCkpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UubW9kZWwkLFxuICAgICAgICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgICApXG4gICAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1vZGVsQ2hhbmdlLmVtaXQodGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UubW9kZWwpKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoMCkuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIG9uRmllbGRTZWxlY3RlZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICAgICAgdGltZXIoKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWVsZHNTZXJ2aWNlLmNoZWNrRmllbGQoZmllbGQsIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmZpZWxkcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuYWRkRmllbGQoZmllbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBORVZFUikpLnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbiJdfQ==