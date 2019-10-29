/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import { cloneDeep, isArray, isObject } from '../util';
export class WrapperPickerComponent {
    /**
     * @param {?} formBuilder
     * @param {?} formlyDesignerConfig
     * @param {?} formlyDesignerService
     */
    constructor(formBuilder, formlyDesignerConfig, formlyDesignerService) {
        this.formBuilder = formBuilder;
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
    }
    /**
     * @return {?}
     */
    get wrapper() {
        return this.form.get('wrapper').value;
    }
    /**
     * @private
     * @return {?}
     */
    get $modal() {
        return $(this.modalRef.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.form = this.formBuilder.group({
            wrapper: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)])]
        });
    }
    /**
     * @return {?}
     */
    add() {
        if (isObject(this.field)) {
            /** @type {?} */
            const field = cloneDeep(this.field);
            if (isArray(field.wrappers) && field.wrappers.length > 0) {
                field.wrappers.splice(field.wrappers.length - 1, 0, this.wrapper);
            }
            else {
                field.wrappers = [this.wrapper];
            }
            this.fieldEdit.setValue(field);
            /** @type {?} */
            const fields = this.formlyDesignerConfig.wrappers[this.wrapper].fields;
            if (isArray(fields) && fields.length > 0) {
                this.$modal.modal('show');
            }
            else {
                this.onApply();
            }
        }
    }
    /**
     * @return {?}
     */
    onApply() {
        this.field = this.formlyDesignerService.convertField(this.fieldEdit.value);
        this.selected.emit(this.fieldEdit.value);
        this.$modal.modal('hide');
    }
}
WrapperPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-wrapper-picker',
                template: `
        <form novalidate [formGroup]="form">
            <div class="form-group">
                <div class="input-group">
                    <formly-designer-wrapper-select formControlName="wrapper">
                    </formly-designer-wrapper-select>
                    <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
                        Add
                    </button>
                </div>
            </div>
            <div #modal class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add {{ wrapper }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <formly-designer-wrapper-editor #editor [formControl]="fieldEdit" [wrapper]="wrapper">
                            </formly-designer-wrapper-editor>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" (click)="onApply()"
                                [disabled]="editor.invalid">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    `,
                styles: [`
        :host {
            width: inherit;
        }
        .btn:not(:disabled) {
            cursor: pointer;
        }
        .input-group > .btn {
            border-radius: 0 .25rem .25rem 0;
        }
        .input-group, .modal-header {
            display: flex;
        }
        .modal-header {
            justify-content: space-between;
        }
        formly-designer-wrapper-select {
            flex-grow: 2;
        }
    `]
            }] }
];
/** @nocollapse */
WrapperPickerComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: FormlyDesignerConfig },
    { type: FormlyDesignerService }
];
WrapperPickerComponent.propDecorators = {
    modalRef: [{ type: ViewChild, args: ['modal',] }],
    field: [{ type: Input }],
    selected: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1waWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd3JhcHBlci1waWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUE2RHZELE1BQU0sT0FBTyxzQkFBc0I7Ozs7OztJQUsvQixZQUNZLFdBQXdCLEVBQ3hCLG9CQUEwQyxFQUMxQyxxQkFBNEM7UUFGNUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBTDlDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQVMzRCxjQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFINUIsQ0FBQzs7OztJQUtMLElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRUQsSUFBWSxNQUFNO1FBQ2QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDL0IsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVGLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxHQUFHO1FBQ0MsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOztrQkFDaEIsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3RELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JFO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7a0JBRXpCLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNO1lBQ3RFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEI7U0FDSjtJQUNMLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUE1R0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUNUO3lCQUNROzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJSO2FBQ0o7Ozs7WUFoRVEsV0FBVztZQUVYLG9CQUFvQjtZQUNwQixxQkFBcUI7Ozt1QkErRHpCLFNBQVMsU0FBQyxPQUFPO29CQUNqQixLQUFLO3VCQUNMLE1BQU07Ozs7SUFGUCwwQ0FBeUM7O0lBQ3pDLHVDQUFrQzs7SUFDbEMsMENBQTJEOztJQVEzRCxzQ0FBZ0I7O0lBQ2hCLDJDQUFnQzs7Ozs7SUFONUIsNkNBQWdDOzs7OztJQUNoQyxzREFBa0Q7Ozs7O0lBQ2xELHVEQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJDb25maWcgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXItY29uZmlnJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyU2VydmljZSB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci5zZXJ2aWNlJztcbmltcG9ydCB7IGNsb25lRGVlcCwgaXNBcnJheSwgaXNPYmplY3QgfSBmcm9tICcuLi91dGlsJztcblxuZGVjbGFyZSB2YXIgJDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItd3JhcHBlci1waWNrZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxmb3JtIG5vdmFsaWRhdGUgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItc2VsZWN0IGZvcm1Db250cm9sTmFtZT1cIndyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItd3JhcHBlci1zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBbZGlzYWJsZWRdPVwiZm9ybS5pbnZhbGlkXCIgKGNsaWNrKT1cImFkZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBBZGRcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI21vZGFsIGNsYXNzPVwibW9kYWwgZmFkZVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+QWRkIHt7IHdyYXBwZXIgfX08L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDYW5jZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItZWRpdG9yICNlZGl0b3IgW2Zvcm1Db250cm9sXT1cImZpZWxkRWRpdFwiIFt3cmFwcGVyXT1cIndyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cIm9uQXBwbHkoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJlZGl0b3IuaW52YWxpZFwiPkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICAgICAgfVxuICAgICAgICAuYnRuOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAuaW5wdXQtZ3JvdXAgPiAuYnRuIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAgLjI1cmVtIC4yNXJlbSAwO1xuICAgICAgICB9XG4gICAgICAgIC5pbnB1dC1ncm91cCwgLm1vZGFsLWhlYWRlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG4gICAgICAgIC5tb2RhbC1oZWFkZXIge1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1seS1kZXNpZ25lci13cmFwcGVyLXNlbGVjdCB7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDI7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBXcmFwcGVyUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdtb2RhbCcpIG1vZGFsUmVmOiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dCgpIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1seUZpZWxkQ29uZmlnPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lclNlcnZpY2U6IEZvcm1seURlc2lnbmVyU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG4gICAgZmllbGRFZGl0ID0gbmV3IEZvcm1Db250cm9sKHt9KTtcblxuICAgIGdldCB3cmFwcGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KCd3cmFwcGVyJykudmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgJG1vZGFsKCk6IEpRdWVyeSAmIHsgbW9kYWw6IChjb21tYW5kOiBzdHJpbmcpID0+IHZvaWQgfSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMubW9kYWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgd3JhcHBlcjogWycnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybigvXlxccypcXFMuKiQvKV0pXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGQoKTogdm9pZCB7XG4gICAgICAgIGlmIChpc09iamVjdCh0aGlzLmZpZWxkKSkge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBjbG9uZURlZXAodGhpcy5maWVsZCk7XG4gICAgICAgICAgICBpZiAoaXNBcnJheShmaWVsZC53cmFwcGVycykgJiYgZmllbGQud3JhcHBlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZpZWxkLndyYXBwZXJzLnNwbGljZShmaWVsZC53cmFwcGVycy5sZW5ndGggLSAxLCAwLCB0aGlzLndyYXBwZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWVsZC53cmFwcGVycyA9IFt0aGlzLndyYXBwZXJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maWVsZEVkaXQuc2V0VmFsdWUoZmllbGQpO1xuXG4gICAgICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLndyYXBwZXJzW3RoaXMud3JhcHBlcl0uZmllbGRzO1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoZmllbGRzKSAmJiBmaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25BcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcHBseSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWVsZCA9IHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNvbnZlcnRGaWVsZCh0aGlzLmZpZWxkRWRpdC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLmZpZWxkRWRpdC52YWx1ZSk7XG4gICAgICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XG4gICAgfVxufVxuIl19