/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldsService } from '../fields.service';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { cloneDeep, isObject, isString } from '../util';
/** @type {?} */
const FIELD_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => FieldEditorComponent)),
    multi: true
};
export class FieldEditorComponent {
    /**
     * @param {?} fieldsService
     * @param {?} fb
     * @param {?} formlyDesignerConfig
     */
    constructor(fieldsService, fb, formlyDesignerConfig) {
        this.fieldsService = fieldsService;
        this.fb = fb;
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.subscriptions = [];
        this.field = {};
        this.fields = [];
        this.onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this.form = fb.group({
            key: this.key = fb.control(''),
            className: this.className = fb.control(''),
            fieldGroupClassName: this.fieldGroupClassName = fb.control(''),
            type: this.type = fb.control('')
        }, { validator: (/**
             * @param {?} control
             * @return {?}
             */
            (control) => this.validator(control)) });
        this.fieldForm = fb.group({});
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.type.valueChanges
            .subscribe((/**
         * @return {?}
         */
        () => this.onTypeChange())));
        this.subscriptions.push(this.form.statusChanges
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        () => this.invalid = this.form.invalid)));
        this.subscribeValueChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
        this.subscriptions.splice(0).forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        subscription => subscription.unsubscribe()));
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.valueChangesSubscription.unsubscribe();
        this.updateField(obj);
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.subscribeValueChanges();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    }
    /**
     * @private
     * @return {?}
     */
    subscribeValueChanges() {
        this.valueChangesSubscription = merge(this.fieldForm.valueChanges, this.form.valueChanges)
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        () => this.updateValue()));
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    updateField(field) {
        if (!isObject(field)) {
            field = {};
        }
        this.key.setValue(isString(field.key) ? field.key : '');
        this.className.setValue(isString(field.className) ? field.className : '');
        this.fieldGroupClassName.setValue(isString(field.fieldGroupClassName) ? field.fieldGroupClassName : '');
        this.type.setValue(isString(field.type) ? field.type : '');
        this.fields = this.fieldsService.getTypeFields(this.type.value);
        this.fieldForm = this.fb.group({});
        this.field = cloneDeep(field);
    }
    /**
     * @private
     * @return {?}
     */
    updateValue() {
        if (!this.onChange) {
            return;
        }
        /** @type {?} */
        const field = this.field;
        field.key = this.key.value;
        field.className = this.className.value;
        field.fieldGroupClassName = this.fieldGroupClassName.value;
        field.type = this.type.value;
        this.onChange(field);
    }
    /**
     * @private
     * @return {?}
     */
    onTypeChange() {
        this.valueChangesSubscription.unsubscribe();
        /** @type {?} */
        const type = this.type.value;
        this.fields = this.fieldsService.getTypeFields(type);
        /** @type {?} */
        const designerType = this.formlyDesignerConfig.types[type];
        this.fieldArray = designerType && designerType.fieldArray;
        this.fieldForm = this.fb.group({});
        this.field = Object.assign({}, this.field);
        this.subscribeValueChanges();
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onWrappersSelected(field) {
        this.updateField(field);
    }
    /**
     * @private
     * @param {?} control
     * @return {?}
     */
    validator(control) {
        /** @type {?} */
        const type = (/** @type {?} */ (control.get('type')));
        /** @type {?} */
        const hasType = isString(type.value) && type.value.trim().length > 0;
        /** @type {?} */
        const key = (/** @type {?} */ (control.get('key')));
        /** @type {?} */
        const result = { key: false, type: this.showType && !hasType, conflict: false };
        if (hasType && (!isString(key.value) || key.value.trim().length === 0)) {
            result.key = true;
        }
        return result.key || result.type ? result : null;
    }
}
FieldEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-field-editor',
                template: `
        <form [formGroup]="form" novalidate>
            <div class="card">
                <div class="card-header" [ngClass]="{solo: !hasContent && fields.length === 0}">
                    <div class="form-group" [ngClass]="{'has-danger': form.hasError('key') && (key.dirty || key.touched)}">
                        <label class="form-control-label">key</label>
                        <input formControlName="key" class="form-control">
                        <div *ngIf="form.hasError('key') && (key.dirty || key.touched)" class="form-control-feedback">
                            key required.
                        </div>
                    </div>
                    <div *ngIf="formlyDesignerConfig.settings.showClassName" class="form-group">
                        <label class="form-control-label">className</label>
                        <input formControlName="className" class="form-control">
                    </div>
                    <div *ngIf="fieldGroup && formlyDesignerConfig.settings.showClassName" class="form-group">
                        <label class="form-control-label">fieldGroupClassName</label>
                        <input formControlName="fieldGroupClassName" class="form-control">
                    </div>
                    <div *ngIf="showType" class="form-group"
                        [ngClass]="{'has-danger': form.hasError('type') && (type.dirty || type.touched)}">
                        <label class="form-control-label">type</label>
                        <formly-designer-type-select formControlName="type"></formly-designer-type-select>
                        <div *ngIf="form.hasError('type') && (type.dirty || type.touched)" class="form-control-feedback">
                            type required.
                        </div>
                    </div>
                    <div *ngIf="showWrappers" class="form-group">
                        <label class="form-control-label">wrappers</label>
                        <formly-designer-wrappers-picker [field]="field"
                            (selected)="onWrappersSelected($event)">
                        </formly-designer-wrappers-picker>
                    </div>
                </div>
                <div #block class="card-body">
                    <formly-form *ngIf="fields.length > 0" [form]="fieldForm" [fields]="fields" [model]="field">
                    </formly-form>
                    <ng-content></ng-content>
                </div>
            </div>
        </form>
    `,
                providers: [
                    FIELD_EDITOR_CONTROL_VALUE_ACCESSOR
                ],
                styles: [`
        .card-header.solo {
            border-bottom: 0;
        }
        .card-header.solo + .card-body {
            display: none;
        }
    `]
            }] }
];
/** @nocollapse */
FieldEditorComponent.ctorParameters = () => [
    { type: FieldsService },
    { type: FormBuilder },
    { type: FormlyDesignerConfig }
];
FieldEditorComponent.propDecorators = {
    fieldGroup: [{ type: Input }],
    showType: [{ type: Input }],
    showWrappers: [{ type: Input }],
    hasContent: [{ type: Input }],
    blockElRef: [{ type: ViewChild, args: ['block',] }]
};
if (false) {
    /** @type {?} */
    FieldEditorComponent.prototype.fieldGroup;
    /** @type {?} */
    FieldEditorComponent.prototype.showType;
    /** @type {?} */
    FieldEditorComponent.prototype.showWrappers;
    /** @type {?} */
    FieldEditorComponent.prototype.hasContent;
    /** @type {?} */
    FieldEditorComponent.prototype.blockElRef;
    /**
     * @type {?}
     * @private
     */
    FieldEditorComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    FieldEditorComponent.prototype.valueChangesSubscription;
    /** @type {?} */
    FieldEditorComponent.prototype.form;
    /** @type {?} */
    FieldEditorComponent.prototype.key;
    /** @type {?} */
    FieldEditorComponent.prototype.className;
    /** @type {?} */
    FieldEditorComponent.prototype.fieldGroupClassName;
    /** @type {?} */
    FieldEditorComponent.prototype.type;
    /** @type {?} */
    FieldEditorComponent.prototype.fieldForm;
    /** @type {?} */
    FieldEditorComponent.prototype.field;
    /** @type {?} */
    FieldEditorComponent.prototype.fields;
    /** @type {?} */
    FieldEditorComponent.prototype.fieldArray;
    /** @type {?} */
    FieldEditorComponent.prototype.invalid;
    /**
     * @type {?}
     * @protected
     */
    FieldEditorComponent.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    FieldEditorComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    FieldEditorComponent.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    FieldEditorComponent.prototype.fb;
    /** @type {?} */
    FieldEditorComponent.prototype.formlyDesignerConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZvcm1seS1kZXNpZ25lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2ZpZWxkLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBd0IsV0FBVyxFQUEwQixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsS0FBSyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBVyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDOztNQUUzRCxtQ0FBbUMsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNkO0FBMERELE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQVU3QixZQUNZLGFBQTRCLEVBQzVCLEVBQWUsRUFDaEIsb0JBQTBDO1FBRnpDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDaEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQU5wQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUF3QnBELFVBQUssR0FBc0IsRUFBRSxDQUFDO1FBQzlCLFdBQU0sR0FBd0IsRUFBRSxDQUFDO1FBSXZCLGFBQVE7Ozs7UUFBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFDO1FBQzNCLGNBQVM7OztRQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQztRQXRCNUIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUM5RCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNuQyxFQUFFLEVBQUUsU0FBUzs7OztZQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBaUJELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7YUFDekMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7YUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyQixTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztJQUNyRixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFRO1FBQ2YsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7OztJQUVPLHFCQUFxQjtRQUN6QixJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3JGLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckIsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLEtBQXdCO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEIsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFTyxXQUFXO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsT0FBTztTQUNWOztjQUVLLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSztRQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzNCLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDdkMsS0FBSyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7UUFDM0QsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7O2NBQ3RDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Y0FDL0MsWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLEtBQXdCO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBRU8sU0FBUyxDQUFDLE9BQWtCOztjQUMxQixJQUFJLEdBQUcsbUJBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBZTs7Y0FDekMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Y0FFOUQsR0FBRyxHQUFHLG1CQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWU7O2NBQ3ZDLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtRQUMvRSxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNwRSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUVELE9BQU8sTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNyRCxDQUFDOzs7WUFqTUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5Q1Q7Z0JBU0QsU0FBUyxFQUFFO29CQUNQLG1DQUFtQztpQkFDdEM7eUJBVlE7Ozs7Ozs7S0FPUjthQUlKOzs7O1lBbkVRLGFBQWE7WUFGUyxXQUFXO1lBR2pDLG9CQUFvQjs7O3lCQW9FeEIsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxTQUFTLFNBQUMsT0FBTzs7OztJQUpsQiwwQ0FBNkI7O0lBQzdCLHdDQUEyQjs7SUFDM0IsNENBQStCOztJQUMvQiwwQ0FBNkI7O0lBQzdCLDBDQUEyQzs7Ozs7SUFFM0MsNkNBQW9EOzs7OztJQUNwRCx3REFBK0M7O0lBZ0IvQyxvQ0FBeUI7O0lBQ3pCLG1DQUEwQjs7SUFDMUIseUNBQWdDOztJQUNoQyxtREFBMEM7O0lBQzFDLG9DQUEyQjs7SUFFM0IseUNBQXFCOztJQUNyQixxQ0FBOEI7O0lBQzlCLHNDQUFpQzs7SUFDakMsMENBQW9COztJQUNwQix1Q0FBaUI7Ozs7O0lBRWpCLHdDQUFxQzs7Ozs7SUFDckMseUNBQWdDOzs7OztJQTFCNUIsNkNBQW9DOzs7OztJQUNwQyxrQ0FBdUI7O0lBQ3ZCLG9EQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRzU2VydmljZSB9IGZyb20gJy4uL2ZpZWxkcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjbG9uZURlZXAsIGlzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWwnO1xuXG5jb25zdCBGSUVMRF9FRElUT1JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpZWxkRWRpdG9yQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItZmllbGQtZWRpdG9yJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cImZvcm1cIiBub3ZhbGlkYXRlPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIiBbbmdDbGFzc109XCJ7c29sbzogIWhhc0NvbnRlbnQgJiYgZmllbGRzLmxlbmd0aCA9PT0gMH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbbmdDbGFzc109XCJ7J2hhcy1kYW5nZXInOiBmb3JtLmhhc0Vycm9yKCdrZXknKSAmJiAoa2V5LmRpcnR5IHx8IGtleS50b3VjaGVkKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbC1sYWJlbFwiPmtleTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwia2V5XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmb3JtLmhhc0Vycm9yKCdrZXknKSAmJiAoa2V5LmRpcnR5IHx8IGtleS50b3VjaGVkKVwiIGNsYXNzPVwiZm9ybS1jb250cm9sLWZlZWRiYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5IHJlcXVpcmVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZm9ybWx5RGVzaWduZXJDb25maWcuc2V0dGluZ3Muc2hvd0NsYXNzTmFtZVwiIGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jb250cm9sLWxhYmVsXCI+Y2xhc3NOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJjbGFzc05hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZpZWxkR3JvdXAgJiYgZm9ybWx5RGVzaWduZXJDb25maWcuc2V0dGluZ3Muc2hvd0NsYXNzTmFtZVwiIGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jb250cm9sLWxhYmVsXCI+ZmllbGRHcm91cENsYXNzTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwiZmllbGRHcm91cENsYXNzTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1R5cGVcIiBjbGFzcz1cImZvcm0tZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydoYXMtZGFuZ2VyJzogZm9ybS5oYXNFcnJvcigndHlwZScpICYmICh0eXBlLmRpcnR5IHx8IHR5cGUudG91Y2hlZCl9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wtbGFiZWxcIj50eXBlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtbHktZGVzaWduZXItdHlwZS1zZWxlY3QgZm9ybUNvbnRyb2xOYW1lPVwidHlwZVwiPjwvZm9ybWx5LWRlc2lnbmVyLXR5cGUtc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZvcm0uaGFzRXJyb3IoJ3R5cGUnKSAmJiAodHlwZS5kaXJ0eSB8fCB0eXBlLnRvdWNoZWQpXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wtZmVlZGJhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlIHJlcXVpcmVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1dyYXBwZXJzXCIgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wtbGFiZWxcIj53cmFwcGVyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLXdyYXBwZXJzLXBpY2tlciBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzZWxlY3RlZCk9XCJvbldyYXBwZXJzU2VsZWN0ZWQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItd3JhcHBlcnMtcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNibG9jayBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybWx5LWZvcm0gKm5nSWY9XCJmaWVsZHMubGVuZ3RoID4gMFwiIFtmb3JtXT1cImZpZWxkRm9ybVwiIFtmaWVsZHNdPVwiZmllbGRzXCIgW21vZGVsXT1cImZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybWx5LWZvcm0+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC5jYXJkLWhlYWRlci5zb2xvIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgICAgIH1cbiAgICAgICAgLmNhcmQtaGVhZGVyLnNvbG8gKyAuY2FyZC1ib2R5IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRklFTERfRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZpZWxkRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgICBASW5wdXQoKSBmaWVsZEdyb3VwOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNob3dUeXBlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNob3dXcmFwcGVyczogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBoYXNDb250ZW50OiBib29sZWFuO1xuICAgIEBWaWV3Q2hpbGQoJ2Jsb2NrJykgYmxvY2tFbFJlZjogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIHZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZmllbGRzU2VydmljZTogRmllbGRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHB1YmxpYyBmb3JtbHlEZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy5mb3JtID0gZmIuZ3JvdXAoe1xuICAgICAgICAgICAga2V5OiB0aGlzLmtleSA9IGZiLmNvbnRyb2woJycpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNsYXNzTmFtZSA9IGZiLmNvbnRyb2woJycpLFxuICAgICAgICAgICAgZmllbGRHcm91cENsYXNzTmFtZTogdGhpcy5maWVsZEdyb3VwQ2xhc3NOYW1lID0gZmIuY29udHJvbCgnJyksXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUgPSBmYi5jb250cm9sKCcnKVxuICAgICAgICB9LCB7IHZhbGlkYXRvcjogKGNvbnRyb2wpID0+IHRoaXMudmFsaWRhdG9yKGNvbnRyb2wpIH0pO1xuICAgICAgICB0aGlzLmZpZWxkRm9ybSA9IGZiLmdyb3VwKHt9KTtcbiAgICB9XG5cbiAgICByZWFkb25seSBmb3JtOiBGb3JtR3JvdXA7XG4gICAgcmVhZG9ubHkga2V5OiBGb3JtQ29udHJvbDtcbiAgICByZWFkb25seSBjbGFzc05hbWU6IEZvcm1Db250cm9sO1xuICAgIHJlYWRvbmx5IGZpZWxkR3JvdXBDbGFzc05hbWU6IEZvcm1Db250cm9sO1xuICAgIHJlYWRvbmx5IHR5cGU6IEZvcm1Db250cm9sO1xuXG4gICAgZmllbGRGb3JtOiBGb3JtR3JvdXA7XG4gICAgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnID0ge307XG4gICAgZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW107XG4gICAgZmllbGRBcnJheTogYm9vbGVhbjtcbiAgICBpbnZhbGlkOiBib29sZWFuO1xuXG4gICAgcHJvdGVjdGVkIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuICAgIHByb3RlY3RlZCBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy50eXBlLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uVHlwZUNoYW5nZSgpKSk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5mb3JtLnN0YXR1c0NoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pbnZhbGlkID0gdGhpcy5mb3JtLmludmFsaWQpKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmliZVZhbHVlQ2hhbmdlcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKDApLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRmllbGQob2JqKTtcbiAgICAgICAgdGhpcy5mb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgIHRoaXMuZm9ybS5tYXJrQXNVbnRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVWYWx1ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5kaXNhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN1YnNjcmliZVZhbHVlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24gPSBtZXJnZSh0aGlzLmZpZWxkRm9ybS52YWx1ZUNoYW5nZXMsIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMpXG4gICAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlVmFsdWUoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFpc09iamVjdChmaWVsZCkpIHtcbiAgICAgICAgICAgIGZpZWxkID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkuc2V0VmFsdWUoaXNTdHJpbmcoZmllbGQua2V5KSA/IGZpZWxkLmtleSA6ICcnKTtcbiAgICAgICAgdGhpcy5jbGFzc05hbWUuc2V0VmFsdWUoaXNTdHJpbmcoZmllbGQuY2xhc3NOYW1lKSA/IGZpZWxkLmNsYXNzTmFtZSA6ICcnKTtcbiAgICAgICAgdGhpcy5maWVsZEdyb3VwQ2xhc3NOYW1lLnNldFZhbHVlKGlzU3RyaW5nKGZpZWxkLmZpZWxkR3JvdXBDbGFzc05hbWUpID8gZmllbGQuZmllbGRHcm91cENsYXNzTmFtZSA6ICcnKTtcbiAgICAgICAgdGhpcy50eXBlLnNldFZhbHVlKGlzU3RyaW5nKGZpZWxkLnR5cGUpID8gZmllbGQudHlwZSA6ICcnKTtcbiAgICAgICAgdGhpcy5maWVsZHMgPSB0aGlzLmZpZWxkc1NlcnZpY2UuZ2V0VHlwZUZpZWxkcyh0aGlzLnR5cGUudmFsdWUpO1xuICAgICAgICB0aGlzLmZpZWxkRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgICAgICB0aGlzLmZpZWxkID0gY2xvbmVEZWVwKGZpZWxkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZhbHVlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZDtcbiAgICAgICAgZmllbGQua2V5ID0gdGhpcy5rZXkudmFsdWU7XG4gICAgICAgIGZpZWxkLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lLnZhbHVlO1xuICAgICAgICBmaWVsZC5maWVsZEdyb3VwQ2xhc3NOYW1lID0gdGhpcy5maWVsZEdyb3VwQ2xhc3NOYW1lLnZhbHVlO1xuICAgICAgICBmaWVsZC50eXBlID0gdGhpcy50eXBlLnZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKGZpZWxkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVHlwZUNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMudHlwZS52YWx1ZTtcbiAgICAgICAgdGhpcy5maWVsZHMgPSB0aGlzLmZpZWxkc1NlcnZpY2UuZ2V0VHlwZUZpZWxkcyh0eXBlKTtcbiAgICAgICAgY29uc3QgZGVzaWduZXJUeXBlID0gdGhpcy5mb3JtbHlEZXNpZ25lckNvbmZpZy50eXBlc1t0eXBlXTtcbiAgICAgICAgdGhpcy5maWVsZEFycmF5ID0gZGVzaWduZXJUeXBlICYmIGRlc2lnbmVyVHlwZS5maWVsZEFycmF5O1xuICAgICAgICB0aGlzLmZpZWxkRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgICAgICB0aGlzLmZpZWxkID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWVsZCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVmFsdWVDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25XcmFwcGVyc1NlbGVjdGVkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZUZpZWxkKGZpZWxkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRvcihjb250cm9sOiBGb3JtR3JvdXApOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBjb250cm9sLmdldCgndHlwZScpIGFzIEZvcm1Db250cm9sO1xuICAgICAgICBjb25zdCBoYXNUeXBlID0gaXNTdHJpbmcodHlwZS52YWx1ZSkgJiYgdHlwZS52YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcblxuICAgICAgICBjb25zdCBrZXkgPSBjb250cm9sLmdldCgna2V5JykgYXMgRm9ybUNvbnRyb2w7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHsga2V5OiBmYWxzZSwgdHlwZTogdGhpcy5zaG93VHlwZSAmJiAhaGFzVHlwZSwgY29uZmxpY3Q6IGZhbHNlIH07XG4gICAgICAgIGlmIChoYXNUeXBlICYmICghaXNTdHJpbmcoa2V5LnZhbHVlKSB8fCBrZXkudmFsdWUudHJpbSgpLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5rZXkgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5rZXkgfHwgcmVzdWx0LnR5cGUgPyByZXN1bHQgOiBudWxsO1xuICAgIH1cbn1cbiJdfQ==