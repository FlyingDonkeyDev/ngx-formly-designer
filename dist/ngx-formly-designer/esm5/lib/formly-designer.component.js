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
var FormlyDesignerComponent = /** @class */ (function () {
    function FormlyDesignerComponent(fieldsService, formBuilder, formlyDesignerService) {
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
    Object.defineProperty(FormlyDesignerComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.formlyDesignerService.disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.formlyDesignerService.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyDesignerComponent.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () {
            return this.formlyDesignerService.fields;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var fields = this.formlyDesignerService.convertFields(value);
            this.fieldsService.mutateFields(fields, false);
            this.formlyDesignerService.fields = fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyDesignerComponent.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () {
            return this.formlyDesignerService.model;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.formlyDesignerService.model = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormlyDesignerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Designer forms will be restricted to a single field depth; all designer keys should be
        // complex (e.g. "templateOptions.some.property")
        this.form = this.formBuilder.group({});
        this.subscriptions.push(this.formlyDesignerService.fields$
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.form = _this.formBuilder.group({});
            _this.fieldsChange.emit(_this.formlyDesignerService.createDesignerFields());
        })));
        this.subscriptions.push(merge(this.formlyDesignerService.model$, this.form.valueChanges)
            .pipe(debounceTime(50))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.modelChange.emit(_this.formlyDesignerService.model); })));
    };
    /**
     * @return {?}
     */
    FormlyDesignerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.splice(0).forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        function (subscription) { return subscription.unsubscribe(); }));
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerComponent.prototype.onFieldSelected = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        timer().pipe(tap((/**
         * @return {?}
         */
        function () {
            if (_this.fieldsService.checkField(field, _this.formlyDesignerService.fields)) {
                _this.formlyDesignerService.addField(field);
            }
        })), catchError((/**
         * @return {?}
         */
        function () { return NEVER; }))).subscribe();
    };
    FormlyDesignerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer',
                    template: "\n        <formly-designer-field-picker (selected)=\"onFieldSelected($event)\">\n        </formly-designer-field-picker>\n        <form novalidate [formGroup]=\"form\">\n            <formly-form [options]=\"options\" [model]=\"formlyDesignerService.model\" [form]=\"form\" [fields]=\"formlyDesignerService.fields\">\n            </formly-form>\n        </form>\n        <!--<div>\n            Designer Fields Debug:\n            <pre>{{ fields | decycle | json }}</pre>\n        </div>-->\n    ",
                    encapsulation: ViewEncapsulation.None,
                    providers: [FormlyDesignerService],
                    styles: ["\n        formly-designer-field-picker .form-group > .input-group > formly-designer-type-select > select {\n            border-radius: .25rem 0 0 .25rem;\n            border-right: 0;\n        }\n        formly-designer-wrapper-editor .card > .card-body .form-control {\n            width: 100%;\n        }\n        formly-designer-wrapper-picker .form-group > .input-group > formly-designer-wrapper-select > select {\n            border-radius: .25rem 0 0 .25rem;\n            border-right: 0;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    FormlyDesignerComponent.ctorParameters = function () { return [
        { type: FieldsService },
        { type: FormBuilder },
        { type: FormlyDesignerService }
    ]; };
    FormlyDesignerComponent.propDecorators = {
        formlyFormContainer: [{ type: ViewChild, args: ['formlyFormContainer', { read: ViewContainerRef },] }],
        fieldsChange: [{ type: Output }],
        modelChange: [{ type: Output }],
        disabled: [{ type: Input }],
        fields: [{ type: Input }],
        model: [{ type: Input }]
    };
    return FormlyDesignerComponent;
}());
export { FormlyDesignerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFJLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRDtJQTZDSSxpQ0FDWSxhQUE0QixFQUM1QixXQUF3QixFQUN6QixxQkFBNEM7UUFGM0Msa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDekIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWhCN0MsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBdUIsQ0FBQztRQUN2RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFaEQsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFDMUIsZ0JBQVcsR0FBd0IsRUFBRSxDQUFDO1FBR3RDLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFFRCxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFN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QUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsZ2ZBV1Q7b0JBY0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDOzZCQWR6QixpZ0JBWVI7aUJBR0o7Ozs7Z0JBbENRLGFBQWE7Z0JBRmIsV0FBVztnQkFHWCxxQkFBcUI7OztzQ0FtQ3pCLFNBQVMsU0FBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTsrQkFDM0QsTUFBTTs4QkFDTixNQUFNOzJCQWtCTixLQUFLO3lCQVNMLEtBQUs7d0JBV0wsS0FBSzs7SUF5Q1YsOEJBQUM7Q0FBQSxBQWhIRCxJQWdIQztTQWxGWSx1QkFBdUI7OztJQUNoQyxzREFBa0Y7O0lBQ2xGLCtDQUFpRTs7SUFDakUsOENBQWdEOztJQUVoRCx3Q0FBcUI7O0lBQ3JCLDJDQUF3Qjs7SUFDeEIsNkNBQTBCOztJQUMxQiw4Q0FBc0M7O0lBRXRDLHVDQUFnQjs7SUFDaEIsMENBQWtCOzs7OztJQUVsQixnREFBb0Q7Ozs7O0lBR2hELGdEQUFvQzs7Ozs7SUFDcEMsOENBQWdDOztJQUNoQyx3REFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRzU2VydmljZSB9IGZyb20gJy4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJTZXJ2aWNlIH0gZnJvbSAnLi9mb3JtbHktZGVzaWduZXIuc2VydmljZSc7XG5pbXBvcnQgeyBtZXJnZSwgTkVWRVIsIFN1YnNjcmlwdGlvbiwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGZvcm1seS1kZXNpZ25lci1maWVsZC1waWNrZXIgKHNlbGVjdGVkKT1cIm9uRmllbGRTZWxlY3RlZCgkZXZlbnQpXCI+XG4gICAgICAgIDwvZm9ybWx5LWRlc2lnbmVyLWZpZWxkLXBpY2tlcj5cbiAgICAgICAgPGZvcm0gbm92YWxpZGF0ZSBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgICAgIDxmb3JtbHktZm9ybSBbb3B0aW9uc109XCJvcHRpb25zXCIgW21vZGVsXT1cImZvcm1seURlc2lnbmVyU2VydmljZS5tb2RlbFwiIFtmb3JtXT1cImZvcm1cIiBbZmllbGRzXT1cImZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHNcIj5cbiAgICAgICAgICAgIDwvZm9ybWx5LWZvcm0+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgPCEtLTxkaXY+XG4gICAgICAgICAgICBEZXNpZ25lciBGaWVsZHMgRGVidWc6XG4gICAgICAgICAgICA8cHJlPnt7IGZpZWxkcyB8IGRlY3ljbGUgfCBqc29uIH19PC9wcmU+XG4gICAgICAgIDwvZGl2Pi0tPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICBmb3JtbHktZGVzaWduZXItZmllbGQtcGlja2VyIC5mb3JtLWdyb3VwID4gLmlucHV0LWdyb3VwID4gZm9ybWx5LWRlc2lnbmVyLXR5cGUtc2VsZWN0ID4gc2VsZWN0IHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IC4yNXJlbSAwIDAgLjI1cmVtO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvciAuY2FyZCA+IC5jYXJkLWJvZHkgLmZvcm0tY29udHJvbCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtbHktZGVzaWduZXItd3JhcHBlci1waWNrZXIgLmZvcm0tZ3JvdXAgPiAuaW5wdXQtZ3JvdXAgPiBmb3JtbHktZGVzaWduZXItd3JhcHBlci1zZWxlY3QgPiBzZWxlY3Qge1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjI1cmVtIDAgMCAuMjVyZW07XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0Zvcm1seURlc2lnbmVyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RGVzaWduZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnZm9ybWx5Rm9ybUNvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBmb3JtbHlGb3JtQ29udGFpbmVyO1xuICAgIEBPdXRwdXQoKSBmaWVsZHNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1seUZpZWxkQ29uZmlnW10+KCk7XG4gICAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICB0eXBlczogc3RyaW5nW10gPSBbXTtcbiAgICB3cmFwcGVyczogc3RyaW5nW10gPSBbXTtcbiAgICBwcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGRlYnVnRmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW107XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgb3B0aW9uczogYW55ID0ge307XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHVibGljIGZvcm1seURlc2lnbmVyU2VydmljZTogRm9ybWx5RGVzaWduZXJTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRpc2FibGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgZmllbGRzKCk6IEZvcm1seUZpZWxkQ29uZmlnW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzO1xuICAgIH1cblxuICAgIHNldCBmaWVsZHModmFsdWU6IEZvcm1seUZpZWxkQ29uZmlnW10pIHtcbiAgICAgICAgY29uc3QgZmllbGRzID0gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuY29udmVydEZpZWxkcyh2YWx1ZSk7XG4gICAgICAgIHRoaXMuZmllbGRzU2VydmljZS5tdXRhdGVGaWVsZHMoZmllbGRzLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmZpZWxkcyA9IGZpZWxkcztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtb2RlbCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UubW9kZWw7XG4gICAgfVxuXG4gICAgc2V0IG1vZGVsKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UubW9kZWwgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gRGVzaWduZXIgZm9ybXMgd2lsbCBiZSByZXN0cmljdGVkIHRvIGEgc2luZ2xlIGZpZWxkIGRlcHRoOyBhbGwgZGVzaWduZXIga2V5cyBzaG91bGQgYmVcbiAgICAgICAgLy8gY29tcGxleCAoZS5nLiBcInRlbXBsYXRlT3B0aW9ucy5zb21lLnByb3BlcnR5XCIpXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmZpZWxkcyRcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzQ2hhbmdlLmVtaXQodGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuY3JlYXRlRGVzaWduZXJGaWVsZHMoKSk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobWVyZ2UoXG4gICAgICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5tb2RlbCQsXG4gICAgICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzXG4gICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubW9kZWxDaGFuZ2UuZW1pdCh0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5tb2RlbCkpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZSgwKS5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuXG4gICAgb25GaWVsZFNlbGVjdGVkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aW1lcigpLnBpcGUoXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkc1NlcnZpY2UuY2hlY2tGaWVsZChmaWVsZCwgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5hZGRGaWVsZChmaWVsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IE5FVkVSKSkuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuIl19