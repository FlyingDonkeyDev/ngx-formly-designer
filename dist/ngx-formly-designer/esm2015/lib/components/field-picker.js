/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
export class FieldPickerComponent {
    /**
     * @param {?} fb
     * @param {?} formlyDesignerConfig
     */
    constructor(fb, formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
        this.form = fb.group({
            type: this.type = fb.control('', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)]))
        });
    }
    /**
     * @private
     * @return {?}
     */
    get $modal() {
        return (/** @type {?} */ ($(this.modalRef.nativeElement)));
    }
    /**
     * @return {?}
     */
    add() {
        /** @type {?} */
        const type = this.type.value;
        /** @type {?} */
        const field = (/** @type {?} */ ({}));
        if (type !== 'fieldGroup') {
            field.type = type;
        }
        /** @type {?} */
        const designerType = this.formlyDesignerConfig.types[type] || (/** @type {?} */ ({}));
        if (designerType.fieldArray) {
            field.fieldArray = { fieldGroup: [] };
        }
        if (this.fieldGroup = (type === 'fieldGroup' || designerType.fieldGroup)) {
            field.fieldGroup = [];
        }
        this.fieldEdit.setValue(field);
        this.$modal.modal('show');
    }
    /**
     * @return {?}
     */
    onApply() {
        this.selected.emit(this.fieldEdit.value);
        this.$modal.modal('hide');
    }
}
FieldPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-field-picker',
                template: `
        <form novalidate [formGroup]="form">
            <div class="form-group">
                <div class="input-group">
                    <formly-designer-type-select formControlName="type">
                    </formly-designer-type-select>
                    <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
                        Add
                    </button>
                </div>
            </div>
            <div #modal class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add {{ type.value }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <formly-designer-field-editor #editor [fieldGroup]="fieldEdit.value.fieldGroup" [formControl]="fieldEdit">
                            </formly-designer-field-editor>
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
        formly-designer-type-select {
            flex-grow: 2;
        }
    `]
            }] }
];
/** @nocollapse */
FieldPickerComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: FormlyDesignerConfig }
];
FieldPickerComponent.propDecorators = {
    modalRef: [{ type: ViewChild, args: ['modal',] }],
    selected: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    FieldPickerComponent.prototype.modalRef;
    /** @type {?} */
    FieldPickerComponent.prototype.selected;
    /** @type {?} */
    FieldPickerComponent.prototype.form;
    /** @type {?} */
    FieldPickerComponent.prototype.fieldEdit;
    /** @type {?} */
    FieldPickerComponent.prototype.type;
    /** @type {?} */
    FieldPickerComponent.prototype.fieldGroup;
    /**
     * @type {?}
     * @private
     */
    FieldPickerComponent.prototype.formlyDesignerConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcGlja2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZvcm1seS1kZXNpZ25lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2ZpZWxkLXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakYsT0FBTyxFQUFzQixvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBd0RyRixNQUFNLE9BQU8sb0JBQW9COzs7OztJQUk3QixZQUNJLEVBQWUsRUFDUCxvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUo1QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFZbEQsY0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBTnZDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQU9ELElBQVksTUFBTTtRQUNkLE9BQU8sbUJBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQU8sQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsR0FBRzs7Y0FDTyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLOztjQUN0QixLQUFLLEdBQUcsbUJBQUEsRUFBRSxFQUFxQjtRQUNyQyxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDekIsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDbkI7O2NBQ0ssWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQUEsRUFBRSxFQUFzQjtRQUN0RixJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQUU7WUFDekIsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUN6QztRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RFLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7OztZQWhHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQ1Q7eUJBQ1E7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlI7YUFDSjs7OztZQXpEUSxXQUFXO1lBRVMsb0JBQW9COzs7dUJBeUQ1QyxTQUFTLFNBQUMsT0FBTzt1QkFDakIsTUFBTTs7OztJQURQLHdDQUF5Qzs7SUFDekMsd0NBQTJEOztJQVczRCxvQ0FBZ0I7O0lBQ2hCLHlDQUF5Qzs7SUFDekMsb0NBQTJCOztJQUMzQiwwQ0FBb0I7Ozs7O0lBVmhCLG9EQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRGVzaWduZXJUeXBlT3B0aW9uLCBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci1jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lci1maWVsZC1waWNrZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxmb3JtIG5vdmFsaWRhdGUgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLXR5cGUtc2VsZWN0IGZvcm1Db250cm9sTmFtZT1cInR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItdHlwZS1zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBbZGlzYWJsZWRdPVwiZm9ybS5pbnZhbGlkXCIgKGNsaWNrKT1cImFkZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBBZGRcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI21vZGFsIGNsYXNzPVwibW9kYWwgZmFkZVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+QWRkIHt7IHR5cGUudmFsdWUgfX08L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDYW5jZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLWZpZWxkLWVkaXRvciAjZWRpdG9yIFtmaWVsZEdyb3VwXT1cImZpZWxkRWRpdC52YWx1ZS5maWVsZEdyb3VwXCIgW2Zvcm1Db250cm9sXT1cImZpZWxkRWRpdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybWx5LWRlc2lnbmVyLWZpZWxkLWVkaXRvcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cIm9uQXBwbHkoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJlZGl0b3IuaW52YWxpZFwiPkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAuYnRuOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAuaW5wdXQtZ3JvdXAgPiAuYnRuIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAgLjI1cmVtIC4yNXJlbSAwO1xuICAgICAgICB9XG4gICAgICAgIC5pbnB1dC1ncm91cCwgLm1vZGFsLWhlYWRlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG4gICAgICAgIC5tb2RhbC1oZWFkZXIge1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1seS1kZXNpZ25lci10eXBlLXNlbGVjdCB7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDI7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZFBpY2tlckNvbXBvbmVudCB7XG4gICAgQFZpZXdDaGlsZCgnbW9kYWwnKSBtb2RhbFJlZjogRWxlbWVudFJlZjtcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1seUZpZWxkQ29uZmlnPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGZiOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWdcbiAgICApIHtcbiAgICAgIHRoaXMuZm9ybSA9IGZiLmdyb3VwKHtcbiAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUgPSBmYi5jb250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybigvXlxccypcXFMuKiQvKV0pKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuICAgIHJlYWRvbmx5IGZpZWxkRWRpdCA9IG5ldyBGb3JtQ29udHJvbCh7fSk7XG4gICAgcmVhZG9ubHkgdHlwZTogRm9ybUNvbnRyb2w7XG4gICAgZmllbGRHcm91cDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgZ2V0ICRtb2RhbCgpOiBKUXVlcnkgJiB7IG1vZGFsOiAoY29tbWFuZDogc3RyaW5nKSA9PiB2b2lkIH0ge1xuICAgICAgICByZXR1cm4gJCh0aGlzLm1vZGFsUmVmLm5hdGl2ZUVsZW1lbnQpIGFzIGFueTtcbiAgICB9XG5cbiAgICBhZGQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLnR5cGUudmFsdWU7XG4gICAgICAgIGNvbnN0IGZpZWxkID0ge30gYXMgRm9ybWx5RmllbGRDb25maWc7XG4gICAgICAgIGlmICh0eXBlICE9PSAnZmllbGRHcm91cCcpIHtcbiAgICAgICAgICBmaWVsZC50eXBlID0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNpZ25lclR5cGUgPSB0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLnR5cGVzW3R5cGVdIHx8IHt9IGFzIERlc2lnbmVyVHlwZU9wdGlvbjtcbiAgICAgICAgaWYgKGRlc2lnbmVyVHlwZS5maWVsZEFycmF5KSB7XG4gICAgICAgICAgICBmaWVsZC5maWVsZEFycmF5ID0geyBmaWVsZEdyb3VwOiBbXSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpZWxkR3JvdXAgPSAodHlwZSA9PT0gJ2ZpZWxkR3JvdXAnIHx8IGRlc2lnbmVyVHlwZS5maWVsZEdyb3VwKSkge1xuICAgICAgICAgICAgZmllbGQuZmllbGRHcm91cCA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmllbGRFZGl0LnNldFZhbHVlKGZpZWxkKTtcbiAgICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgICB9XG5cbiAgICBvbkFwcGx5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5maWVsZEVkaXQudmFsdWUpO1xuICAgICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xuICAgIH1cbn1cbiJdfQ==