/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import { cloneDeep, isArray, isObject } from '../util';
var WrappersPickerComponent = /** @class */ (function () {
    function WrappersPickerComponent(formlyDesignerConfig, formlyDesignerService) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
        this.wrappers = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    WrappersPickerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.field) {
            this.wrappers = this.formlyDesignerService.getWrappers(changes.field.currentValue);
        }
    };
    Object.defineProperty(WrappersPickerComponent.prototype, "$modal", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ ($(this.modalRef.nativeElement)));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} field
     * @return {?}
     */
    WrappersPickerComponent.prototype.onWrapperSelected = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.selected.emit(field);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    WrappersPickerComponent.prototype.edit = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.wrapper = this.wrappers[index];
        if (isObject(this.field)) {
            /** @type {?} */
            var field = cloneDeep(this.field);
            if (isArray(field.wrappers)) {
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
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    WrappersPickerComponent.prototype.remove = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var fieldWrappersIndex = this.field.wrappers.indexOf(this.wrappers[index]);
        if (fieldWrappersIndex < 0) {
            return;
        }
        /** @type {?} */
        var field = cloneDeep(this.field);
        field.wrappers.splice(fieldWrappersIndex, 1);
        this.field = this.formlyDesignerService.convertField(field);
        this.selected.emit(this.field);
    };
    /**
     * @return {?}
     */
    WrappersPickerComponent.prototype.onApply = /**
     * @return {?}
     */
    function () {
        this.field = this.formlyDesignerService.convertField(this.fieldEdit.value);
        this.selected.emit(this.field);
        this.$modal.modal('hide');
    };
    WrappersPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-wrappers-picker',
                    template: "\n        <div class=\"form-group\">\n            <div class=\"input-group\">\n                <formly-designer-wrapper-picker [field]=\"field\" (selected)=\"onWrapperSelected($event)\">\n                </formly-designer-wrapper-picker>\n            </div>\n            <div *ngFor=\"let wrapper of wrappers; let i = index\" class=\"badge badge-default noselect\" (click)=\"edit(i)\">\n                {{ wrapper }}&nbsp;&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\" (click)=\"remove(i)\"></i>\n            </div>\n        </div>\n        <div #modal class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n            <div class=\"modal-dialog modal-lg\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\">Edit {{ wrapper }}</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancel\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div class=\"modal-body\">\n                        <formly-designer-wrapper-editor #editor [formControl]=\"fieldEdit\" [wrapper]=\"wrapper\">\n                        </formly-designer-wrapper-editor>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onApply()\"\n                            [disabled]=\"editor.invalid\">Apply</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                    styles: ["\n        .badge {\n            margin-right: .25em;\n        }\n        .badge {\n            cursor: pointer;\n        }\n        .noselect {\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    WrappersPickerComponent.ctorParameters = function () { return [
        { type: FormlyDesignerConfig },
        { type: FormlyDesignerService }
    ]; };
    WrappersPickerComponent.propDecorators = {
        modalRef: [{ type: ViewChild, args: ['modal',] }],
        field: [{ type: Input }],
        selected: [{ type: Output }]
    };
    return WrappersPickerComponent;
}());
export { WrappersPickerComponent };
if (false) {
    /** @type {?} */
    WrappersPickerComponent.prototype.modalRef;
    /** @type {?} */
    WrappersPickerComponent.prototype.field;
    /** @type {?} */
    WrappersPickerComponent.prototype.selected;
    /** @type {?} */
    WrappersPickerComponent.prototype.wrapper;
    /** @type {?} */
    WrappersPickerComponent.prototype.fieldEdit;
    /** @type {?} */
    WrappersPickerComponent.prototype.wrappers;
    /**
     * @type {?}
     * @private
     */
    WrappersPickerComponent.prototype.formlyDesignerConfig;
    /**
     * @type {?}
     * @private
     */
    WrappersPickerComponent.prototype.formlyDesignerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlcnMtcGlja2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZvcm1seS1kZXNpZ25lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dyYXBwZXJzLXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXZEO0lBNERJLGlDQUNZLG9CQUEwQyxFQUMxQyxxQkFBNEM7UUFENUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBVDlDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUczRCxjQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEMsYUFBUSxHQUFhLEVBQUUsQ0FBQztJQUtwQixDQUFDOzs7OztJQUVMLDZDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0RjtJQUNMLENBQUM7SUFFRCxzQkFBWSwyQ0FBTTs7Ozs7UUFBbEI7WUFDSSxPQUFPLG1CQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFPLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7Ozs7O0lBRUQsbURBQWlCOzs7O0lBQWpCLFVBQWtCLEtBQXdCO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsc0NBQUk7Ozs7SUFBSixVQUFLLEtBQWE7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOztnQkFDaEIsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7O29CQUV6QixNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTtnQkFDdEUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM3QjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2xCO2FBQ0o7U0FDSjtJQUNMLENBQUM7Ozs7O0lBRUQsd0NBQU07Ozs7SUFBTixVQUFPLEtBQWE7O1lBQ1Ysa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLEVBQUU7WUFDeEIsT0FBTztTQUNWOztZQUVLLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCx5Q0FBTzs7O0lBQVA7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Z0JBaEhKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyxRQUFRLEVBQUUscXZEQStCVDs2QkFDUSwwVkFjUjtpQkFDSjs7OztnQkFyRFEsb0JBQW9CO2dCQUNwQixxQkFBcUI7OzsyQkFzRHpCLFNBQVMsU0FBQyxPQUFPO3dCQUNqQixLQUFLOzJCQUNMLE1BQU07O0lBNERYLDhCQUFDO0NBQUEsQUFqSEQsSUFpSEM7U0EvRFksdUJBQXVCOzs7SUFDaEMsMkNBQXlDOztJQUN6Qyx3Q0FBa0M7O0lBQ2xDLDJDQUEyRDs7SUFFM0QsMENBQWdCOztJQUNoQiw0Q0FBZ0M7O0lBRWhDLDJDQUF3Qjs7Ozs7SUFHcEIsdURBQWtEOzs7OztJQUNsRCx3REFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lclNlcnZpY2UgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjbG9uZURlZXAsIGlzQXJyYXksIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXJzLXBpY2tlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxmb3JtbHktZGVzaWduZXItd3JhcHBlci1waWNrZXIgW2ZpZWxkXT1cImZpZWxkXCIgKHNlbGVjdGVkKT1cIm9uV3JhcHBlclNlbGVjdGVkKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8L2Zvcm1seS1kZXNpZ25lci13cmFwcGVyLXBpY2tlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgd3JhcHBlciBvZiB3cmFwcGVyczsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtZGVmYXVsdCBub3NlbGVjdFwiIChjbGljayk9XCJlZGl0KGkpXCI+XG4gICAgICAgICAgICAgICAge3sgd3JhcHBlciB9fSZuYnNwOyZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAoY2xpY2spPVwicmVtb3ZlKGkpXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICNtb2RhbCBjbGFzcz1cIm1vZGFsIGZhZGVcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+RWRpdCB7eyB3cmFwcGVyIH19PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDYW5jZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvciAjZWRpdG9yIFtmb3JtQ29udHJvbF09XCJmaWVsZEVkaXRcIiBbd3JhcHBlcl09XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwib25BcHBseSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZWRpdG9yLmludmFsaWRcIj5BcHBseTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLmJhZGdlIHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogLjI1ZW07XG4gICAgICAgIH1cbiAgICAgICAgLmJhZGdlIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAubm9zZWxlY3Qge1xuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIFdyYXBwZXJzUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBAVmlld0NoaWxkKCdtb2RhbCcpIG1vZGFsUmVmOiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dCgpIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1seUZpZWxkQ29uZmlnPigpO1xuXG4gICAgd3JhcHBlcjogc3RyaW5nO1xuICAgIGZpZWxkRWRpdCA9IG5ldyBGb3JtQ29udHJvbCh7fSk7XG5cbiAgICB3cmFwcGVyczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lclNlcnZpY2U6IEZvcm1seURlc2lnbmVyU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmZpZWxkKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJzID0gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZ2V0V3JhcHBlcnMoY2hhbmdlcy5maWVsZC5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgJG1vZGFsKCk6IEpRdWVyeSAmIHsgbW9kYWw6IChjb21tYW5kOiBzdHJpbmcpID0+IHZvaWQgfSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMubW9kYWxSZWYubmF0aXZlRWxlbWVudCkgYXMgYW55O1xuICAgIH1cblxuICAgIG9uV3JhcHBlclNlbGVjdGVkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQoZmllbGQpO1xuICAgIH1cblxuICAgIGVkaXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLndyYXBwZXIgPSB0aGlzLndyYXBwZXJzW2luZGV4XTtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHRoaXMuZmllbGQpKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKTtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGZpZWxkLndyYXBwZXJzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRFZGl0LnNldFZhbHVlKGZpZWxkKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMuZm9ybWx5RGVzaWduZXJDb25maWcud3JhcHBlcnNbdGhpcy53cmFwcGVyXS5maWVsZHM7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoZmllbGRzKSAmJiBmaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25BcHBseSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZpZWxkV3JhcHBlcnNJbmRleCA9IHRoaXMuZmllbGQud3JhcHBlcnMuaW5kZXhPZih0aGlzLndyYXBwZXJzW2luZGV4XSk7XG4gICAgICAgIGlmIChmaWVsZFdyYXBwZXJzSW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKTtcbiAgICAgICAgZmllbGQud3JhcHBlcnMuc3BsaWNlKGZpZWxkV3JhcHBlcnNJbmRleCwgMSk7XG4gICAgICAgIHRoaXMuZmllbGQgPSB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jb252ZXJ0RmllbGQoZmllbGQpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5maWVsZCk7XG4gICAgfVxuXG4gICAgb25BcHBseSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWVsZCA9IHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNvbnZlcnRGaWVsZCh0aGlzLmZpZWxkRWRpdC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLmZpZWxkKTtcbiAgICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG59XG4iXX0=