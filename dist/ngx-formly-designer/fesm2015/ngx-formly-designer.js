import { cloneDeep, get, set, unset } from 'lodash-es';
import { CommonModule } from '@angular/common';
import { FieldWrapper, FormlyConfig, FormlyForm, FormlyModule } from '@ngx-formly/core';
import { catchError, tap, debounceTime, switchMap } from 'rxjs/operators';
import { BehaviorSubject, timer, NEVER, merge } from 'rxjs';
import { FormArray, FormGroup, FormControl, FormBuilder, NG_VALUE_ACCESSOR, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, ViewContainerRef, Injectable, Inject, InjectionToken, ChangeDetectorRef, ElementRef, NgZone, EventEmitter, Input, Output, ViewEncapsulation, forwardRef, Pipe, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import 'jquery';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyDesignerWrapperComponent extends FieldWrapper {
}
FormlyDesignerWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-wrapper',
                template: `
        <ng-template #fieldComponent></ng-template>
    `
            }] }
];
FormlyDesignerWrapperComponent.propDecorators = {
    fieldComponent: [{ type: ViewChild, args: ['fieldComponent', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FORMLY_DESIGNER_CONFIG_TOKEN = new InjectionToken('FORMLY_DESIGNER_CONFIG_TOKEN');
class FormlyDesignerConfig {
    /**
     * @param {?=} configs
     * @param {?=} formlyConfig
     */
    constructor(configs = [], formlyConfig) {
        this.formlyConfig = formlyConfig;
        this.types = {};
        this.wrappers = {};
        this.settings = { showClassName: true };
        configs.forEach((/**
         * @param {?} config
         * @return {?}
         */
        config => this.addConfig(config)));
    }
    /**
     * @param {?} config
     * @return {?}
     */
    addConfig(config) {
        if (config.settings) {
            this.setSettings(config.settings);
        }
        if (config.types) {
            this.setType(config.types);
        }
        if (config.wrappers) {
            this.setWrapper(config.wrappers);
        }
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    setSettings(settings) {
        if (settings.showClassName !== undefined) {
            this.settings.showClassName = !!settings.showClassName;
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setType(options) {
        if (Array.isArray(options)) {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                this.setType(option);
            }));
        }
        else {
            // Throw if type isn't part of the formly config
            this.formlyConfig.getType(options.name);
            if (!this.types[options.name]) {
                this.types[options.name] = (/** @type {?} */ ({}));
            }
            /** @type {?} */
            const type = this.types[options.name];
            type.name = options.name;
            type.fieldArray = !!options.fieldArray;
            type.fieldGroup = !!options.fieldGroup;
            type.fields = options.fields;
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setWrapper(options) {
        if (Array.isArray(options)) {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                this.setWrapper(option);
            }));
        }
        else {
            // Throw if wrapper isn't part of the formly config
            this.formlyConfig.getWrapper(options.name);
            if (!this.wrappers[options.name]) {
                this.wrappers[options.name] = (/** @type {?} */ ({}));
            }
            /** @type {?} */
            const wrapper = this.wrappers[options.name];
            wrapper.name = options.name;
            wrapper.fields = options.fields;
        }
    }
}
FormlyDesignerConfig.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FormlyDesignerConfig.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [FORMLY_DESIGNER_CONFIG_TOKEN,] }] },
    { type: FormlyConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const keyPathMemberName = '_formlyDesignerKeyPath';
// Source: https://github.com/formly-js/ngx-formly/blob/master/src/core/src/lib/utils.ts
/**
 * @param {?} field
 * @return {?}
 */
function getKeyPath(field) {
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!((/** @type {?} */ (field)))[keyPathMemberName] || ((/** @type {?} */ (field)))[keyPathMemberName].key !== field.key) {
        /** @type {?} */
        let keyPath = [];
        if (field.key) {
            /* Also allow for an array key, hence the type check  */
            /** @type {?} */
            const pathElements = typeof field.key === 'string' ? field.key.split('.') : field.key;
            for (let pathElement of pathElements) {
                if (typeof pathElement === 'string') {
                    /* replace paths of the form names[2] by names.2, cfr. angular formly */
                    pathElement = pathElement.replace(/\[(\w+)\]/g, '.$1');
                    keyPath = keyPath.concat(pathElement.split('.'));
                }
                else {
                    keyPath.push(pathElement);
                }
            }
            for (let i = 0; i < keyPath.length; i++) {
                /** @type {?} */
                const pathElement = keyPath[i];
                if (typeof pathElement === 'string' && /^\d+$/.test(pathElement)) {
                    keyPath[i] = parseInt(pathElement, 10);
                }
            }
        }
        ((/** @type {?} */ (field)))[keyPathMemberName] = {
            key: field.key,
            path: keyPath,
        };
    }
    return ((/** @type {?} */ (field)))[keyPathMemberName].path.slice();
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function equalType(a, b) {
    return (!a.fieldArray === !b.fieldArray) && (!a.fieldGroup === !b.fieldGroup);
}
/**
 * @param {?} fields
 * @param {?} callback
 * @param {?=} path
 * @param {?=} parent
 * @return {?}
 */
function traverseFields(fields, callback, path, parent) {
    path = path || [];
    for (const field of fields) {
        if (callback(field, path, parent)) {
            return true;
        }
        if (field.fieldArray) {
            if (traverseFields([field.fieldArray], callback, path.concat(getKeyPath(field)), field)) {
                return true;
            }
        }
        else if (field.fieldGroup) {
            if (traverseFields(field.fieldGroup, callback, path.concat(getKeyPath(field)), field)) {
                return true;
            }
        }
    }
}
// https://stackoverflow.com/a/40294058
// export const cloneDeep = (obj, hash = new WeakMap()): typeof obj => {
//   if (Object(obj) !== obj) return obj; // primitives
//   if (hash.has(obj)) return hash.get(obj); // cyclic reference
//   const result = obj instanceof Date ? new Date(obj)
//     : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
//       : obj.constructor ? new obj.constructor()
//         : Object.create(null);
//   hash.set(obj, result);
//   if (obj instanceof Map)
//     Array.from(obj, ([key, val]) => result.set(key, cloneDeep(val, hash)));
//   return Object.assign(result, ...Object.keys(obj).map(
//     key => ({ [key]: cloneDeep(obj[key], hash) })));
// };
/** @type {?} */
const isArray = Array.isArray;
// https://stackoverflow.com/a/28953167
/** @type {?} */
const isEmpty = (/**
 * @param {?} val
 * @return {?}
 */
(val) => {
    if (val === undefined)
        return true;
    else if (typeof (val) === 'function' || typeof (val) === 'number' || typeof (val) === 'boolean'
        || Object.prototype.toString.call(val) === '[object Date]')
        return false;
    else if (val == null || val.length === 0) // null or 0 length array
        return true;
    else if (typeof (val) === 'object') {
        // empty object
        /** @type {?} */
        let r;
        for (const _ in val)
            r = false;
        return r;
    }
    return false;
});
/** @type {?} */
const isFunction = (/**
 * @param {?} val
 * @return {?}
 */
(val) => typeof val === 'function');
/** @type {?} */
const isObject = (/**
 * @param {?} val
 * @return {?}
 */
(val) => typeof val === 'object' && val != null);
/** @type {?} */
const isString = (/**
 * @param {?} val
 * @return {?}
 */
(val) => typeof val === 'string' || val instanceof String);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FieldsService {
    /**
     * @param {?} formlyDesignerConfig
     */
    constructor(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
    }
    /**
     * @param {?} field
     * @param {?} fields
     * @return {?}
     */
    getFullKeyPath(field, fields) {
        /** @type {?} */
        let keyPath = [];
        if (field && field.key) {
            /** @type {?} */
            const parents = new Map();
            traverseFields(fields, (/**
             * @param {?} f
             * @param {?} path
             * @param {?} parent
             * @return {?}
             */
            (f, path, parent) => {
                parents.set(f, parent);
            }));
            keyPath = getKeyPath(field);
            /** @type {?} */
            let cur = parents.get(field);
            while (cur) {
                keyPath = getKeyPath(cur).concat(keyPath);
                cur = parents.get(cur);
            }
        }
        return keyPath;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getTypeFields(type) {
        return this.getFields(type, 'type');
    }
    /**
     * @param {?} wrapper
     * @return {?}
     */
    getWrapperFields(wrapper) {
        return this.getFields(wrapper, 'wrapper');
    }
    /**
     * Check the field for control type conflict
     * @param {?} field
     * @param {?} fields
     * @param {?=} parent
     * @return {?}
     */
    checkField(field, fields, parent) {
        /** @type {?} */
        const fullPathByField = new Map();
        /** @type {?} */
        const newPath = this.getFullKeyPath(parent || {}, fields).concat(getKeyPath(field));
        /** @type {?} */
        const length = newPath.length;
        return !traverseFields(fields, (/**
         * @param {?} f
         * @param {?} p
         * @return {?}
         */
        (f, p) => {
            /** @type {?} */
            const path = fullPathByField.get(f) || fullPathByField.set(f, (p || []).concat(getKeyPath(f))).get(f);
            if (path.length !== length) {
                return;
            }
            for (let i = 0; i < length; i++) {
                if (path[i] !== newPath[i]) {
                    return;
                }
            }
            return !equalType(field, f);
        }));
    }
    /**
     * @param {?} field
     * @param {?} designerField
     * @return {?}
     */
    mutateField(field, designerField) {
        if (isObject(field.templateOptions)) {
            field.templateOptions['$designerField'] = designerField;
        }
        else {
            field.templateOptions = { $designerField: designerField };
        }
        if (field.fieldGroup) {
            this.mutateFields(field.fieldGroup, designerField);
        }
        else if (field.fieldArray && field.fieldArray.fieldGroup) {
            if (designerField) {
                this.mutateField(field.fieldArray, designerField);
            }
            else {
                // Treating fieldArrays as fieldGroups
                field.templateOptions['$fieldArray'] = { type: field.type };
                field.fieldGroup = field.fieldArray.fieldGroup;
                delete field.fieldArray;
                delete field.type;
                this.mutateFields(field.fieldGroup, designerField);
            }
        }
        return field;
    }
    /**
     * @param {?} fields
     * @param {?} designerFields
     * @return {?}
     */
    mutateFields(fields, designerFields) {
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        field => this.mutateField(field, designerFields)));
    }
    /**
     * @private
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    getFields(name, type) {
        /** @type {?} */
        const designerOption = (/** @type {?} */ ((name ? this.getDesignerOptions(type)[name] || {} : {})));
        /** @type {?} */
        const fields = cloneDeep(designerOption.fields || []);
        this.mutateFields(fields, true);
        return fields;
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    getDesignerOptions(type) {
        if (type === 'type') {
            return this.formlyDesignerConfig.types;
        }
        if (type === 'wrapper') {
            return this.formlyDesignerConfig.wrappers;
        }
        return {};
    }
}
FieldsService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FieldsService.ctorParameters = () => [
    { type: FormlyDesignerConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyDesignerService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyDesignerFieldWrapperComponent extends FieldWrapper {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyDesignerFieldGroupWrapperComponent extends FieldWrapper {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TemplateDesigner {
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    isNonDesignerField(field) {
        return field && (!field.templateOptions || field.templateOptions['$designerField'] !== true);
    }
    /**
     * @param {?} fc
     * @return {?}
     */
    run(fc) {
        fc.templateManipulators.preWrapper.push((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            if (this.isNonDesignerField(field)) {
                return field.fieldGroup ? 'fieldGroupDesigner' : 'fieldDesigner';
            }
        }));
        fc.templateManipulators.postWrapper.push((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            if (this.isNonDesignerField(field)) {
                return 'designer';
            }
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const fieldComponents = [];
/** @type {?} */
const wrapperComponents = [
    FormlyDesignerWrapperComponent,
    FormlyDesignerFieldWrapperComponent,
    FormlyDesignerFieldGroupWrapperComponent
];
/** @type {?} */
const config = {
    wrappers: [
        { name: 'designer', component: FormlyDesignerWrapperComponent },
        { name: 'fieldDesigner', component: FormlyDesignerFieldWrapperComponent },
        { name: 'fieldGroupDesigner', component: FormlyDesignerFieldGroupWrapperComponent }
    ],
    manipulators: [
        { class: TemplateDesigner, method: 'run' }
    ]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyDesignerComponent {
    /**
     * @param {?} fieldsService
     * @param {?} formBuilder
     * @param {?} formlyDesignerService
     */
    constructor(fieldsService, formBuilder, formlyDesignerService) {
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
    /**
     * @return {?}
     */
    get disabled() {
        return this.formlyDesignerService.disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this.formlyDesignerService.disabled = value;
    }
    /**
     * @return {?}
     */
    get fields() {
        return this.formlyDesignerService.fields;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set fields(value) {
        /** @type {?} */
        const fields = this.formlyDesignerService.convertFields(value);
        this.fieldsService.mutateFields(fields, false);
        this.formlyDesignerService.fields = fields;
    }
    /**
     * @return {?}
     */
    get model() {
        return this.formlyDesignerService.model;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set model(value) {
        this.formlyDesignerService.model = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Designer forms will be restricted to a single field depth; all designer keys should be
        // complex (e.g. "templateOptions.some.property")
        this.form = this.formBuilder.group({});
        this.subscriptions.push(this.formlyDesignerService.fields$
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.form = this.formBuilder.group({});
            this.fieldsChange.emit(this.formlyDesignerService.createDesignerFields());
        })));
        this.subscriptions.push(merge(this.formlyDesignerService.model$, this.form.valueChanges)
            .pipe(debounceTime(50))
            .subscribe((/**
         * @return {?}
         */
        () => this.modelChange.emit(this.formlyDesignerService.model))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.splice(0).forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        subscription => subscription.unsubscribe()));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onFieldSelected(field) {
        timer().pipe(tap((/**
         * @return {?}
         */
        () => {
            if (this.fieldsService.checkField(field, this.formlyDesignerService.fields)) {
                this.formlyDesignerService.addField(field);
            }
        })), catchError((/**
         * @return {?}
         */
        () => NEVER))).subscribe();
    }
}
FormlyDesignerComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer',
                template: `
        <formly-designer-field-picker (selected)="onFieldSelected($event)">
        </formly-designer-field-picker>
        <form novalidate [formGroup]="form">
            <formly-form [options]="options" [model]="formlyDesignerService.model" [form]="form" [fields]="formlyDesignerService.fields">
            </formly-form>
        </form>
        <!--<div>
            Designer Fields Debug:
            <pre>{{ fields | decycle | json }}</pre>
        </div>-->
    `,
                encapsulation: ViewEncapsulation.None,
                providers: [FormlyDesignerService],
                styles: [`
        formly-designer-field-picker .form-group > .input-group > formly-designer-type-select > select {
            border-radius: .25rem 0 0 .25rem;
            border-right: 0;
        }
        formly-designer-wrapper-editor .card > .card-body .form-control {
            width: 100%;
        }
        formly-designer-wrapper-picker .form-group > .input-group > formly-designer-wrapper-select > select {
            border-radius: .25rem 0 0 .25rem;
            border-right: 0;
        }
    `]
            }] }
];
/** @nocollapse */
FormlyDesignerComponent.ctorParameters = () => [
    { type: FieldsService },
    { type: FormBuilder },
    { type: FormlyDesignerService }
];
FormlyDesignerComponent.propDecorators = {
    formlyFormContainer: [{ type: ViewChild, args: ['formlyFormContainer', { read: ViewContainerRef },] }],
    fieldsChange: [{ type: Output }],
    modelChange: [{ type: Output }],
    disabled: [{ type: Input }],
    fields: [{ type: Input }],
    model: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FIELD_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => FieldEditorComponent)),
    multi: true
};
class FieldEditorComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FieldPickerComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TYPE_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => TypeSelectComponent)),
    multi: true
};
class TypeSelectComponent {
    /**
     * @param {?} formlyDesignerConfig
     */
    constructor(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formControl = new FormControl();
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        timer().subscribe((/**
         * @return {?}
         */
        () => {
            this.types = Object.keys(this.formlyDesignerConfig.types);
            if (this.types.length > 0) {
                this.formControl.setValue(this.types[0]);
            }
            this.types.push('fieldGroup');
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.valueChangesSubscription = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            if (this.onChange) {
                this.onChange(value);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.formControl.setValue(obj);
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
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
    }
}
TypeSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-type-select',
                template: `
        <select [formControl]="formControl" class="custom-select">
            <option *ngFor="let type of types" [ngValue]="type">{{ type }}</option>
        </select>
    `,
                providers: [TYPE_SELECT_CONTROL_VALUE_ACCESSOR],
                styles: [`
        select {
            width: 100%;
        }
    `]
            }] }
];
/** @nocollapse */
TypeSelectComponent.ctorParameters = () => [
    { type: FormlyDesignerConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => WrapperEditorComponent)),
    multi: true
};
class WrapperEditorComponent {
    /**
     * @param {?} fieldsService
     * @param {?} formBuilder
     */
    constructor(fieldsService, formBuilder) {
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.subscriptions = [];
        this.fields = [];
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this.fieldForm = formBuilder.group({});
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.fieldForm.statusChanges
            .pipe(switchMap((/**
         * @return {?}
         */
        () => timer())))
            .subscribe((/**
         * @return {?}
         */
        () => this.invalid = this.fieldForm.invalid)));
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
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.wrapper) {
            if (this.valueChangesSubscription) {
                this.valueChangesSubscription.unsubscribe();
            }
            this.fields = this.fieldsService.getWrapperFields(this.wrapper);
            this.fieldForm = this.formBuilder.group({});
            this.field = Object.assign({}, this.field);
            if (this.valueChangesSubscription) {
                this.subscribeValueChanges();
            }
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.valueChangesSubscription.unsubscribe();
        if (!isObject(obj)) {
            obj = {};
        }
        this.fields = this.fieldsService.getWrapperFields(this.wrapper);
        this.fieldForm = this.formBuilder.group({});
        this.field = cloneDeep(obj);
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
            this.fieldForm.disable();
        }
        else {
            this.fieldForm.enable();
        }
    }
    /**
     * @private
     * @return {?}
     */
    subscribeValueChanges() {
        this.valueChangesSubscription = this.fieldForm.valueChanges
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        () => this.updateValue()));
    }
    /**
     * @private
     * @return {?}
     */
    updateValue() {
        if (!this.onChange) {
            return;
        }
        this.onChange(this.field);
    }
}
WrapperEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-wrapper-editor',
                template: `
        <form [formGroup]="fieldForm" novalidate>
            <div class="card">
                <div class="card-body">
                    <formly-form [form]="fieldForm" [fields]="fields" [model]="field">
                    </formly-form>
                    <ng-content></ng-content>
                </div>
            </div>
        </form>
    `,
                providers: [
                    WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR
                ]
            }] }
];
/** @nocollapse */
WrapperEditorComponent.ctorParameters = () => [
    { type: FieldsService },
    { type: FormBuilder }
];
WrapperEditorComponent.propDecorators = {
    wrapper: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => WrapperSelectComponent)),
    multi: true
};
class WrapperSelectComponent {
    /**
     * @param {?} formlyDesignerConfig
     */
    constructor(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formControl = new FormControl();
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        timer().subscribe((/**
         * @return {?}
         */
        () => {
            this.wrappers = Object.keys(this.formlyDesignerConfig.wrappers);
            if (this.wrappers.length > 0) {
                this.formControl.setValue(this.wrappers[0]);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.valueChangesSubscription = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            if (this.onChange) {
                this.onChange(value);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.formControl.setValue(obj);
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
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
    }
}
WrapperSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-wrapper-select',
                template: `
        <select [formControl]="formControl" class="custom-select">
            <option *ngFor="let wrapper of wrappers" [ngValue]="wrapper">{{ wrapper }}</option>
        </select>
    `,
                providers: [WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR],
                styles: [`
        select {
            width: 100%;
        }
    `]
            }] }
];
/** @nocollapse */
WrapperSelectComponent.ctorParameters = () => [
    { type: FormlyDesignerConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WrapperPickerComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WrappersPickerComponent {
    /**
     * @param {?} formlyDesignerConfig
     * @param {?} formlyDesignerService
     */
    constructor(formlyDesignerConfig, formlyDesignerService) {
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
    ngOnChanges(changes) {
        if (changes.field) {
            this.wrappers = this.formlyDesignerService.getWrappers(changes.field.currentValue);
        }
    }
    /**
     * @private
     * @return {?}
     */
    get $modal() {
        return (/** @type {?} */ ($(this.modalRef.nativeElement)));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    onWrapperSelected(field) {
        this.selected.emit(field);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    edit(index) {
        this.wrapper = this.wrappers[index];
        if (isObject(this.field)) {
            /** @type {?} */
            const field = cloneDeep(this.field);
            if (isArray(field.wrappers)) {
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
    }
    /**
     * @param {?} index
     * @return {?}
     */
    remove(index) {
        /** @type {?} */
        const fieldWrappersIndex = this.field.wrappers.indexOf(this.wrappers[index]);
        if (fieldWrappersIndex < 0) {
            return;
        }
        /** @type {?} */
        const field = cloneDeep(this.field);
        field.wrappers.splice(fieldWrappersIndex, 1);
        this.field = this.formlyDesignerService.convertField(field);
        this.selected.emit(this.field);
    }
    /**
     * @return {?}
     */
    onApply() {
        this.field = this.formlyDesignerService.convertField(this.fieldEdit.value);
        this.selected.emit(this.field);
        this.$modal.modal('hide');
    }
}
WrappersPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'formly-designer-wrappers-picker',
                template: `
        <div class="form-group">
            <div class="input-group">
                <formly-designer-wrapper-picker [field]="field" (selected)="onWrapperSelected($event)">
                </formly-designer-wrapper-picker>
            </div>
            <div *ngFor="let wrapper of wrappers; let i = index" class="badge badge-default noselect" (click)="edit(i)">
                {{ wrapper }}&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" (click)="remove(i)"></i>
            </div>
        </div>
        <div #modal class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit {{ wrapper }}</h5>
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
    `,
                styles: [`
        .badge {
            margin-right: .25em;
        }
        .badge {
            cursor: pointer;
        }
        .noselect {
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    `]
            }] }
];
/** @nocollapse */
WrappersPickerComponent.ctorParameters = () => [
    { type: FormlyDesignerConfig },
    { type: FormlyDesignerService }
];
WrappersPickerComponent.propDecorators = {
    modalRef: [{ type: ViewChild, args: ['modal',] }],
    field: [{ type: Input }],
    selected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function decycle(value) {
    if (value == null) {
        return value;
    }
    /** @type {?} */
    let nextId = 1;
    /** @type {?} */
    const objects = new Map();
    return traverse(cloneDeep(value), (/**
     * @param {?} key
     * @param {?} v
     * @return {?}
     */
    (key, v) => {
        if (isObject(v)) {
            if (objects.has(v)) {
                /** @type {?} */
                let id = objects.get(v);
                if (!id) {
                    v.$id = id = nextId++;
                    objects.set(v, id);
                }
                return { $ref: id };
            }
            else {
                objects.set(v, 0);
            }
        }
    }));
}
/**
 * @template T
 * @param {?} obj
 * @param {?} replace
 * @return {?}
 */
function traverse(obj, replace) {
    if (isArray(obj)) {
        for (let i = 0; i < ((/** @type {?} */ (obj))).length; i++) {
            traverseValue.bind(obj, i, obj[i], replace)();
        }
    }
    else if (isObject(obj)) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                traverseValue.bind(obj, key, obj[key], replace)();
            }
        }
    }
    return obj;
}
/**
 * @param {?} key
 * @param {?} value
 * @param {?} replace
 * @return {?}
 */
function traverseValue(key, value, replace) {
    /** @type {?} */
    const replacement = replace(key, value);
    if (replacement === undefined) {
        traverse(value, replace);
    }
    else {
        this[key] = replacement;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DecyclePipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return decycle(value);
    }
}
DecyclePipe.decorators = [
    { type: Pipe, args: [{ name: 'decycle' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormlyDesignerModule {
    /**
     * @param {?} formlyConfig
     */
    constructor(formlyConfig) {
        formlyConfig.addConfig(config);
    }
    /**
     * @param {?=} designerConfig
     * @return {?}
     */
    static forRoot(designerConfig = {}) {
        return {
            ngModule: FormlyDesignerModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [fieldComponents, wrapperComponents], multi: true },
                { provide: FORMLY_DESIGNER_CONFIG_TOKEN, useValue: designerConfig, multi: true }
            ]
        };
    }
}
FormlyDesignerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FieldEditorComponent,
                    FieldPickerComponent,
                    FormlyDesignerComponent,
                    TypeSelectComponent,
                    WrapperEditorComponent,
                    WrapperSelectComponent,
                    WrapperPickerComponent,
                    WrappersPickerComponent,
                    DecyclePipe,
                    fieldComponents,
                    wrapperComponents
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FormlyModule.forChild()
                ],
                exports: [
                    FormlyDesignerComponent
                ],
                providers: [
                    FormlyDesignerConfig,
                    FieldsService
                ],
                entryComponents: [FormlyForm]
            },] }
];
/** @nocollapse */
FormlyDesignerModule.ctorParameters = () => [
    { type: FormlyConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { fieldComponents, wrapperComponents, config, FieldsService, FORMLY_DESIGNER_CONFIG_TOKEN, FormlyDesignerConfig, FormlyDesignerService, FormlyDesignerComponent, FormlyDesignerModule, decycle, FieldEditorComponent as ɵe, FieldPickerComponent as ɵf, TypeSelectComponent as ɵg, WrapperEditorComponent as ɵh, WrapperPickerComponent as ɵj, WrapperSelectComponent as ɵi, WrappersPickerComponent as ɵk, DecyclePipe as ɵl, TemplateDesigner as ɵd, FormlyDesignerWrapperComponent as ɵa, FormlyDesignerFieldWrapperComponent as ɵb, FormlyDesignerFieldGroupWrapperComponent as ɵc };

//# sourceMappingURL=ngx-formly-designer.js.map