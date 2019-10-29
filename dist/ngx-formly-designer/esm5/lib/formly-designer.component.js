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
                    template: "\n        <formly-designer-field-picker (selected)=\"onFieldSelected($event)\">\n        </formly-designer-field-picker>\n        <form novalidate [formGroup]=\"form\">\n            <formly-form [options]=\"options\" [model]=\"model\" [form]=\"form\" [fields]=\"fields\">\n            </formly-form>\n        </form>\n        <!--<div>\n            Designer Fields Debug:\n            <pre>{{ fields | decycle | json }}</pre>\n        </div>-->\n    ",
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
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerComponent.prototype.formlyDesignerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFJLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRDtJQTZDSSxpQ0FDWSxhQUE0QixFQUM1QixXQUF3QixFQUN4QixxQkFBNEM7UUFGNUMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWhCOUMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBdUIsQ0FBQztRQUN2RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFaEQsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFDMUIsZ0JBQVcsR0FBd0IsRUFBRSxDQUFDO1FBR3RDLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFFRCxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFN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QUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsb2NBV1Q7b0JBY0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDOzZCQWR6QixpZ0JBWVI7aUJBR0o7Ozs7Z0JBbENRLGFBQWE7Z0JBRmIsV0FBVztnQkFHWCxxQkFBcUI7OztzQ0FtQ3pCLFNBQVMsU0FBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTsrQkFDM0QsTUFBTTs4QkFDTixNQUFNOzJCQWtCTixLQUFLO3lCQVNMLEtBQUs7d0JBV0wsS0FBSzs7SUF5Q1YsOEJBQUM7Q0FBQSxBQWhIRCxJQWdIQztTQWxGWSx1QkFBdUI7OztJQUNoQyxzREFBa0Y7O0lBQ2xGLCtDQUFpRTs7SUFDakUsOENBQWdEOztJQUVoRCx3Q0FBcUI7O0lBQ3JCLDJDQUF3Qjs7SUFDeEIsNkNBQTBCOztJQUMxQiw4Q0FBc0M7O0lBRXRDLHVDQUFnQjs7SUFDaEIsMENBQWtCOzs7OztJQUVsQixnREFBb0Q7Ozs7O0lBR2hELGdEQUFvQzs7Ozs7SUFDcEMsOENBQWdDOzs7OztJQUNoQyx3REFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRzU2VydmljZSB9IGZyb20gJy4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJTZXJ2aWNlIH0gZnJvbSAnLi9mb3JtbHktZGVzaWduZXIuc2VydmljZSc7XG5pbXBvcnQgeyBtZXJnZSwgTkVWRVIsIFN1YnNjcmlwdGlvbiwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGZvcm1seS1kZXNpZ25lci1maWVsZC1waWNrZXIgKHNlbGVjdGVkKT1cIm9uRmllbGRTZWxlY3RlZCgkZXZlbnQpXCI+XG4gICAgICAgIDwvZm9ybWx5LWRlc2lnbmVyLWZpZWxkLXBpY2tlcj5cbiAgICAgICAgPGZvcm0gbm92YWxpZGF0ZSBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgICAgIDxmb3JtbHktZm9ybSBbb3B0aW9uc109XCJvcHRpb25zXCIgW21vZGVsXT1cIm1vZGVsXCIgW2Zvcm1dPVwiZm9ybVwiIFtmaWVsZHNdPVwiZmllbGRzXCI+XG4gICAgICAgICAgICA8L2Zvcm1seS1mb3JtPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwhLS08ZGl2PlxuICAgICAgICAgICAgRGVzaWduZXIgRmllbGRzIERlYnVnOlxuICAgICAgICAgICAgPHByZT57eyBmaWVsZHMgfCBkZWN5Y2xlIHwganNvbiB9fTwvcHJlPlxuICAgICAgICA8L2Rpdj4tLT5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgZm9ybWx5LWRlc2lnbmVyLWZpZWxkLXBpY2tlciAuZm9ybS1ncm91cCA+IC5pbnB1dC1ncm91cCA+IGZvcm1seS1kZXNpZ25lci10eXBlLXNlbGVjdCA+IHNlbGVjdCB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAuMjVyZW0gMCAwIC4yNXJlbTtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMDtcbiAgICAgICAgfVxuICAgICAgICBmb3JtbHktZGVzaWduZXItd3JhcHBlci1lZGl0b3IgLmNhcmQgPiAuY2FyZC1ib2R5IC5mb3JtLWNvbnRyb2wge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItcGlja2VyIC5mb3JtLWdyb3VwID4gLmlucHV0LWdyb3VwID4gZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItc2VsZWN0ID4gc2VsZWN0IHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IC4yNXJlbSAwIDAgLjI1cmVtO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgICAgICB9XG4gICAgYF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtGb3JtbHlEZXNpZ25lclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seURlc2lnbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICAgIEBWaWV3Q2hpbGQoJ2Zvcm1seUZvcm1Db250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgZm9ybWx5Rm9ybUNvbnRhaW5lcjtcbiAgICBAT3V0cHV0KCkgZmllbGRzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtbHlGaWVsZENvbmZpZ1tdPigpO1xuICAgIEBPdXRwdXQoKSBtb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgdHlwZXM6IHN0cmluZ1tdID0gW107XG4gICAgd3JhcHBlcnM6IHN0cmluZ1tdID0gW107XG4gICAgcHJvcGVydGllczogc3RyaW5nW10gPSBbXTtcbiAgICBkZWJ1Z0ZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSA9IFtdO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuICAgIG9wdGlvbnM6IGFueSA9IHt9O1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZmllbGRzU2VydmljZTogRmllbGRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgZm9ybWx5RGVzaWduZXJTZXJ2aWNlOiBGb3JtbHlEZXNpZ25lclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBmaWVsZHMoKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHM7XG4gICAgfVxuXG4gICAgc2V0IGZpZWxkcyh2YWx1ZTogRm9ybWx5RmllbGRDb25maWdbXSkge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jb252ZXJ0RmllbGRzKHZhbHVlKTtcbiAgICAgICAgdGhpcy5maWVsZHNTZXJ2aWNlLm11dGF0ZUZpZWxkcyhmaWVsZHMsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzID0gZmllbGRzO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1vZGVsKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5tb2RlbDtcbiAgICB9XG5cbiAgICBzZXQgbW9kZWwodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5tb2RlbCA9IHZhbHVlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBEZXNpZ25lciBmb3JtcyB3aWxsIGJlIHJlc3RyaWN0ZWQgdG8gYSBzaW5nbGUgZmllbGQgZGVwdGg7IGFsbCBkZXNpZ25lciBrZXlzIHNob3VsZCBiZVxuICAgICAgICAvLyBjb21wbGV4IChlLmcuIFwidGVtcGxhdGVPcHRpb25zLnNvbWUucHJvcGVydHlcIilcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzJFxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7fSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNDaGFuZ2UuZW1pdCh0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jcmVhdGVEZXNpZ25lckZpZWxkcygpKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChtZXJnZShcbiAgICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLm1vZGVsJCxcbiAgICAgICAgICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXNcbiAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tb2RlbENoYW5nZS5lbWl0KHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLm1vZGVsKSkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKDApLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICBvbkZpZWxkU2VsZWN0ZWQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgICAgIHRpbWVyKCkucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzU2VydmljZS5jaGVja0ZpZWxkKGZpZWxkLCB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmFkZEZpZWxkKGZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gTkVWRVIpKS5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4iXX0=