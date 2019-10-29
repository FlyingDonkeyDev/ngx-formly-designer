/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import { cloneDeep, isArray, isObject } from '../util';
var WrapperPickerComponent = /** @class */ (function () {
    function WrapperPickerComponent(formBuilder, formlyDesignerConfig, formlyDesignerService) {
        this.formBuilder = formBuilder;
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
    }
    Object.defineProperty(WrapperPickerComponent.prototype, "wrapper", {
        get: /**
         * @return {?}
         */
        function () {
            return this.form.get('wrapper').value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrapperPickerComponent.prototype, "$modal", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return $(this.modalRef.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WrapperPickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.form = this.formBuilder.group({
            wrapper: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)])]
        });
    };
    /**
     * @return {?}
     */
    WrapperPickerComponent.prototype.add = /**
     * @return {?}
     */
    function () {
        if (isObject(this.field)) {
            /** @type {?} */
            var field = cloneDeep(this.field);
            if (isArray(field.wrappers) && field.wrappers.length > 0) {
                field.wrappers.splice(field.wrappers.length - 1, 0, this.wrapper);
            }
            else {
                field.wrappers = [this.wrapper];
            }
            this.fieldEdit.setValue(field);
            /** @type {?} */
            var fields = this.formlyDesignerConfig.wrappers[this.wrapper].fields;
            if (isArray(fields) && fields.length > 0) {
                this.$modal.modal('show');
            }
            else {
                this.onApply();
            }
        }
    };
    /**
     * @return {?}
     */
    WrapperPickerComponent.prototype.onApply = /**
     * @return {?}
     */
    function () {
        this.field = this.formlyDesignerService.convertField(this.fieldEdit.value);
        this.selected.emit(this.fieldEdit.value);
        this.$modal.modal('hide');
    };
    WrapperPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-wrapper-picker',
                    template: "\n        <form novalidate [formGroup]=\"form\">\n            <div class=\"form-group\">\n                <div class=\"input-group\">\n                    <formly-designer-wrapper-select formControlName=\"wrapper\">\n                    </formly-designer-wrapper-select>\n                    <button type=\"button\" class=\"btn btn-secondary\" [disabled]=\"form.invalid\" (click)=\"add()\">\n                        Add\n                    </button>\n                </div>\n            </div>\n            <div #modal class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog modal-lg\" role=\"document\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Add {{ wrapper }}</h5>\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancel\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <formly-designer-wrapper-editor #editor [formControl]=\"fieldEdit\" [wrapper]=\"wrapper\">\n                            </formly-designer-wrapper-editor>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n                            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onApply()\"\n                                [disabled]=\"editor.invalid\">Apply</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    ",
                    styles: ["\n        :host {\n            width: inherit;\n        }\n        .btn:not(:disabled) {\n            cursor: pointer;\n        }\n        .input-group > .btn {\n            border-radius: 0 .25rem .25rem 0;\n        }\n        .input-group, .modal-header {\n            display: flex;\n        }\n        .modal-header {\n            justify-content: space-between;\n        }\n        formly-designer-wrapper-select {\n            flex-grow: 2;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    WrapperPickerComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: FormlyDesignerConfig },
        { type: FormlyDesignerService }
    ]; };
    WrapperPickerComponent.propDecorators = {
        modalRef: [{ type: ViewChild, args: ['modal',] }],
        field: [{ type: Input }],
        selected: [{ type: Output }]
    };
    return WrapperPickerComponent;
}());
export { WrapperPickerComponent };
if (false) {
    /** @type {?} */
    WrapperPickerComponent.prototype.modalRef;
    /** @type {?} */
    WrapperPickerComponent.prototype.field;
    /** @type {?} */
    WrapperPickerComponent.prototype.selected;
    /** @type {?} */
    WrapperPickerComponent.prototype.form;
    /** @type {?} */
    WrapperPickerComponent.prototype.fieldEdit;
    /**
     * @type {?}
     * @private
     */
    WrapperPickerComponent.prototype.formBuilder;
    /**
     * @type {?}
     * @private
     */
    WrapperPickerComponent.prototype.formlyDesignerConfig;
    /**
     * @type {?}
     * @private
     */
    WrapperPickerComponent.prototype.formlyDesignerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1waWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd3JhcHBlci1waWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFJdkQ7SUE4REksZ0NBQ1ksV0FBd0IsRUFDeEIsb0JBQTBDLEVBQzFDLHFCQUE0QztRQUY1QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFMOUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBUzNELGNBQVMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUg1QixDQUFDO0lBS0wsc0JBQUksMkNBQU87Ozs7UUFBWDtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBRUQsc0JBQVksMENBQU07Ozs7O1FBQWxCO1lBQ0ksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTs7OztJQUVELHlDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDL0IsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVGLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxvQ0FBRzs7O0lBQUg7UUFDSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7O2dCQUNoQixLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDckU7aUJBQU07Z0JBQ0gsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOztnQkFFekIsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07WUFDdEUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtTQUNKO0lBQ0wsQ0FBQzs7OztJQUVELHdDQUFPOzs7SUFBUDtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Z0JBNUdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxRQUFRLEVBQUUsK3lEQWlDVDs2QkFDUSxpZEFtQlI7aUJBQ0o7Ozs7Z0JBaEVRLFdBQVc7Z0JBRVgsb0JBQW9CO2dCQUNwQixxQkFBcUI7OzsyQkErRHpCLFNBQVMsU0FBQyxPQUFPO3dCQUNqQixLQUFLOzJCQUNMLE1BQU07O0lBaURYLDZCQUFDO0NBQUEsQUE3R0QsSUE2R0M7U0FwRFksc0JBQXNCOzs7SUFDL0IsMENBQXlDOztJQUN6Qyx1Q0FBa0M7O0lBQ2xDLDBDQUEyRDs7SUFRM0Qsc0NBQWdCOztJQUNoQiwyQ0FBZ0M7Ozs7O0lBTjVCLDZDQUFnQzs7Ozs7SUFDaEMsc0RBQWtEOzs7OztJQUNsRCx1REFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lclNlcnZpY2UgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjbG9uZURlZXAsIGlzQXJyYXksIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbCc7XG5cbmRlY2xhcmUgdmFyICQ7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8Zm9ybSBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm1seS1kZXNpZ25lci13cmFwcGVyLXNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgW2Rpc2FibGVkXT1cImZvcm0uaW52YWxpZFwiIChjbGljayk9XCJhZGQoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQWRkXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICNtb2RhbCBjbGFzcz1cIm1vZGFsIGZhZGVcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2cgbW9kYWwtbGdcIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtb2RhbC10aXRsZVwiPkFkZCB7eyB3cmFwcGVyIH19PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2FuY2VsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvciAjZWRpdG9yIFtmb3JtQ29udHJvbF09XCJmaWVsZEVkaXRcIiBbd3JhcHBlcl09XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItd3JhcHBlci1lZGl0b3I+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJvbkFwcGx5KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZWRpdG9yLmludmFsaWRcIj5BcHBseTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgd2lkdGg6IGluaGVyaXQ7XG4gICAgICAgIH1cbiAgICAgICAgLmJ0bjpub3QoOmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLmlucHV0LWdyb3VwID4gLmJ0biB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwIC4yNXJlbSAuMjVyZW0gMDtcbiAgICAgICAgfVxuICAgICAgICAuaW5wdXQtZ3JvdXAsIC5tb2RhbC1oZWFkZXIge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgfVxuICAgICAgICAubW9kYWwtaGVhZGVyIHtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgfVxuICAgICAgICBmb3JtbHktZGVzaWduZXItd3JhcHBlci1zZWxlY3Qge1xuICAgICAgICAgICAgZmxleC1ncm93OiAyO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgV3JhcHBlclBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnbW9kYWwnKSBtb2RhbFJlZjogRWxlbWVudFJlZjtcbiAgICBASW5wdXQoKSBmaWVsZDogRm9ybWx5RmllbGRDb25maWc7XG4gICAgQE91dHB1dCgpIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtbHlGaWVsZENvbmZpZz4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWcsXG4gICAgICAgIHByaXZhdGUgZm9ybWx5RGVzaWduZXJTZXJ2aWNlOiBGb3JtbHlEZXNpZ25lclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuICAgIGZpZWxkRWRpdCA9IG5ldyBGb3JtQ29udHJvbCh7fSk7XG5cbiAgICBnZXQgd3JhcHBlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtLmdldCgnd3JhcHBlcicpLnZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0ICRtb2RhbCgpOiBKUXVlcnkgJiB7IG1vZGFsOiAoY29tbWFuZDogc3RyaW5nKSA9PiB2b2lkIH0ge1xuICAgICAgICByZXR1cm4gJCh0aGlzLm1vZGFsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIHdyYXBwZXI6IFsnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLnBhdHRlcm4oL15cXHMqXFxTLiokLyldKV1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkKCk6IHZvaWQge1xuICAgICAgICBpZiAoaXNPYmplY3QodGhpcy5maWVsZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gY2xvbmVEZWVwKHRoaXMuZmllbGQpO1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoZmllbGQud3JhcHBlcnMpICYmIGZpZWxkLndyYXBwZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmaWVsZC53cmFwcGVycy5zcGxpY2UoZmllbGQud3JhcHBlcnMubGVuZ3RoIC0gMSwgMCwgdGhpcy53cmFwcGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmllbGQud3JhcHBlcnMgPSBbdGhpcy53cmFwcGVyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmllbGRFZGl0LnNldFZhbHVlKGZpZWxkKTtcblxuICAgICAgICAgICAgY29uc3QgZmllbGRzID0gdGhpcy5mb3JtbHlEZXNpZ25lckNvbmZpZy53cmFwcGVyc1t0aGlzLndyYXBwZXJdLmZpZWxkcztcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGZpZWxkcykgJiYgZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXBwbHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmllbGQgPSB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jb252ZXJ0RmllbGQodGhpcy5maWVsZEVkaXQudmFsdWUpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5maWVsZEVkaXQudmFsdWUpO1xuICAgICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xuICAgIH1cbn1cbiJdfQ==