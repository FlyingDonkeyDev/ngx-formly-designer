/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldWrapper } from '@ngx-formly/core';
import { FieldsService } from '../fields.service';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import { cloneDeep, isArray } from '../util';
import { NEVER, timer } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export class FormlyDesignerFieldGroupWrapperComponent extends FieldWrapper {
    /**
     * @param {?} changeDetector
     * @param {?} designerConfig
     * @param {?} elementRef
     * @param {?} fieldsService
     * @param {?} formlyDesignerService
     * @param {?} zone
     */
    constructor(changeDetector, designerConfig, elementRef, fieldsService, formlyDesignerService, zone) {
        super();
        this.changeDetector = changeDetector;
        this.designerConfig = designerConfig;
        this.elementRef = elementRef;
        this.fieldsService = fieldsService;
        this.formlyDesignerService = formlyDesignerService;
        this.zone = zone;
        this.editing = false;
        this.fieldEdit = new FormControl({});
        this.fieldWrappers = [];
        this.wrappers = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.field.templateOptions.$fieldArray) {
            this.type = this.field.templateOptions.$fieldArray.type || 'fieldArray';
        }
        else if (this.field.type) {
            this.type = this.field.type;
        }
        else if (this.field.fieldGroup) {
            this.type = 'fieldGroup';
        }
        this.wrappers = Object.getOwnPropertyNames(this.designerConfig.wrappers);
        this.fieldWrappers = this.formlyDesignerService.convertField(this.field).wrappers || [];
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => setTimeout((/**
         * @return {?}
         */
        () => this.checkDesigner()))));
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => setTimeout((/**
         * @return {?}
         */
        () => this.checkDesigner()))));
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.formlyDesignerService.disabled;
    }
    /**
     * @param {?} wrapper
     * @return {?}
     */
    addWrapper(wrapper) {
        /** @type {?} */
        const field = cloneDeep(this.field);
        if (field.wrappers) {
            field.wrappers.push(wrapper);
        }
        else {
            field.wrappers = [wrapper];
        }
        this.formlyDesignerService.updateField(this.field, field);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeWrapper(index) {
        /** @type {?} */
        const field = cloneDeep(this.field);
        this.fieldWrappers.splice(index, 1);
        field.wrappers = this.fieldWrappers;
        this.formlyDesignerService.updateField(this.field, field);
    }
    /**
     * @return {?}
     */
    edit() {
        this.editing = true;
        this.formlyDesignerService.disabled = true;
        this.fieldEdit.setValue(this.formlyDesignerService.convertField(cloneDeep(this.field)));
    }
    /**
     * @return {?}
     */
    remove() {
        this.formlyDesignerService.removeField(this.field);
    }
    /**
     * @return {?}
     */
    accept() {
        if (!this.fieldsService.checkField(this.fieldEdit.value, this.formlyDesignerService.fields)) {
            return;
        }
        timer().subscribe((/**
         * @return {?}
         */
        () => {
            this.formlyDesignerService.updateField(this.field, this.fieldEdit.value);
            this.formlyDesignerService.disabled = false;
            this.editing = false;
        }));
    }
    /**
     * @return {?}
     */
    cancel() {
        this.formlyDesignerService.disabled = false;
        this.editing = false;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onFieldSelected(field) {
        if (isArray(this.field.fieldGroup) &&
            !this.fieldsService.checkField(field, this.formlyDesignerService.fields, this.field)) {
            return;
        }
        /** @type {?} */
        const updatedField = cloneDeep(this.field);
        updatedField.fieldGroup = isArray(updatedField.fieldGroup) ? updatedField.fieldGroup.slice() : [];
        updatedField.fieldGroup.push(field);
        timer()
            .pipe(tap((/**
         * @return {?}
         */
        () => this.formlyDesignerService.updateField(this.field, updatedField))), catchError((/**
         * @return {?}
         */
        () => NEVER)))
            .subscribe();
    }
    /**
     * @private
     * @return {?}
     */
    checkDesigner() {
        /** @type {?} */
        const element = (/** @type {?} */ (this.elementRef.nativeElement));
        if (element.parentNode == null) {
            return;
        }
        /** @type {?} */
        const designerEmpty = element.querySelector('formly-designer-wrapper') == null;
        if (designerEmpty !== element.classList.contains('designerEmpty')) {
            this.changeDetector.detectChanges();
            if (designerEmpty) {
                element.classList.add('designerEmpty');
            }
            else {
                element.classList.remove('designerEmpty');
            }
        }
    }
}
FormlyDesignerFieldGroupWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-field-group-wrapper',
                template: `
        <div *ngIf="!editing" class="bg-info text-white control-panel">
            <span class="type">{{ type }}</span>
            <div class="btn-group">
                <button type="button" class="btn" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" title="wrappers">
                    <i class="fa fa-clone" aria-hidden="true"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                    <button class="dropdown-item" type="button" [disabled]="disabled" title="add wrapper"
                        *ngFor="let wrapper of wrappers" (click)="addWrapper(wrapper)">
                        {{ wrapper }}
                    </button>
                    <ng-container *ngIf="fieldWrappers.length">
                        <div *ngIf="wrappers.length" class="dropdown-divider"></div>
                        <button class="dropdown-item" type="button" [disabled]="disabled"
                            *ngFor="let wrapper of fieldWrappers; let i=index" (click)="removeWrapper(i)">
                            {{ wrapper }}&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" title="remove wrapper"></i>
                        </button>
                    </ng-container>
                </div>
            </div>
            <button [disabled]="disabled" type="button" class="btn" (click)="edit()">
                <i class="fa fa-pencil" aria-hidden="true" title="edit"></i>
            </button>
            <button [disabled]="disabled" type="button" class="btn" (click)="remove()">
                <i class="fa fa-times" aria-hidden="true" title="remove"></i>
            </button>
        </div>
        <div class="content">
            <div [hidden]="!editing">
                <formly-designer-field-editor #editor [fieldGroup]="true" [hasContent]="true" [showWrappers]="true"
                    [formControl]="fieldEdit">
                    <div class="footer">
                        <button (click)="cancel()" class="btn btn-secondary mr-1">Cancel</button>
                        <button [disabled]="editor.invalid" (click)="accept()" class="btn btn-primary">Apply</button>
                    </div>
                </formly-designer-field-editor>
            </div>
            <div [hidden]="editing">
                <div class="form-group">
                    <label>child</label>
                    <formly-designer-field-picker (selected)="onFieldSelected($event)"></formly-designer-field-picker>
                </div>
                <ng-template #fieldComponent></ng-template>
            </div>
        </div>
    `,
                styles: [`
        :host {
            display: flex;
            position: relative;
            justify-content: flex-start;
            align-content: flex-start;
            align-items: flex-start;
            margin: .25em;
        }
        :host.designerEmpty {
            display:none;
        }
        .btn:not(:disabled), .dropdown-item:not(:disabled) {
            cursor: pointer;
        }
        .control-panel {
            font-size: .8em;
            position: absolute;
            padding: 0 0 0 .5em;
            border-radius: 0 5px 0 0;
            right: 0;
            top: 0;
        }
        .control-panel > * {
            padding-right: .5em;
        }
        .control-panel .btn {
            font-size: unset;
            background-color: unset;
            padding: 0 .5em 0 0;
            color: #fff;
        }
        .content {
            border: 1px dashed #000;
            border-radius: 5px;
            padding: 1em;
            width: 100%;
        }
        .footer {
            display: flex;
            justify-content: flex-end;
        }
    `]
            }] }
];
/** @nocollapse */
FormlyDesignerFieldGroupWrapperComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: FormlyDesignerConfig },
    { type: ElementRef },
    { type: FieldsService },
    { type: FormlyDesignerService },
    { type: NgZone }
];
FormlyDesignerFieldGroupWrapperComponent.propDecorators = {
    fieldComponent: [{ type: ViewChild, args: ['fieldComponent', { read: ViewContainerRef },] }]
};
if (false) {
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.fieldComponent;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.type;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.editing;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.fieldEdit;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.fieldWrappers;
    /** @type {?} */
    FormlyDesignerFieldGroupWrapperComponent.prototype.wrappers;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.designerConfig;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.formlyDesignerService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZ3JvdXAtZGVzaWduZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL3dyYXBwZXJzL2ZpZWxkLWdyb3VwLWRlc2lnbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXlDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQ3BGLE1BQU0sRUFBVSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQXFCLE1BQU0sa0JBQWtCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFnR2pELE1BQU0sT0FBTyx3Q0FBeUMsU0FBUSxZQUFZOzs7Ozs7Ozs7SUFVdEUsWUFDWSxjQUFpQyxFQUNqQyxjQUFvQyxFQUNwQyxVQUFzQixFQUN0QixhQUE0QixFQUM1QixxQkFBNEMsRUFDNUMsSUFBWTtRQUVwQixLQUFLLEVBQUUsQ0FBQztRQVBBLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBc0I7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QiwwQkFBcUIsR0FB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Ozs7Ozs7Ozs7S0ErQ1Q7eUJBQ1E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTBDUjthQUNKOzs7O1lBeEcrQyxpQkFBaUI7WUFLeEQsb0JBQW9CO1lBTGlELFVBQVU7WUFJL0UsYUFBYTtZQUViLHFCQUFxQjtZQUwxQixNQUFNOzs7NkJBMEdMLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTs7OztJQUF2RCxrRUFBMEY7O0lBRTFGLHdEQUFhOztJQUNiLDJEQUFnQjs7SUFDaEIsNkRBQWdDOztJQUNoQyxpRUFBNkI7O0lBQzdCLDREQUF3Qjs7Ozs7SUFHcEIsa0VBQXlDOzs7OztJQUN6QyxrRUFBNEM7Ozs7O0lBQzVDLDhEQUE4Qjs7Ozs7SUFDOUIsaUVBQW9DOzs7OztJQUNwQyx5RUFBb0Q7Ozs7O0lBQ3BELHdEQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsXG4gICAgTmdab25lLCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZFdyYXBwZXIsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJDb25maWcgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXItY29uZmlnJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyU2VydmljZSB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci5zZXJ2aWNlJztcbmltcG9ydCB7IGNsb25lRGVlcCwgaXNBcnJheSB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgTkVWRVIsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyLWZpZWxkLWdyb3VwLXdyYXBwZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgKm5nSWY9XCIhZWRpdGluZ1wiIGNsYXNzPVwiYmctaW5mbyB0ZXh0LXdoaXRlIGNvbnRyb2wtcGFuZWxcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHlwZVwiPnt7IHR5cGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiB0aXRsZT1cIndyYXBwZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2xvbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiB0aXRsZT1cImFkZCB3cmFwcGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB3cmFwcGVyIG9mIHdyYXBwZXJzXCIgKGNsaWNrKT1cImFkZFdyYXBwZXIod3JhcHBlcilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IHdyYXBwZXIgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmaWVsZFdyYXBwZXJzLmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIndyYXBwZXJzLmxlbmd0aFwiIGNsYXNzPVwiZHJvcGRvd24tZGl2aWRlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgd3JhcHBlciBvZiBmaWVsZFdyYXBwZXJzOyBsZXQgaT1pbmRleFwiIChjbGljayk9XCJyZW1vdmVXcmFwcGVyKGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgd3JhcHBlciB9fSZuYnNwOyZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cInJlbW92ZSB3cmFwcGVyXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIChjbGljayk9XCJlZGl0KClcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiZWRpdFwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiAoY2xpY2spPVwicmVtb3ZlKClcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJyZW1vdmVcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IFtoaWRkZW5dPVwiIWVkaXRpbmdcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLWZpZWxkLWVkaXRvciAjZWRpdG9yIFtmaWVsZEdyb3VwXT1cInRydWVcIiBbaGFzQ29udGVudF09XCJ0cnVlXCIgW3Nob3dXcmFwcGVyc109XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZpZWxkRWRpdFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgbXItMVwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiZWRpdG9yLmludmFsaWRcIiAoY2xpY2spPVwiYWNjZXB0KClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZm9ybWx5LWRlc2lnbmVyLWZpZWxkLWVkaXRvcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbaGlkZGVuXT1cImVkaXRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+Y2hpbGQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLWZpZWxkLXBpY2tlciAoc2VsZWN0ZWQpPVwib25GaWVsZFNlbGVjdGVkKCRldmVudClcIj48L2Zvcm1seS1kZXNpZ25lci1maWVsZC1waWNrZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNmaWVsZENvbXBvbmVudD48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgbWFyZ2luOiAuMjVlbTtcbiAgICAgICAgfVxuICAgICAgICA6aG9zdC5kZXNpZ25lckVtcHR5IHtcbiAgICAgICAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICAgICAgfVxuICAgICAgICAuYnRuOm5vdCg6ZGlzYWJsZWQpLCAuZHJvcGRvd24taXRlbTpub3QoOmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRyb2wtcGFuZWwge1xuICAgICAgICAgICAgZm9udC1zaXplOiAuOGVtO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgcGFkZGluZzogMCAwIDAgLjVlbTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAgNXB4IDAgMDtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICB9XG4gICAgICAgIC5jb250cm9sLXBhbmVsID4gKiB7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAuNWVtO1xuICAgICAgICB9XG4gICAgICAgIC5jb250cm9sLXBhbmVsIC5idG4ge1xuICAgICAgICAgICAgZm9udC1zaXplOiB1bnNldDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHVuc2V0O1xuICAgICAgICAgICAgcGFkZGluZzogMCAuNWVtIDAgMDtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICB9XG4gICAgICAgIC5jb250ZW50IHtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IGRhc2hlZCAjMDAwO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLmZvb3RlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seURlc2lnbmVyRmllbGRHcm91cFdyYXBwZXJDb21wb25lbnQgZXh0ZW5kcyBGaWVsZFdyYXBwZXJcbiAgICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgnZmllbGRDb21wb25lbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgZmllbGRDb21wb25lbnQ6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZWRpdGluZyA9IGZhbHNlO1xuICAgIGZpZWxkRWRpdCA9IG5ldyBGb3JtQ29udHJvbCh7fSk7XG4gICAgZmllbGRXcmFwcGVyczogc3RyaW5nW10gPSBbXTtcbiAgICB3cmFwcGVyczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBkZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWcsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyU2VydmljZTogRm9ybWx5RGVzaWduZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWVsZC50ZW1wbGF0ZU9wdGlvbnMuJGZpZWxkQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZmllbGQudGVtcGxhdGVPcHRpb25zLiRmaWVsZEFycmF5LnR5cGUgfHwgJ2ZpZWxkQXJyYXknO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmllbGQudHlwZSkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdGhpcy5maWVsZC50eXBlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gJ2ZpZWxkR3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JhcHBlcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLmRlc2lnbmVyQ29uZmlnLndyYXBwZXJzKTtcbiAgICAgICAgdGhpcy5maWVsZFdyYXBwZXJzID0gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuY29udmVydEZpZWxkKHRoaXMuZmllbGQpLndyYXBwZXJzIHx8IFtdO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jaGVja0Rlc2lnbmVyKCkpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2hlY2tEZXNpZ25lcigpKSk7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgYWRkV3JhcHBlcih3cmFwcGVyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBjbG9uZURlZXAodGhpcy5maWVsZCk7XG4gICAgICAgIGlmIChmaWVsZC53cmFwcGVycykge1xuICAgICAgICAgICAgZmllbGQud3JhcHBlcnMucHVzaCh3cmFwcGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpZWxkLndyYXBwZXJzID0gW3dyYXBwZXJdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLnVwZGF0ZUZpZWxkKHRoaXMuZmllbGQsIGZpZWxkKTtcbiAgICB9XG5cbiAgICByZW1vdmVXcmFwcGVyKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBjbG9uZURlZXAodGhpcy5maWVsZCk7XG4gICAgICAgIHRoaXMuZmllbGRXcmFwcGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBmaWVsZC53cmFwcGVycyA9IHRoaXMuZmllbGRXcmFwcGVycztcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UudXBkYXRlRmllbGQodGhpcy5maWVsZCwgZmllbGQpO1xuICAgIH1cblxuICAgIGVkaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5maWVsZEVkaXQuc2V0VmFsdWUodGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuY29udmVydEZpZWxkKGNsb25lRGVlcCh0aGlzLmZpZWxkKSkpO1xuICAgIH1cblxuICAgIHJlbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UucmVtb3ZlRmllbGQodGhpcy5maWVsZCk7XG4gICAgfVxuXG4gICAgYWNjZXB0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZmllbGRzU2VydmljZS5jaGVja0ZpZWxkKHRoaXMuZmllbGRFZGl0LnZhbHVlLCB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lcigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS51cGRhdGVGaWVsZCh0aGlzLmZpZWxkLCB0aGlzLmZpZWxkRWRpdC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbmNlbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25GaWVsZFNlbGVjdGVkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgICAgICBpZiAoaXNBcnJheSh0aGlzLmZpZWxkLmZpZWxkR3JvdXApICYmXG4gICAgICAgICAgICAhdGhpcy5maWVsZHNTZXJ2aWNlLmNoZWNrRmllbGQoZmllbGQsIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmZpZWxkcywgdGhpcy5maWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRGaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKTtcbiAgICAgICAgdXBkYXRlZEZpZWxkLmZpZWxkR3JvdXAgPSBpc0FycmF5KHVwZGF0ZWRGaWVsZC5maWVsZEdyb3VwKSA/IHVwZGF0ZWRGaWVsZC5maWVsZEdyb3VwLnNsaWNlKCkgOiBbXTtcbiAgICAgICAgdXBkYXRlZEZpZWxkLmZpZWxkR3JvdXAucHVzaChmaWVsZCk7XG5cbiAgICAgICAgdGltZXIoKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLnVwZGF0ZUZpZWxkKHRoaXMuZmllbGQsIHVwZGF0ZWRGaWVsZCkpLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gTkVWRVIpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0Rlc2lnbmVyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVzaWduZXJFbXB0eSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXInKSA9PSBudWxsO1xuICAgICAgICBpZiAoZGVzaWduZXJFbXB0eSAhPT0gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rlc2lnbmVyRW1wdHknKSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBpZiAoZGVzaWduZXJFbXB0eSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGVzaWduZXJFbXB0eScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rlc2lnbmVyRW1wdHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==