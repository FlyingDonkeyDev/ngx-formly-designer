/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldWrapper } from '@ngx-formly/core';
import { FieldsService } from '../fields.service';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import { cloneDeep } from '../util';
import { timer } from 'rxjs';
export class FormlyDesignerFieldWrapperComponent extends FieldWrapper {
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
        this.type = this.field.type;
        this.wrappers = Object.getOwnPropertyNames(this.designerConfig.wrappers);
        this.fieldWrappers = this.formlyDesignerService.getWrappers(this.formlyDesignerService.convertField(this.field)) || [];
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
FormlyDesignerFieldWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-field-wrapper',
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
            <button class="btn" type="button" [disabled]="disabled" (click)="edit()">
                <i class="fa fa-pencil" aria-hidden="true" title="edit"></i>
            </button>
            <button class="btn" type="button" [disabled]="disabled" (click)="remove()">
                <i class="fa fa-times" aria-hidden="true" title="remove"></i>
            </button>
        </div>
        <div class="content">
            <div class="editor" [hidden]="!editing">
                <formly-designer-field-editor #editor [hasContent]="true" [showType]="true" [showWrappers]="true" [formControl]="fieldEdit">
                    <div class="footer">
                        <button (click)="cancel()" class="btn btn-secondary mr-1">Cancel</button>
                        <button [disabled]="editor.invalid" (click)="accept()" class="btn btn-primary">Apply</button>
                    </div>
                </formly-designer-field-editor>
            </div>
            <div [hidden]="editing">
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
            min-height: 2em;
            padding: 1.5em 1em 0 1em;
            width: 100%;
        }
        .content:first-child {
            padding-top: 0;
        }
        .editor {
            margin: 1em 0;
        }
        .footer {
            display: flex;
            justify-content: flex-end;
        }
    `]
            }] }
];
/** @nocollapse */
FormlyDesignerFieldWrapperComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: FormlyDesignerConfig },
    { type: ElementRef },
    { type: FieldsService },
    { type: FormlyDesignerService },
    { type: NgZone }
];
FormlyDesignerFieldWrapperComponent.propDecorators = {
    fieldComponent: [{ type: ViewChild, args: ['fieldComponent', { read: ViewContainerRef },] }]
};
if (false) {
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.fieldComponent;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.editing;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.fieldEdit;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.fieldWrappers;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.wrappers;
    /** @type {?} */
    FormlyDesignerFieldWrapperComponent.prototype.type;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.designerConfig;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.formlyDesignerService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerFieldWrapperComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZGVzaWduZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL3dyYXBwZXJzL2ZpZWxkLWRlc2lnbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXlDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQ3BGLE1BQU0sRUFBVSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBa0c3QixNQUFNLE9BQU8sbUNBQW9DLFNBQVEsWUFBWTs7Ozs7Ozs7O0lBVWpFLFlBQ1ksY0FBaUMsRUFDakMsY0FBb0MsRUFDcEMsVUFBc0IsRUFDdEIsYUFBNEIsRUFDNUIscUJBQTRDLEVBQzVDLElBQVk7UUFFcEIsS0FBSyxFQUFFLENBQUM7UUFQQSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBWnhCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBQzdCLGFBQVEsR0FBYSxFQUFFLENBQUM7SUFZeEIsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNILENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFLENBQUMsVUFBVTs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLEVBQUMsQ0FBQztJQUM5RSxDQUFDOzs7O0lBRUQscUJBQXFCO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsRUFBQyxDQUFDO0lBQzlFLENBQUM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBZTs7Y0FDaEIsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25DLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNoQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0gsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQWE7O2NBQ2pCLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekYsT0FBTztTQUNWO1FBQ0QsS0FBSyxFQUFFLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDOzs7OztJQUVPLGFBQWE7O2NBQ1gsT0FBTyxHQUFHLG1CQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFlO1FBQzVELElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDNUIsT0FBTztTQUNWOztjQUVLLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLElBQUksSUFBSTtRQUM5RSxJQUFJLGFBQWEsS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUMvRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3BDLElBQUksYUFBYSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFDO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzdDO1NBQ0o7SUFDTCxDQUFDOzs7WUFqTUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMENUO3lCQUNROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaURSO2FBQ0o7Ozs7WUF6RytDLGlCQUFpQjtZQUt4RCxvQkFBb0I7WUFMaUQsVUFBVTtZQUkvRSxhQUFhO1lBRWIscUJBQXFCO1lBTDFCLE1BQU07Ozs2QkEyR0wsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzs7O0lBQXZELDZEQUEwRjs7SUFFMUYsc0RBQWdCOztJQUNoQix3REFBZ0M7O0lBQ2hDLDREQUE2Qjs7SUFDN0IsdURBQXdCOztJQUN4QixtREFBYTs7Ozs7SUFHVCw2REFBeUM7Ozs7O0lBQ3pDLDZEQUE0Qzs7Ozs7SUFDNUMseURBQThCOzs7OztJQUM5Qiw0REFBb0M7Ozs7O0lBQ3BDLG9FQUFvRDs7Ozs7SUFDcEQsbURBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZixcbiAgICBOZ1pvbmUsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRzU2VydmljZSB9IGZyb20gJy4uL2ZpZWxkcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lclNlcnZpY2UgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjbG9uZURlZXAgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyLWZpZWxkLXdyYXBwZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgKm5nSWY9XCIhZWRpdGluZ1wiIGNsYXNzPVwiYmctaW5mbyB0ZXh0LXdoaXRlIGNvbnRyb2wtcGFuZWxcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHlwZVwiPnt7IHR5cGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiB0aXRsZT1cIndyYXBwZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2xvbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiB0aXRsZT1cImFkZCB3cmFwcGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB3cmFwcGVyIG9mIHdyYXBwZXJzXCIgKGNsaWNrKT1cImFkZFdyYXBwZXIod3JhcHBlcilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IHdyYXBwZXIgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmaWVsZFdyYXBwZXJzLmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIndyYXBwZXJzLmxlbmd0aFwiIGNsYXNzPVwiZHJvcGRvd24tZGl2aWRlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgd3JhcHBlciBvZiBmaWVsZFdyYXBwZXJzOyBsZXQgaT1pbmRleFwiIChjbGljayk9XCJyZW1vdmVXcmFwcGVyKGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgd3JhcHBlciB9fSZuYnNwOyZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cInJlbW92ZSB3cmFwcGVyXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJlZGl0KClcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBlbmNpbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiZWRpdFwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwicmVtb3ZlKClcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJyZW1vdmVcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yXCIgW2hpZGRlbl09XCIhZWRpdGluZ1wiPlxuICAgICAgICAgICAgICAgIDxmb3JtbHktZGVzaWduZXItZmllbGQtZWRpdG9yICNlZGl0b3IgW2hhc0NvbnRlbnRdPVwidHJ1ZVwiIFtzaG93VHlwZV09XCJ0cnVlXCIgW3Nob3dXcmFwcGVyc109XCJ0cnVlXCIgW2Zvcm1Db250cm9sXT1cImZpZWxkRWRpdFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgbXItMVwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiZWRpdG9yLmludmFsaWRcIiAoY2xpY2spPVwiYWNjZXB0KClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZm9ybWx5LWRlc2lnbmVyLWZpZWxkLWVkaXRvcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbaGlkZGVuXT1cImVkaXRpbmdcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ZpZWxkQ29tcG9uZW50PjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBtYXJnaW46IC4yNWVtO1xuICAgICAgICB9XG4gICAgICAgIDpob3N0LmRlc2lnbmVyRW1wdHkge1xuICAgICAgICAgICAgZGlzcGxheTpub25lO1xuICAgICAgICB9XG4gICAgICAgIC5idG46bm90KDpkaXNhYmxlZCksIC5kcm9wZG93bi1pdGVtOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAuY29udHJvbC1wYW5lbCB7XG4gICAgICAgICAgICBmb250LXNpemU6IC44ZW07XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIDAgMCAuNWVtO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMCA1cHggMCAwO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRyb2wtcGFuZWwgPiAqIHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IC41ZW07XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRyb2wtcGFuZWwgLmJ0biB7XG4gICAgICAgICAgICBmb250LXNpemU6IHVuc2V0O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdW5zZXQ7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIC41ZW0gMCAwO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRlbnQge1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggZGFzaGVkICMwMDA7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiAyZW07XG4gICAgICAgICAgICBwYWRkaW5nOiAxLjVlbSAxZW0gMCAxZW07XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAuY29udGVudDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMDtcbiAgICAgICAgfVxuICAgICAgICAuZWRpdG9yIHtcbiAgICAgICAgICAgIG1hcmdpbjogMWVtIDA7XG4gICAgICAgIH1cbiAgICAgICAgLmZvb3RlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seURlc2lnbmVyRmllbGRXcmFwcGVyQ29tcG9uZW50IGV4dGVuZHMgRmllbGRXcmFwcGVyXG4gICAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkluaXQge1xuICAgIEBWaWV3Q2hpbGQoJ2ZpZWxkQ29tcG9uZW50JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGZpZWxkQ29tcG9uZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgZWRpdGluZyA9IGZhbHNlO1xuICAgIGZpZWxkRWRpdCA9IG5ldyBGb3JtQ29udHJvbCh7fSk7XG4gICAgZmllbGRXcmFwcGVyczogc3RyaW5nW10gPSBbXTtcbiAgICB3cmFwcGVyczogc3RyaW5nW10gPSBbXTtcbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZGVzaWduZXJDb25maWc6IEZvcm1seURlc2lnbmVyQ29uZmlnLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgZmllbGRzU2VydmljZTogRmllbGRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lclNlcnZpY2U6IEZvcm1seURlc2lnbmVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5maWVsZC50eXBlO1xuICAgICAgICB0aGlzLndyYXBwZXJzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5kZXNpZ25lckNvbmZpZy53cmFwcGVycyk7XG4gICAgICAgIHRoaXMuZmllbGRXcmFwcGVycyA9IHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmdldFdyYXBwZXJzKHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNvbnZlcnRGaWVsZCh0aGlzLmZpZWxkKSkgfHwgW107XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoZWNrRGVzaWduZXIoKSkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jaGVja0Rlc2lnbmVyKCkpKTtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBhZGRXcmFwcGVyKHdyYXBwZXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKTtcbiAgICAgICAgaWYgKGZpZWxkLndyYXBwZXJzKSB7XG4gICAgICAgICAgICBmaWVsZC53cmFwcGVycy5wdXNoKHdyYXBwZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmllbGQud3JhcHBlcnMgPSBbd3JhcHBlcl07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UudXBkYXRlRmllbGQodGhpcy5maWVsZCwgZmllbGQpO1xuICAgIH1cblxuICAgIHJlbW92ZVdyYXBwZXIoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKTtcbiAgICAgICAgdGhpcy5maWVsZFdyYXBwZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGZpZWxkLndyYXBwZXJzID0gdGhpcy5maWVsZFdyYXBwZXJzO1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS51cGRhdGVGaWVsZCh0aGlzLmZpZWxkLCBmaWVsZCk7XG4gICAgfVxuXG4gICAgZWRpdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmZpZWxkRWRpdC5zZXRWYWx1ZSh0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5jb252ZXJ0RmllbGQoY2xvbmVEZWVwKHRoaXMuZmllbGQpKSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5yZW1vdmVGaWVsZCh0aGlzLmZpZWxkKTtcbiAgICB9XG5cbiAgICBhY2NlcHQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5maWVsZHNTZXJ2aWNlLmNoZWNrRmllbGQodGhpcy5maWVsZEVkaXQudmFsdWUsIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmZpZWxkcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aW1lcigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS51cGRhdGVGaWVsZCh0aGlzLmZpZWxkLCB0aGlzLmZpZWxkRWRpdC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbmNlbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0Rlc2lnbmVyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVzaWduZXJFbXB0eSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXInKSA9PSBudWxsO1xuICAgICAgICBpZiAoZGVzaWduZXJFbXB0eSAhPT0gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rlc2lnbmVyRW1wdHknKSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBpZiAoZGVzaWduZXJFbXB0eSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGVzaWduZXJFbXB0eScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rlc2lnbmVyRW1wdHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==