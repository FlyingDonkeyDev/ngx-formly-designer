/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldsService } from './fields.service';
import { FormlyConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from './formly-designer-config';
import { BehaviorSubject } from 'rxjs';
import { cloneDeep, get, isArray, isEmpty, isFunction, isString, set, unset } from './util';
export class FormlyDesignerService {
    /**
     * @param {?} designerConfig
     * @param {?} fieldsService
     * @param {?} formlyConfig
     */
    constructor(designerConfig, fieldsService, formlyConfig) {
        this.designerConfig = designerConfig;
        this.fieldsService = fieldsService;
        this.formlyConfig = formlyConfig;
        this._disabled = new BehaviorSubject(false);
        this._fields = new BehaviorSubject([]);
        this._model = new BehaviorSubject({});
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled.next(!!value);
    }
    /**
     * @return {?}
     */
    get disabled$() {
        return this._disabled.asObservable();
    }
    /**
     * @return {?}
     */
    get fields() {
        return this._fields.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set fields(value) {
        // Prune the fields because ngx-formly pollutes them with internal state
        // causing incorrect behavior when re-applied.
        /** @type {?} */
        const fields = this.createPrunedFields(isArray(value) ? value : []);
        this._fields.next(fields);
    }
    /**
     * @return {?}
     */
    get fields$() {
        return this._fields.asObservable();
    }
    /**
     * @return {?}
     */
    get model() {
        return this._model.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set model(value) {
        this._model.next(value == null ? {} : value);
    }
    /**
     * @return {?}
     */
    get model$() {
        return this._model.asObservable();
    }
    /**
     * @param {?} field
     * @return {?}
     */
    addField(field) {
        this.fieldsService.mutateField(field, false);
        /** @type {?} */
        const fields = cloneDeep(this.fields);
        fields.push(field);
        this.fields = fields;
        this.model = cloneDeep(this.model);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    removeField(field) {
        this.unsetField(field);
        if (this.replaceField(this.fields, field, undefined)) {
            this.removeControl(field.formControl);
        }
        this.fields = cloneDeep(this.fields);
        this.model = cloneDeep(this.model);
    }
    /**
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    updateField(original, modified) {
        /** @type {?} */
        const pruned = this.fieldsService.mutateField(this.createPrunedField(modified), false);
        if (this.replaceField(this.fields, original, pruned)) {
            if (original.formControl !== pruned.formControl) {
                this.unsetField(original);
                this.removeControl(original.formControl);
            }
            this.fields = cloneDeep(this.fields);
            this.model = cloneDeep(this.model);
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    convertField(field) {
        return this.createPrunedField(field);
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    convertFields(fields) {
        return this.createPrunedFields(fields);
    }
    /**
     * @return {?}
     */
    createDesignerFields() {
        return this.createPrunedFields(this.fields);
    }
    /**
     * @private
     * @param {?} fields
     * @return {?}
     */
    createPrunedFields(fields) {
        /** @type {?} */
        const prunedFields = [];
        if (isArray(fields)) {
            fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                /** @type {?} */
                const pruned = this.createPrunedField(field);
                if (field.fieldArray) {
                    pruned.fieldArray = this.createPrunedField(field.fieldArray);
                }
                else if (field.fieldGroup && !pruned.fieldArray) {
                    pruned.fieldGroup = this.createPrunedFields(field.fieldGroup);
                }
                if (Object.keys(pruned).length > 0) {
                    prunedFields.push(pruned);
                }
            }));
        }
        return prunedFields;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    getWrappers(field) {
        if (!field || !isArray(field.wrappers)) {
            return [];
        }
        /** @type {?} */
        const clonedField = cloneDeep(field);
        /** @type {?} */
        let wrappers = clonedField.wrappers = (clonedField.wrappers || []);
        if (isFunction(this.designerConfig.settings.filterWrapper)) {
            wrappers = wrappers.filter((/**
             * @param {?} w
             * @return {?}
             */
            w => this.designerConfig.settings.filterWrapper(w, clonedField)));
        }
        // Determine wrappers part of the formly configuration (static and dynamic) to exclude them from the result
        /** @type {?} */
        const staticWrappers = field.type ? this.formlyConfig.getType(field.type).wrappers || [] : [];
        /** @type {?} */
        const typeWrappers = staticWrappers
            .concat(this.formlyConfig.templateManipulators.preWrapper.map((/**
         * @param {?} m
         * @return {?}
         */
        m => m(clonedField))))
            .concat(this.formlyConfig.templateManipulators.postWrapper.map((/**
         * @param {?} m
         * @return {?}
         */
        m => m(clonedField))))
            .filter((/**
         * @param {?} w
         * @return {?}
         */
        w => w));
        // Remove wrappers part of the formly configuration from the result
        if (typeWrappers.length > 0) {
            for (let i = wrappers.length - 1; i >= 0; i--) {
                for (let j = typeWrappers.length - 1; j >= 0; j--) {
                    if (wrappers[i] === typeWrappers[j]) {
                        typeWrappers.splice(j, 1);
                        wrappers.splice(i, 1);
                        break;
                    }
                }
            }
        }
        return wrappers;
    }
    /**
     * Prunes the field of paths not identified in the designer config
     * @private
     * @param {?} field
     * @return {?}
     */
    createPrunedField(field) {
        /** @type {?} */
        const type = get(field, 'templateOptions.$fieldArray.type', field.type);
        /** @type {?} */
        const designerType = this.designerConfig.types[type];
        /** @type {?} */
        const pruned = isEmpty(field.key) ? {} : { key: field.key };
        if (designerType) {
            pruned.type = type;
            this.applyProperties(field, pruned, designerType.fields);
            if (designerType.fieldArray) {
                pruned.fieldArray = {
                    fieldGroup: this.createPrunedFields(field.fieldGroup)
                };
            }
        }
        if (isArray(field.fieldGroup) && !isArray(pruned.fieldArray)) {
            pruned.fieldGroup = this.createPrunedFields(field.fieldGroup);
            /** @type {?} */
            let fieldGroupClassName;
            if (isString(field.fieldGroupClassName) && (fieldGroupClassName = field.fieldGroupClassName.trim()).length > 0) {
                pruned.fieldGroupClassName = fieldGroupClassName;
            }
        }
        /** @type {?} */
        let className;
        if (isString(field.className) && (className = field.className.trim()).length > 0) {
            pruned.className = className;
        }
        /** @type {?} */
        const wrappers = this.getWrappers(field);
        if (wrappers.length > 0) {
            pruned.wrappers = wrappers;
            /** @type {?} */
            const designerWrapperFields = wrappers.map((/**
             * @param {?} wrapper
             * @return {?}
             */
            wrapper => this.designerConfig.wrappers[wrapper]))
                .filter((/**
             * @param {?} designerOption
             * @return {?}
             */
            designerOption => designerOption && isArray(designerOption.fields)))
                .reduce((/**
             * @param {?} previous
             * @param {?} current
             * @return {?}
             */
            (previous, current) => previous.concat(current.fields)), []);
            this.applyProperties(field, pruned, designerWrapperFields);
        }
        return pruned;
    }
    /**
     * @private
     * @param {?} field
     * @param {?} designed
     * @param {?} designerFields
     * @return {?}
     */
    applyProperties(field, designed, designerFields) {
        if (isArray(designerFields)) {
            designerFields.forEach((/**
             * @param {?} designerField
             * @return {?}
             */
            designerField => {
                /** @type {?} */
                const value = get(field, designerField.key);
                if (value != null && (!isString(value) || value.length > 0) && value !== designerField.defaultValue) {
                    set(designed, designerField.key, value);
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} fields
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    replaceField(fields, original, modified) {
        if (isArray(fields)) {
            /** @type {?} */
            const l = fields.length;
            for (let i = 0; i < l; i++) {
                /** @type {?} */
                const field = fields[i];
                if (field === original) {
                    if (modified == null) {
                        fields.splice(i, 1);
                    }
                    else {
                        fields[i] = modified;
                    }
                    return true;
                }
                if (field.fieldGroup && this.replaceField(field.fieldGroup, original, modified)) {
                    return true;
                }
                if (field.fieldArray && this.replaceFieldArray(field, original, modified)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} parent
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    replaceFieldArray(parent, original, modified) {
        /** @type {?} */
        const fieldArray = parent.fieldArray;
        if (fieldArray === original) {
            parent.fieldArray = modified;
            return true;
        }
        if (fieldArray.fieldGroup && this.replaceField(fieldArray.fieldGroup, original, modified)) {
            return true;
        }
        return fieldArray.fieldArray && this.replaceFieldArray(fieldArray, original, modified);
    }
    /**
     * @private
     * @param {?} key
     * @param {?} path
     * @param {?=} arrayNext
     * @return {?}
     */
    buildPath(key, path, arrayNext = false) {
        return path ? key + (arrayNext ? path : '.' + path) : key;
    }
    /**
     * @private
     * @param {?} control
     * @param {?=} includeSelf
     * @return {?}
     */
    path(control, includeSelf = true) {
        /** @type {?} */
        let path = '';
        /** @type {?} */
        let arrayNext = false;
        if (!includeSelf) {
            control = (control || (/** @type {?} */ ({}))).parent;
        }
        for (let child = control, parent = (control || (/** @type {?} */ ({}))).parent; !!parent; child = parent, parent = parent.parent) {
            if (parent instanceof FormGroup) {
                for (const key in parent.controls) {
                    if (parent.controls[key] === child) {
                        path = this.buildPath(key, path, arrayNext);
                        arrayNext = false;
                        break;
                    }
                }
            }
            else if (parent instanceof FormArray) {
                for (let i = 0; i < parent.length; i++) {
                    if (parent.at(i) === child) {
                        path = this.buildPath('[' + i + ']', path, arrayNext);
                        arrayNext = true;
                        break;
                    }
                }
            }
        }
        return path;
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    unsetField(field) {
        if (field) {
            if (field.fieldArray) {
                this.unsetField(field.fieldArray);
            }
            if (field.fieldGroup) {
                field.fieldGroup.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => this.unsetField(f)));
            }
            if (field.formControl) {
                /** @type {?} */
                const path = this.path(field.formControl);
                unset(this.model, path);
            }
        }
    }
    /**
     * @private
     * @param {?} control
     * @return {?}
     */
    removeControl(control) {
        /** @type {?} */
        const parent = control ? control.parent : undefined;
        if (parent instanceof FormGroup) {
            for (const key in parent.controls) {
                if (parent.controls[key] === control) {
                    parent.removeControl(key);
                    return;
                }
            }
        }
        else if (parent instanceof FormArray) {
            for (let i = 0; i < parent.length; i++) {
                if (parent.at(i) === control) {
                    parent.removeAt(i);
                    return;
                }
            }
        }
    }
}
FormlyDesignerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FormlyDesignerService.ctorParameters = () => [
    { type: FormlyDesignerConfig },
    { type: FieldsService },
    { type: FormlyConfig }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerService.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerService.prototype._fields;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerService.prototype._model;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerService.prototype.designerConfig;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerService.prototype.fieldsService;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerService.prototype.formlyConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2Zvcm1seS1kZXNpZ25lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBbUIsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFxQixNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHNUYsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7O0lBQ2hDLFlBQ1UsY0FBb0MsRUFDcEMsYUFBNEIsRUFDNUIsWUFBMEI7UUFGMUIsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBR25CLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUNoRCxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQztJQUpuRCxDQUFDOzs7O0lBTUwsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztJ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QyxRQUFRLEVBQUU7Z0JBQ2pDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxPQUFPLEVBQUU7b0JBQ3BDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFCLE9BQU87aUJBQ1I7YUFDRjtTQUNGO2FBQU0sSUFBSSxNQUFNLFlBQVksU0FBUyxFQUFFO1lBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO29CQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQixPQUFPO2lCQUNSO2FBQ0Y7U0FDRjtJQUNILENBQUM7OztZQTdTRixVQUFVOzs7O1lBSkYsb0JBQW9CO1lBRnBCLGFBQWE7WUFDYixZQUFZOzs7Ozs7O0lBYW5CLDBDQUFpRTs7Ozs7SUFDakUsd0NBQXdFOzs7OztJQUN4RSx1Q0FBdUQ7Ozs7O0lBUHJELCtDQUE0Qzs7Ozs7SUFDNUMsOENBQW9DOzs7OztJQUNwQyw2Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1BcnJheSwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRzU2VydmljZSB9IGZyb20gJy4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybWx5Q29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJDb25maWcgfSBmcm9tICcuL2Zvcm1seS1kZXNpZ25lci1jb25maWcnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjbG9uZURlZXAsIGdldCwgaXNBcnJheSwgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHNldCwgdW5zZXQgfSBmcm9tICcuL3V0aWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybWx5RGVzaWduZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWcsXG4gICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9ybWx5Q29uZmlnOiBGb3JtbHlDb25maWdcbiAgKSB7IH1cblxuICBwcml2YXRlIHJlYWRvbmx5IF9kaXNhYmxlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9maWVsZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZvcm1seUZpZWxkQ29uZmlnW10+KFtdKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbW9kZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oe30pO1xuXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQudmFsdWU7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZC5uZXh0KCEhdmFsdWUpO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkJCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgZmllbGRzKCk6IEZvcm1seUZpZWxkQ29uZmlnW10ge1xuICAgIHJldHVybiB0aGlzLl9maWVsZHMudmFsdWU7XG4gIH1cblxuICBzZXQgZmllbGRzKHZhbHVlOiBGb3JtbHlGaWVsZENvbmZpZ1tdKSB7XG4gICAgLy8gUHJ1bmUgdGhlIGZpZWxkcyBiZWNhdXNlIG5neC1mb3JtbHkgcG9sbHV0ZXMgdGhlbSB3aXRoIGludGVybmFsIHN0YXRlXG4gICAgLy8gY2F1c2luZyBpbmNvcnJlY3QgYmVoYXZpb3Igd2hlbiByZS1hcHBsaWVkLlxuICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSk7XG4gICAgdGhpcy5fZmllbGRzLm5leHQoZmllbGRzKTtcbiAgfVxuXG4gIGdldCBmaWVsZHMkKCk6IE9ic2VydmFibGU8Rm9ybWx5RmllbGRDb25maWdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9maWVsZHMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgbW9kZWwoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwudmFsdWU7XG4gIH1cblxuICBzZXQgbW9kZWwodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX21vZGVsLm5leHQodmFsdWUgPT0gbnVsbCA/IHt9IDogdmFsdWUpO1xuICB9XG5cbiAgZ2V0IG1vZGVsJCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGFkZEZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgIHRoaXMuZmllbGRzU2VydmljZS5tdXRhdGVGaWVsZChmaWVsZCwgZmFsc2UpO1xuXG4gICAgY29uc3QgZmllbGRzID0gY2xvbmVEZWVwKHRoaXMuZmllbGRzKTtcbiAgICBmaWVsZHMucHVzaChmaWVsZCk7XG5cbiAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICB0aGlzLm1vZGVsID0gY2xvbmVEZWVwKHRoaXMubW9kZWwpO1xuICB9XG5cbiAgcmVtb3ZlRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgdGhpcy51bnNldEZpZWxkKGZpZWxkKTtcbiAgICBpZiAodGhpcy5yZXBsYWNlRmllbGQodGhpcy5maWVsZHMsIGZpZWxkLCB1bmRlZmluZWQpKSB7XG4gICAgICB0aGlzLnJlbW92ZUNvbnRyb2woZmllbGQuZm9ybUNvbnRyb2wpO1xuICAgIH1cblxuICAgIHRoaXMuZmllbGRzID0gY2xvbmVEZWVwKHRoaXMuZmllbGRzKTtcbiAgICB0aGlzLm1vZGVsID0gY2xvbmVEZWVwKHRoaXMubW9kZWwpO1xuICB9XG5cbiAgdXBkYXRlRmllbGQob3JpZ2luYWw6IEZvcm1seUZpZWxkQ29uZmlnLCBtb2RpZmllZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICBjb25zdCBwcnVuZWQgPSB0aGlzLmZpZWxkc1NlcnZpY2UubXV0YXRlRmllbGQodGhpcy5jcmVhdGVQcnVuZWRGaWVsZChtb2RpZmllZCksIGZhbHNlKTtcblxuICAgIGlmICh0aGlzLnJlcGxhY2VGaWVsZCh0aGlzLmZpZWxkcywgb3JpZ2luYWwsIHBydW5lZCkpIHtcbiAgICAgIGlmIChvcmlnaW5hbC5mb3JtQ29udHJvbCAhPT0gcHJ1bmVkLmZvcm1Db250cm9sKSB7XG4gICAgICAgIHRoaXMudW5zZXRGaWVsZChvcmlnaW5hbCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29udHJvbChvcmlnaW5hbC5mb3JtQ29udHJvbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmllbGRzID0gY2xvbmVEZWVwKHRoaXMuZmllbGRzKTtcbiAgICAgIHRoaXMubW9kZWwgPSBjbG9uZURlZXAodGhpcy5tb2RlbCk7XG4gICAgfVxuICB9XG5cbiAgY29udmVydEZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVQcnVuZWRGaWVsZChmaWVsZCk7XG4gIH1cblxuICBjb252ZXJ0RmllbGRzKGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSk6IEZvcm1seUZpZWxkQ29uZmlnW10ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkcyhmaWVsZHMpO1xuICB9XG5cbiAgY3JlYXRlRGVzaWduZXJGaWVsZHMoKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKHRoaXMuZmllbGRzKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUHJ1bmVkRmllbGRzKGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSk6IEZvcm1seUZpZWxkQ29uZmlnW10ge1xuICAgIGNvbnN0IHBydW5lZEZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSA9IFtdO1xuICAgIGlmIChpc0FycmF5KGZpZWxkcykpIHtcbiAgICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgY29uc3QgcHJ1bmVkID0gdGhpcy5jcmVhdGVQcnVuZWRGaWVsZChmaWVsZCk7XG4gICAgICAgIGlmIChmaWVsZC5maWVsZEFycmF5KSB7XG4gICAgICAgICAgcHJ1bmVkLmZpZWxkQXJyYXkgPSB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkKGZpZWxkLmZpZWxkQXJyYXkpO1xuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLmZpZWxkR3JvdXAgJiYgIXBydW5lZC5maWVsZEFycmF5KSB7XG4gICAgICAgICAgcHJ1bmVkLmZpZWxkR3JvdXAgPSB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkcyhmaWVsZC5maWVsZEdyb3VwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmtleXMocHJ1bmVkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcHJ1bmVkRmllbGRzLnB1c2gocHJ1bmVkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcnVuZWRGaWVsZHM7XG4gIH1cblxuICBnZXRXcmFwcGVycyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiBzdHJpbmdbXSB7XG4gICAgaWYgKCFmaWVsZCB8fCAhaXNBcnJheShmaWVsZC53cmFwcGVycykpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZWRGaWVsZCA9IGNsb25lRGVlcChmaWVsZCk7XG4gICAgbGV0IHdyYXBwZXJzID0gY2xvbmVkRmllbGQud3JhcHBlcnMgPSAoY2xvbmVkRmllbGQud3JhcHBlcnMgfHwgW10pO1xuICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMuZGVzaWduZXJDb25maWcuc2V0dGluZ3MuZmlsdGVyV3JhcHBlcikpIHtcbiAgICAgIHdyYXBwZXJzID0gd3JhcHBlcnMuZmlsdGVyKHcgPT4gdGhpcy5kZXNpZ25lckNvbmZpZy5zZXR0aW5ncy5maWx0ZXJXcmFwcGVyKHcsIGNsb25lZEZpZWxkKSk7XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdyYXBwZXJzIHBhcnQgb2YgdGhlIGZvcm1seSBjb25maWd1cmF0aW9uIChzdGF0aWMgYW5kIGR5bmFtaWMpIHRvIGV4Y2x1ZGUgdGhlbSBmcm9tIHRoZSByZXN1bHRcbiAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IGZpZWxkLnR5cGUgPyB0aGlzLmZvcm1seUNvbmZpZy5nZXRUeXBlKGZpZWxkLnR5cGUpLndyYXBwZXJzIHx8IFtdIDogW107XG4gICAgY29uc3QgdHlwZVdyYXBwZXJzID0gc3RhdGljV3JhcHBlcnNcbiAgICAgIC5jb25jYXQodGhpcy5mb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5tYXAobSA9PiBtKGNsb25lZEZpZWxkKSkpXG4gICAgICAuY29uY2F0KHRoaXMuZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnBvc3RXcmFwcGVyLm1hcChtID0+IG0oY2xvbmVkRmllbGQpKSlcbiAgICAgIC5maWx0ZXIodyA9PiB3KTtcblxuICAgIC8vIFJlbW92ZSB3cmFwcGVycyBwYXJ0IG9mIHRoZSBmb3JtbHkgY29uZmlndXJhdGlvbiBmcm9tIHRoZSByZXN1bHRcbiAgICBpZiAodHlwZVdyYXBwZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSB3cmFwcGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBmb3IgKGxldCBqID0gdHlwZVdyYXBwZXJzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgaWYgKHdyYXBwZXJzW2ldID09PSB0eXBlV3JhcHBlcnNbal0pIHtcbiAgICAgICAgICAgIHR5cGVXcmFwcGVycy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICB3cmFwcGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXJzO1xuICB9XG5cbiAgLyoqIFBydW5lcyB0aGUgZmllbGQgb2YgcGF0aHMgbm90IGlkZW50aWZpZWQgaW4gdGhlIGRlc2lnbmVyIGNvbmZpZyAqL1xuICBwcml2YXRlIGNyZWF0ZVBydW5lZEZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICBjb25zdCB0eXBlID0gZ2V0KGZpZWxkLCAndGVtcGxhdGVPcHRpb25zLiRmaWVsZEFycmF5LnR5cGUnLCBmaWVsZC50eXBlKTtcbiAgICBjb25zdCBkZXNpZ25lclR5cGUgPSB0aGlzLmRlc2lnbmVyQ29uZmlnLnR5cGVzW3R5cGVdO1xuICAgIGNvbnN0IHBydW5lZDogRm9ybWx5RmllbGRDb25maWcgPSBpc0VtcHR5KGZpZWxkLmtleSkgPyB7fSA6IHsga2V5OiBmaWVsZC5rZXkgfTtcblxuICAgIGlmIChkZXNpZ25lclR5cGUpIHtcbiAgICAgIHBydW5lZC50eXBlID0gdHlwZTtcbiAgICAgIHRoaXMuYXBwbHlQcm9wZXJ0aWVzKGZpZWxkLCBwcnVuZWQsIGRlc2lnbmVyVHlwZS5maWVsZHMpO1xuICAgICAgaWYgKGRlc2lnbmVyVHlwZS5maWVsZEFycmF5KSB7XG4gICAgICAgIHBydW5lZC5maWVsZEFycmF5ID0ge1xuICAgICAgICAgIGZpZWxkR3JvdXA6IHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKGZpZWxkLmZpZWxkR3JvdXApXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkoZmllbGQuZmllbGRHcm91cCkgJiYgIWlzQXJyYXkocHJ1bmVkLmZpZWxkQXJyYXkpKSB7XG4gICAgICBwcnVuZWQuZmllbGRHcm91cCA9IHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKGZpZWxkLmZpZWxkR3JvdXApO1xuXG4gICAgICBsZXQgZmllbGRHcm91cENsYXNzTmFtZTogc3RyaW5nO1xuICAgICAgaWYgKGlzU3RyaW5nKGZpZWxkLmZpZWxkR3JvdXBDbGFzc05hbWUpICYmIChmaWVsZEdyb3VwQ2xhc3NOYW1lID0gZmllbGQuZmllbGRHcm91cENsYXNzTmFtZS50cmltKCkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcHJ1bmVkLmZpZWxkR3JvdXBDbGFzc05hbWUgPSBmaWVsZEdyb3VwQ2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjbGFzc05hbWU6IHN0cmluZztcbiAgICBpZiAoaXNTdHJpbmcoZmllbGQuY2xhc3NOYW1lKSAmJiAoY2xhc3NOYW1lID0gZmllbGQuY2xhc3NOYW1lLnRyaW0oKSkubGVuZ3RoID4gMCkge1xuICAgICAgcHJ1bmVkLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVycyA9IHRoaXMuZ2V0V3JhcHBlcnMoZmllbGQpO1xuICAgIGlmICh3cmFwcGVycy5sZW5ndGggPiAwKSB7XG4gICAgICBwcnVuZWQud3JhcHBlcnMgPSB3cmFwcGVycztcbiAgICAgIGNvbnN0IGRlc2lnbmVyV3JhcHBlckZpZWxkcyA9IHdyYXBwZXJzLm1hcCh3cmFwcGVyID0+IHRoaXMuZGVzaWduZXJDb25maWcud3JhcHBlcnNbd3JhcHBlcl0pXG4gICAgICAgIC5maWx0ZXIoZGVzaWduZXJPcHRpb24gPT4gZGVzaWduZXJPcHRpb24gJiYgaXNBcnJheShkZXNpZ25lck9wdGlvbi5maWVsZHMpKVxuICAgICAgICAucmVkdWNlPEZvcm1seUZpZWxkQ29uZmlnW10+KChwcmV2aW91cywgY3VycmVudCkgPT4gcHJldmlvdXMuY29uY2F0KGN1cnJlbnQuZmllbGRzKSwgW10pO1xuICAgICAgdGhpcy5hcHBseVByb3BlcnRpZXMoZmllbGQsIHBydW5lZCwgZGVzaWduZXJXcmFwcGVyRmllbGRzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBydW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlQcm9wZXJ0aWVzKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZywgZGVzaWduZWQ6IEZvcm1seUZpZWxkQ29uZmlnLCBkZXNpZ25lckZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSk6IHZvaWQge1xuICAgIGlmIChpc0FycmF5KGRlc2lnbmVyRmllbGRzKSkge1xuICAgICAgZGVzaWduZXJGaWVsZHMuZm9yRWFjaChkZXNpZ25lckZpZWxkID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXQoZmllbGQsIGRlc2lnbmVyRmllbGQua2V5KTtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgKCFpc1N0cmluZyh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoID4gMCkgJiYgdmFsdWUgIT09IGRlc2lnbmVyRmllbGQuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgc2V0KGRlc2lnbmVkLCBkZXNpZ25lckZpZWxkLmtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlcGxhY2VGaWVsZChmaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10sIG9yaWdpbmFsOiBGb3JtbHlGaWVsZENvbmZpZywgbW9kaWZpZWQ6IEZvcm1seUZpZWxkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzQXJyYXkoZmllbGRzKSkge1xuICAgICAgY29uc3QgbCA9IGZpZWxkcy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGZpZWxkc1tpXTtcbiAgICAgICAgaWYgKGZpZWxkID09PSBvcmlnaW5hbCkge1xuICAgICAgICAgIGlmIChtb2RpZmllZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBmaWVsZHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWVsZHNbaV0gPSBtb2RpZmllZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkR3JvdXAgJiYgdGhpcy5yZXBsYWNlRmllbGQoZmllbGQuZmllbGRHcm91cCwgb3JpZ2luYWwsIG1vZGlmaWVkKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZC5maWVsZEFycmF5ICYmIHRoaXMucmVwbGFjZUZpZWxkQXJyYXkoZmllbGQsIG9yaWdpbmFsLCBtb2RpZmllZCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHJlcGxhY2VGaWVsZEFycmF5KHBhcmVudDogRm9ybWx5RmllbGRDb25maWcsIG9yaWdpbmFsOiBGb3JtbHlGaWVsZENvbmZpZywgbW9kaWZpZWQ6IEZvcm1seUZpZWxkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZmllbGRBcnJheSA9IHBhcmVudC5maWVsZEFycmF5O1xuICAgIGlmIChmaWVsZEFycmF5ID09PSBvcmlnaW5hbCkge1xuICAgICAgcGFyZW50LmZpZWxkQXJyYXkgPSBtb2RpZmllZDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoZmllbGRBcnJheS5maWVsZEdyb3VwICYmIHRoaXMucmVwbGFjZUZpZWxkKGZpZWxkQXJyYXkuZmllbGRHcm91cCwgb3JpZ2luYWwsIG1vZGlmaWVkKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmaWVsZEFycmF5LmZpZWxkQXJyYXkgJiYgdGhpcy5yZXBsYWNlRmllbGRBcnJheShmaWVsZEFycmF5LCBvcmlnaW5hbCwgbW9kaWZpZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFBhdGgoa2V5OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgYXJyYXlOZXh0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gcGF0aCA/IGtleSArIChhcnJheU5leHQgPyBwYXRoIDogJy4nICsgcGF0aCkgOiBrZXk7XG4gIH1cblxuICBwcml2YXRlIHBhdGgoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBpbmNsdWRlU2VsZjogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgIGxldCBwYXRoID0gJyc7XG4gICAgbGV0IGFycmF5TmV4dCA9IGZhbHNlO1xuXG4gICAgaWYgKCFpbmNsdWRlU2VsZikge1xuICAgICAgY29udHJvbCA9IChjb250cm9sIHx8IHt9IGFzIEFic3RyYWN0Q29udHJvbCkucGFyZW50O1xuICAgIH1cbiAgICBmb3IgKGxldCBjaGlsZCA9IGNvbnRyb2wsIHBhcmVudCA9IChjb250cm9sIHx8IHt9IGFzIEFic3RyYWN0Q29udHJvbCkucGFyZW50OyAhIXBhcmVudDsgY2hpbGQgPSBwYXJlbnQsIHBhcmVudCA9IHBhcmVudC5wYXJlbnQpIHtcbiAgICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGFyZW50LmNvbnRyb2xzKSB7XG4gICAgICAgICAgaWYgKHBhcmVudC5jb250cm9sc1trZXldID09PSBjaGlsZCkge1xuICAgICAgICAgICAgcGF0aCA9IHRoaXMuYnVpbGRQYXRoKGtleSwgcGF0aCwgYXJyYXlOZXh0KTtcbiAgICAgICAgICAgIGFycmF5TmV4dCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChwYXJlbnQuYXQoaSkgPT09IGNoaWxkKSB7XG4gICAgICAgICAgICBwYXRoID0gdGhpcy5idWlsZFBhdGgoJ1snICsgaSArICddJywgcGF0aCwgYXJyYXlOZXh0KTtcbiAgICAgICAgICAgIGFycmF5TmV4dCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBwcml2YXRlIHVuc2V0RmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgaWYgKGZpZWxkKSB7XG4gICAgICBpZiAoZmllbGQuZmllbGRBcnJheSkge1xuICAgICAgICB0aGlzLnVuc2V0RmllbGQoZmllbGQuZmllbGRBcnJheSk7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgICBmaWVsZC5maWVsZEdyb3VwLmZvckVhY2goZiA9PiB0aGlzLnVuc2V0RmllbGQoZikpO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkLmZvcm1Db250cm9sKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLnBhdGgoZmllbGQuZm9ybUNvbnRyb2wpO1xuICAgICAgICB1bnNldCh0aGlzLm1vZGVsLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNvbnRyb2woY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogdm9pZCB7XG4gICAgY29uc3QgcGFyZW50ID0gY29udHJvbCA/IGNvbnRyb2wucGFyZW50IDogdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmVudC5jb250cm9scykge1xuICAgICAgICBpZiAocGFyZW50LmNvbnRyb2xzW2tleV0gPT09IGNvbnRyb2wpIHtcbiAgICAgICAgICBwYXJlbnQucmVtb3ZlQ29udHJvbChrZXkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyZW50IGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocGFyZW50LmF0KGkpID09PSBjb250cm9sKSB7XG4gICAgICAgICAgcGFyZW50LnJlbW92ZUF0KGkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19