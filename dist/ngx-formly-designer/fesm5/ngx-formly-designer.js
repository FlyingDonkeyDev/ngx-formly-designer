import { cloneDeep, get, set, unset } from 'lodash-es';
import { __extends, __values } from 'tslib';
import { CommonModule } from '@angular/common';
import { FieldWrapper, FormlyConfig, FormlyForm, FormlyModule } from '@ngx-formly/core';
import { catchError, tap, debounceTime, switchMap } from 'rxjs/operators';
import { BehaviorSubject, timer, NEVER, merge } from 'rxjs';
import { FormArray, FormGroup, FormControl, FormBuilder, NG_VALUE_ACCESSOR, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, ViewContainerRef, Injectable, Inject, InjectionToken, ChangeDetectorRef, ElementRef, NgZone, EventEmitter, Input, Output, ViewEncapsulation, forwardRef, Pipe, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import 'jquery';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyDesignerWrapperComponent = /** @class */ (function (_super) {
    __extends(FormlyDesignerWrapperComponent, _super);
    function FormlyDesignerWrapperComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormlyDesignerWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-wrapper',
                    template: "\n        <ng-template #fieldComponent></ng-template>\n    "
                }] }
    ];
    FormlyDesignerWrapperComponent.propDecorators = {
        fieldComponent: [{ type: ViewChild, args: ['fieldComponent', { read: ViewContainerRef },] }]
    };
    return FormlyDesignerWrapperComponent;
}(FieldWrapper));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var FORMLY_DESIGNER_CONFIG_TOKEN = new InjectionToken('FORMLY_DESIGNER_CONFIG_TOKEN');
var FormlyDesignerConfig = /** @class */ (function () {
    function FormlyDesignerConfig(configs, formlyConfig) {
        if (configs === void 0) { configs = []; }
        var _this = this;
        this.formlyConfig = formlyConfig;
        this.types = {};
        this.wrappers = {};
        this.settings = { showClassName: true };
        configs.forEach((/**
         * @param {?} config
         * @return {?}
         */
        function (config) { return _this.addConfig(config); }));
    }
    /**
     * @param {?} config
     * @return {?}
     */
    FormlyDesignerConfig.prototype.addConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        if (config.settings) {
            this.setSettings(config.settings);
        }
        if (config.types) {
            this.setType(config.types);
        }
        if (config.wrappers) {
            this.setWrapper(config.wrappers);
        }
    };
    /**
     * @param {?} settings
     * @return {?}
     */
    FormlyDesignerConfig.prototype.setSettings = /**
     * @param {?} settings
     * @return {?}
     */
    function (settings) {
        if (settings.showClassName !== undefined) {
            this.settings.showClassName = !!settings.showClassName;
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FormlyDesignerConfig.prototype.setType = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        if (Array.isArray(options)) {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                _this.setType(option);
            }));
        }
        else {
            // Throw if type isn't part of the formly config
            this.formlyConfig.getType(options.name);
            if (!this.types[options.name]) {
                this.types[options.name] = (/** @type {?} */ ({}));
            }
            /** @type {?} */
            var type = this.types[options.name];
            type.name = options.name;
            type.fieldArray = !!options.fieldArray;
            type.fieldGroup = !!options.fieldGroup;
            type.fields = options.fields;
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FormlyDesignerConfig.prototype.setWrapper = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        if (Array.isArray(options)) {
            options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                _this.setWrapper(option);
            }));
        }
        else {
            // Throw if wrapper isn't part of the formly config
            this.formlyConfig.getWrapper(options.name);
            if (!this.wrappers[options.name]) {
                this.wrappers[options.name] = (/** @type {?} */ ({}));
            }
            /** @type {?} */
            var wrapper = this.wrappers[options.name];
            wrapper.name = options.name;
            wrapper.fields = options.fields;
        }
    };
    FormlyDesignerConfig.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FormlyDesignerConfig.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [FORMLY_DESIGNER_CONFIG_TOKEN,] }] },
        { type: FormlyConfig }
    ]; };
    return FormlyDesignerConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var keyPathMemberName = '_formlyDesignerKeyPath';
// Source: https://github.com/formly-js/ngx-formly/blob/master/src/core/src/lib/utils.ts
/**
 * @param {?} field
 * @return {?}
 */
function getKeyPath(field) {
    var e_1, _a;
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!((/** @type {?} */ (field)))[keyPathMemberName] || ((/** @type {?} */ (field)))[keyPathMemberName].key !== field.key) {
        /** @type {?} */
        var keyPath = [];
        if (field.key) {
            /* Also allow for an array key, hence the type check  */
            /** @type {?} */
            var pathElements = typeof field.key === 'string' ? field.key.split('.') : field.key;
            try {
                for (var pathElements_1 = __values(pathElements), pathElements_1_1 = pathElements_1.next(); !pathElements_1_1.done; pathElements_1_1 = pathElements_1.next()) {
                    var pathElement = pathElements_1_1.value;
                    if (typeof pathElement === 'string') {
                        /* replace paths of the form names[2] by names.2, cfr. angular formly */
                        pathElement = pathElement.replace(/\[(\w+)\]/g, '.$1');
                        keyPath = keyPath.concat(pathElement.split('.'));
                    }
                    else {
                        keyPath.push(pathElement);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (pathElements_1_1 && !pathElements_1_1.done && (_a = pathElements_1.return)) _a.call(pathElements_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            for (var i = 0; i < keyPath.length; i++) {
                /** @type {?} */
                var pathElement = keyPath[i];
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
    var e_2, _a;
    path = path || [];
    try {
        for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
            var field = fields_1_1.value;
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
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
        }
        finally { if (e_2) throw e_2.error; }
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
var isArray = Array.isArray;
// https://stackoverflow.com/a/28953167
/** @type {?} */
var isEmpty = (/**
 * @param {?} val
 * @return {?}
 */
function (val) {
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
        var r = void 0;
        for (var _1 in val)
            r = false;
        return r;
    }
    return false;
});
/** @type {?} */
var isFunction = (/**
 * @param {?} val
 * @return {?}
 */
function (val) { return typeof val === 'function'; });
/** @type {?} */
var isObject = (/**
 * @param {?} val
 * @return {?}
 */
function (val) { return typeof val === 'object' && val != null; });
/** @type {?} */
var isString = (/**
 * @param {?} val
 * @return {?}
 */
function (val) { return typeof val === 'string' || val instanceof String; });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FieldsService = /** @class */ (function () {
    function FieldsService(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
    }
    /**
     * @param {?} field
     * @param {?} fields
     * @return {?}
     */
    FieldsService.prototype.getFullKeyPath = /**
     * @param {?} field
     * @param {?} fields
     * @return {?}
     */
    function (field, fields) {
        /** @type {?} */
        var keyPath = [];
        if (field && field.key) {
            /** @type {?} */
            var parents_1 = new Map();
            traverseFields(fields, (/**
             * @param {?} f
             * @param {?} path
             * @param {?} parent
             * @return {?}
             */
            function (f, path, parent) {
                parents_1.set(f, parent);
            }));
            keyPath = getKeyPath(field);
            /** @type {?} */
            var cur = parents_1.get(field);
            while (cur) {
                keyPath = getKeyPath(cur).concat(keyPath);
                cur = parents_1.get(cur);
            }
        }
        return keyPath;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    FieldsService.prototype.getTypeFields = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.getFields(type, 'type');
    };
    /**
     * @param {?} wrapper
     * @return {?}
     */
    FieldsService.prototype.getWrapperFields = /**
     * @param {?} wrapper
     * @return {?}
     */
    function (wrapper) {
        return this.getFields(wrapper, 'wrapper');
    };
    /** Check the field for control type conflict */
    /**
     * Check the field for control type conflict
     * @param {?} field
     * @param {?} fields
     * @param {?=} parent
     * @return {?}
     */
    FieldsService.prototype.checkField = /**
     * Check the field for control type conflict
     * @param {?} field
     * @param {?} fields
     * @param {?=} parent
     * @return {?}
     */
    function (field, fields, parent) {
        /** @type {?} */
        var fullPathByField = new Map();
        /** @type {?} */
        var newPath = this.getFullKeyPath(parent || {}, fields).concat(getKeyPath(field));
        /** @type {?} */
        var length = newPath.length;
        return !traverseFields(fields, (/**
         * @param {?} f
         * @param {?} p
         * @return {?}
         */
        function (f, p) {
            /** @type {?} */
            var path = fullPathByField.get(f) || fullPathByField.set(f, (p || []).concat(getKeyPath(f))).get(f);
            if (path.length !== length) {
                return;
            }
            for (var i = 0; i < length; i++) {
                if (path[i] !== newPath[i]) {
                    return;
                }
            }
            return !equalType(field, f);
        }));
    };
    /**
     * @param {?} field
     * @param {?} designerField
     * @return {?}
     */
    FieldsService.prototype.mutateField = /**
     * @param {?} field
     * @param {?} designerField
     * @return {?}
     */
    function (field, designerField) {
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
    };
    /**
     * @param {?} fields
     * @param {?} designerFields
     * @return {?}
     */
    FieldsService.prototype.mutateFields = /**
     * @param {?} fields
     * @param {?} designerFields
     * @return {?}
     */
    function (fields, designerFields) {
        var _this = this;
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) { return _this.mutateField(field, designerFields); }));
    };
    /**
     * @private
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    FieldsService.prototype.getFields = /**
     * @private
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    function (name, type) {
        /** @type {?} */
        var designerOption = (/** @type {?} */ ((name ? this.getDesignerOptions(type)[name] || {} : {})));
        /** @type {?} */
        var fields = cloneDeep(designerOption.fields || []);
        this.mutateFields(fields, true);
        return fields;
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    FieldsService.prototype.getDesignerOptions = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === 'type') {
            return this.formlyDesignerConfig.types;
        }
        if (type === 'wrapper') {
            return this.formlyDesignerConfig.wrappers;
        }
        return {};
    };
    FieldsService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FieldsService.ctorParameters = function () { return [
        { type: FormlyDesignerConfig }
    ]; };
    return FieldsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyDesignerService = /** @class */ (function () {
    function FormlyDesignerService(designerConfig, fieldsService, formlyConfig) {
        this.designerConfig = designerConfig;
        this.fieldsService = fieldsService;
        this.formlyConfig = formlyConfig;
        this._disabled = new BehaviorSubject(false);
        this._fields = new BehaviorSubject([]);
        this._model = new BehaviorSubject({});
    }
    Object.defineProperty(FormlyDesignerService.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled.next(!!value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyDesignerService.prototype, "disabled$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyDesignerService.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () {
            return this._fields.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // Prune the fields because ngx-formly pollutes them with internal state
            // causing incorrect behavior when re-applied.
            /** @type {?} */
            var fields = this.createPrunedFields(isArray(value) ? value : []);
            this._fields.next(fields);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyDesignerService.prototype, "fields$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._fields.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyDesignerService.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () {
            return this._model.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._model.next(value == null ? {} : value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormlyDesignerService.prototype, "model$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._model.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerService.prototype.addField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.fieldsService.mutateField(field, false);
        /** @type {?} */
        var fields = cloneDeep(this.fields);
        fields.push(field);
        this.fields = fields;
        this.model = cloneDeep(this.model);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerService.prototype.removeField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.unsetField(field);
        if (this.replaceField(this.fields, field, undefined)) {
            this.removeControl(field.formControl);
        }
        this.fields = cloneDeep(this.fields);
        this.model = cloneDeep(this.model);
    };
    /**
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    FormlyDesignerService.prototype.updateField = /**
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    function (original, modified) {
        /** @type {?} */
        var pruned = this.fieldsService.mutateField(this.createPrunedField(modified), false);
        if (this.replaceField(this.fields, original, pruned)) {
            if (original.formControl !== pruned.formControl) {
                this.unsetField(original);
                this.removeControl(original.formControl);
            }
            this.fields = cloneDeep(this.fields);
            this.model = cloneDeep(this.model);
        }
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerService.prototype.convertField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return this.createPrunedField(field);
    };
    /**
     * @param {?} fields
     * @return {?}
     */
    FormlyDesignerService.prototype.convertFields = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        return this.createPrunedFields(fields);
    };
    /**
     * @return {?}
     */
    FormlyDesignerService.prototype.createDesignerFields = /**
     * @return {?}
     */
    function () {
        return this.createPrunedFields(this.fields);
    };
    /**
     * @private
     * @param {?} fields
     * @return {?}
     */
    FormlyDesignerService.prototype.createPrunedFields = /**
     * @private
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        var _this = this;
        /** @type {?} */
        var prunedFields = [];
        if (isArray(fields)) {
            fields.forEach((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                /** @type {?} */
                var pruned = _this.createPrunedField(field);
                if (field.fieldArray) {
                    pruned.fieldArray = _this.createPrunedField(field.fieldArray);
                }
                else if (field.fieldGroup && !pruned.fieldArray) {
                    pruned.fieldGroup = _this.createPrunedFields(field.fieldGroup);
                }
                if (Object.keys(pruned).length > 0) {
                    prunedFields.push(pruned);
                }
            }));
        }
        return prunedFields;
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerService.prototype.getWrappers = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (!field || !isArray(field.wrappers)) {
            return [];
        }
        /** @type {?} */
        var clonedField = cloneDeep(field);
        /** @type {?} */
        var wrappers = clonedField.wrappers = (clonedField.wrappers || []);
        if (isFunction(this.designerConfig.settings.filterWrapper)) {
            wrappers = wrappers.filter((/**
             * @param {?} w
             * @return {?}
             */
            function (w) { return _this.designerConfig.settings.filterWrapper(w, clonedField); }));
        }
        // Determine wrappers part of the formly configuration (static and dynamic) to exclude them from the result
        /** @type {?} */
        var staticWrappers = field.type ? this.formlyConfig.getType(field.type).wrappers || [] : [];
        /** @type {?} */
        var typeWrappers = staticWrappers
            .concat(this.formlyConfig.templateManipulators.preWrapper.map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m(clonedField); })))
            .concat(this.formlyConfig.templateManipulators.postWrapper.map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m(clonedField); })))
            .filter((/**
         * @param {?} w
         * @return {?}
         */
        function (w) { return w; }));
        // Remove wrappers part of the formly configuration from the result
        if (typeWrappers.length > 0) {
            for (var i = wrappers.length - 1; i >= 0; i--) {
                for (var j = typeWrappers.length - 1; j >= 0; j--) {
                    if (wrappers[i] === typeWrappers[j]) {
                        typeWrappers.splice(j, 1);
                        wrappers.splice(i, 1);
                        break;
                    }
                }
            }
        }
        return wrappers;
    };
    /** Prunes the field of paths not identified in the designer config */
    /**
     * Prunes the field of paths not identified in the designer config
     * @private
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerService.prototype.createPrunedField = /**
     * Prunes the field of paths not identified in the designer config
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        /** @type {?} */
        var type = get(field, 'templateOptions.$fieldArray.type', field.type);
        /** @type {?} */
        var designerType = this.designerConfig.types[type];
        /** @type {?} */
        var pruned = isEmpty(field.key) ? {} : { key: field.key };
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
            var fieldGroupClassName = void 0;
            if (isString(field.fieldGroupClassName) && (fieldGroupClassName = field.fieldGroupClassName.trim()).length > 0) {
                pruned.fieldGroupClassName = fieldGroupClassName;
            }
        }
        /** @type {?} */
        var className;
        if (isString(field.className) && (className = field.className.trim()).length > 0) {
            pruned.className = className;
        }
        /** @type {?} */
        var wrappers = this.getWrappers(field);
        if (wrappers.length > 0) {
            pruned.wrappers = wrappers;
            /** @type {?} */
            var designerWrapperFields = wrappers.map((/**
             * @param {?} wrapper
             * @return {?}
             */
            function (wrapper) { return _this.designerConfig.wrappers[wrapper]; }))
                .filter((/**
             * @param {?} designerOption
             * @return {?}
             */
            function (designerOption) { return designerOption && isArray(designerOption.fields); }))
                .reduce((/**
             * @param {?} previous
             * @param {?} current
             * @return {?}
             */
            function (previous, current) { return previous.concat(current.fields); }), []);
            this.applyProperties(field, pruned, designerWrapperFields);
        }
        return pruned;
    };
    /**
     * @private
     * @param {?} field
     * @param {?} designed
     * @param {?} designerFields
     * @return {?}
     */
    FormlyDesignerService.prototype.applyProperties = /**
     * @private
     * @param {?} field
     * @param {?} designed
     * @param {?} designerFields
     * @return {?}
     */
    function (field, designed, designerFields) {
        if (isArray(designerFields)) {
            designerFields.forEach((/**
             * @param {?} designerField
             * @return {?}
             */
            function (designerField) {
                /** @type {?} */
                var value = get(field, designerField.key);
                if (value != null && (!isString(value) || value.length > 0) && value !== designerField.defaultValue) {
                    set(designed, designerField.key, value);
                }
            }));
        }
    };
    /**
     * @private
     * @param {?} fields
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    FormlyDesignerService.prototype.replaceField = /**
     * @private
     * @param {?} fields
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    function (fields, original, modified) {
        if (isArray(fields)) {
            /** @type {?} */
            var l = fields.length;
            for (var i = 0; i < l; i++) {
                /** @type {?} */
                var field = fields[i];
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
    };
    /**
     * @private
     * @param {?} parent
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    FormlyDesignerService.prototype.replaceFieldArray = /**
     * @private
     * @param {?} parent
     * @param {?} original
     * @param {?} modified
     * @return {?}
     */
    function (parent, original, modified) {
        /** @type {?} */
        var fieldArray = parent.fieldArray;
        if (fieldArray === original) {
            parent.fieldArray = modified;
            return true;
        }
        if (fieldArray.fieldGroup && this.replaceField(fieldArray.fieldGroup, original, modified)) {
            return true;
        }
        return fieldArray.fieldArray && this.replaceFieldArray(fieldArray, original, modified);
    };
    /**
     * @private
     * @param {?} key
     * @param {?} path
     * @param {?=} arrayNext
     * @return {?}
     */
    FormlyDesignerService.prototype.buildPath = /**
     * @private
     * @param {?} key
     * @param {?} path
     * @param {?=} arrayNext
     * @return {?}
     */
    function (key, path, arrayNext) {
        if (arrayNext === void 0) { arrayNext = false; }
        return path ? key + (arrayNext ? path : '.' + path) : key;
    };
    /**
     * @private
     * @param {?} control
     * @param {?=} includeSelf
     * @return {?}
     */
    FormlyDesignerService.prototype.path = /**
     * @private
     * @param {?} control
     * @param {?=} includeSelf
     * @return {?}
     */
    function (control, includeSelf) {
        if (includeSelf === void 0) { includeSelf = true; }
        /** @type {?} */
        var path = '';
        /** @type {?} */
        var arrayNext = false;
        if (!includeSelf) {
            control = (control || (/** @type {?} */ ({}))).parent;
        }
        for (var child = control, parent_1 = (control || (/** @type {?} */ ({}))).parent; !!parent_1; child = parent_1, parent_1 = parent_1.parent) {
            if (parent_1 instanceof FormGroup) {
                for (var key in parent_1.controls) {
                    if (parent_1.controls[key] === child) {
                        path = this.buildPath(key, path, arrayNext);
                        arrayNext = false;
                        break;
                    }
                }
            }
            else if (parent_1 instanceof FormArray) {
                for (var i = 0; i < parent_1.length; i++) {
                    if (parent_1.at(i) === child) {
                        path = this.buildPath('[' + i + ']', path, arrayNext);
                        arrayNext = true;
                        break;
                    }
                }
            }
        }
        return path;
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerService.prototype.unsetField = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (field) {
            if (field.fieldArray) {
                this.unsetField(field.fieldArray);
            }
            if (field.fieldGroup) {
                field.fieldGroup.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return _this.unsetField(f); }));
            }
            if (field.formControl) {
                /** @type {?} */
                var path = this.path(field.formControl);
                unset(this.model, path);
            }
        }
    };
    /**
     * @private
     * @param {?} control
     * @return {?}
     */
    FormlyDesignerService.prototype.removeControl = /**
     * @private
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
        var parent = control ? control.parent : undefined;
        if (parent instanceof FormGroup) {
            for (var key in parent.controls) {
                if (parent.controls[key] === control) {
                    parent.removeControl(key);
                    return;
                }
            }
        }
        else if (parent instanceof FormArray) {
            for (var i = 0; i < parent.length; i++) {
                if (parent.at(i) === control) {
                    parent.removeAt(i);
                    return;
                }
            }
        }
    };
    FormlyDesignerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FormlyDesignerService.ctorParameters = function () { return [
        { type: FormlyDesignerConfig },
        { type: FieldsService },
        { type: FormlyConfig }
    ]; };
    return FormlyDesignerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyDesignerFieldWrapperComponent = /** @class */ (function (_super) {
    __extends(FormlyDesignerFieldWrapperComponent, _super);
    function FormlyDesignerFieldWrapperComponent(changeDetector, designerConfig, elementRef, fieldsService, formlyDesignerService, zone) {
        var _this = _super.call(this) || this;
        _this.changeDetector = changeDetector;
        _this.designerConfig = designerConfig;
        _this.elementRef = elementRef;
        _this.fieldsService = fieldsService;
        _this.formlyDesignerService = formlyDesignerService;
        _this.zone = zone;
        _this.editing = false;
        _this.fieldEdit = new FormControl({});
        _this.fieldWrappers = [];
        _this.wrappers = [];
        return _this;
    }
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.type = this.field.type;
        this.wrappers = Object.getOwnPropertyNames(this.designerConfig.wrappers);
        this.fieldWrappers = this.formlyDesignerService.getWrappers(this.formlyDesignerService.convertField(this.field)) || [];
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return setTimeout((/**
         * @return {?}
         */
        function () { return _this.checkDesigner(); })); }));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return setTimeout((/**
         * @return {?}
         */
        function () { return _this.checkDesigner(); })); }));
    };
    Object.defineProperty(FormlyDesignerFieldWrapperComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.formlyDesignerService.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} wrapper
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.addWrapper = /**
     * @param {?} wrapper
     * @return {?}
     */
    function (wrapper) {
        /** @type {?} */
        var field = cloneDeep(this.field);
        if (field.wrappers) {
            field.wrappers.push(wrapper);
        }
        else {
            field.wrappers = [wrapper];
        }
        this.formlyDesignerService.updateField(this.field, field);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.removeWrapper = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var field = cloneDeep(this.field);
        this.fieldWrappers.splice(index, 1);
        field.wrappers = this.fieldWrappers;
        this.formlyDesignerService.updateField(this.field, field);
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.edit = /**
     * @return {?}
     */
    function () {
        this.editing = true;
        this.formlyDesignerService.disabled = true;
        this.fieldEdit.setValue(this.formlyDesignerService.convertField(cloneDeep(this.field)));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.remove = /**
     * @return {?}
     */
    function () {
        this.formlyDesignerService.removeField(this.field);
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.accept = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.fieldsService.checkField(this.fieldEdit.value, this.formlyDesignerService.fields)) {
            return;
        }
        timer().subscribe((/**
         * @return {?}
         */
        function () {
            _this.formlyDesignerService.updateField(_this.field, _this.fieldEdit.value);
            _this.formlyDesignerService.disabled = false;
            _this.editing = false;
        }));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.formlyDesignerService.disabled = false;
        this.editing = false;
    };
    /**
     * @private
     * @return {?}
     */
    FormlyDesignerFieldWrapperComponent.prototype.checkDesigner = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = (/** @type {?} */ (this.elementRef.nativeElement));
        if (element.parentNode == null) {
            return;
        }
        /** @type {?} */
        var designerEmpty = element.querySelector('formly-designer-wrapper') == null;
        if (designerEmpty !== element.classList.contains('designerEmpty')) {
            this.changeDetector.detectChanges();
            if (designerEmpty) {
                element.classList.add('designerEmpty');
            }
            else {
                element.classList.remove('designerEmpty');
            }
        }
    };
    FormlyDesignerFieldWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-field-wrapper',
                    template: "\n        <div *ngIf=\"!editing\" class=\"bg-info text-white control-panel\">\n            <span class=\"type\">{{ type }}</span>\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn\" data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\" aria-expanded=\"false\" title=\"wrappers\">\n                    <i class=\"fa fa-clone\" aria-hidden=\"true\"></i>\n                </button>\n                <div class=\"dropdown-menu dropdown-menu-right\">\n                    <button class=\"dropdown-item\" type=\"button\" [disabled]=\"disabled\" title=\"add wrapper\"\n                        *ngFor=\"let wrapper of wrappers\" (click)=\"addWrapper(wrapper)\">\n                        {{ wrapper }}\n                    </button>\n                    <ng-container *ngIf=\"fieldWrappers.length\">\n                        <div *ngIf=\"wrappers.length\" class=\"dropdown-divider\"></div>\n                        <button class=\"dropdown-item\" type=\"button\" [disabled]=\"disabled\"\n                            *ngFor=\"let wrapper of fieldWrappers; let i=index\" (click)=\"removeWrapper(i)\">\n                            {{ wrapper }}&nbsp;&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\" title=\"remove wrapper\"></i>\n                        </button>\n                    </ng-container>\n                </div>\n            </div>\n            <button class=\"btn\" type=\"button\" [disabled]=\"disabled\" (click)=\"edit()\">\n                <i class=\"fa fa-pencil\" aria-hidden=\"true\" title=\"edit\"></i>\n            </button>\n            <button class=\"btn\" type=\"button\" [disabled]=\"disabled\" (click)=\"remove()\">\n                <i class=\"fa fa-times\" aria-hidden=\"true\" title=\"remove\"></i>\n            </button>\n        </div>\n        <div class=\"content\">\n            <div class=\"editor\" [hidden]=\"!editing\">\n                <formly-designer-field-editor #editor [hasContent]=\"true\" [showType]=\"true\" [showWrappers]=\"true\" [formControl]=\"fieldEdit\">\n                    <div class=\"footer\">\n                        <button (click)=\"cancel()\" class=\"btn btn-secondary mr-1\">Cancel</button>\n                        <button [disabled]=\"editor.invalid\" (click)=\"accept()\" class=\"btn btn-primary\">Apply</button>\n                    </div>\n                </formly-designer-field-editor>\n            </div>\n            <div [hidden]=\"editing\">\n                <ng-template #fieldComponent></ng-template>\n            </div>\n        </div>\n    ",
                    styles: ["\n        :host {\n            display: flex;\n            position: relative;\n            justify-content: flex-start;\n            align-content: flex-start;\n            align-items: flex-start;\n            margin: .25em;\n        }\n        :host.designerEmpty {\n            display:none;\n        }\n        .btn:not(:disabled), .dropdown-item:not(:disabled) {\n            cursor: pointer;\n        }\n        .control-panel {\n            font-size: .8em;\n            position: absolute;\n            padding: 0 0 0 .5em;\n            border-radius: 0 5px 0 0;\n            right: 0;\n            top: 0;\n        }\n        .control-panel > * {\n            padding-right: .5em;\n        }\n        .control-panel .btn {\n            font-size: unset;\n            background-color: unset;\n            padding: 0 .5em 0 0;\n            color: #fff;\n        }\n        .content {\n            border: 1px dashed #000;\n            border-radius: 5px;\n            min-height: 2em;\n            padding: 1.5em 1em 0 1em;\n            width: 100%;\n        }\n        .content:first-child {\n            padding-top: 0;\n        }\n        .editor {\n            margin: 1em 0;\n        }\n        .footer {\n            display: flex;\n            justify-content: flex-end;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    FormlyDesignerFieldWrapperComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FormlyDesignerConfig },
        { type: ElementRef },
        { type: FieldsService },
        { type: FormlyDesignerService },
        { type: NgZone }
    ]; };
    FormlyDesignerFieldWrapperComponent.propDecorators = {
        fieldComponent: [{ type: ViewChild, args: ['fieldComponent', { read: ViewContainerRef },] }]
    };
    return FormlyDesignerFieldWrapperComponent;
}(FieldWrapper));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyDesignerFieldGroupWrapperComponent = /** @class */ (function (_super) {
    __extends(FormlyDesignerFieldGroupWrapperComponent, _super);
    function FormlyDesignerFieldGroupWrapperComponent(changeDetector, designerConfig, elementRef, fieldsService, formlyDesignerService, zone) {
        var _this = _super.call(this) || this;
        _this.changeDetector = changeDetector;
        _this.designerConfig = designerConfig;
        _this.elementRef = elementRef;
        _this.fieldsService = fieldsService;
        _this.formlyDesignerService = formlyDesignerService;
        _this.zone = zone;
        _this.editing = false;
        _this.fieldEdit = new FormControl({});
        _this.fieldWrappers = [];
        _this.wrappers = [];
        return _this;
    }
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return setTimeout((/**
         * @return {?}
         */
        function () { return _this.checkDesigner(); })); }));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return setTimeout((/**
         * @return {?}
         */
        function () { return _this.checkDesigner(); })); }));
    };
    Object.defineProperty(FormlyDesignerFieldGroupWrapperComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.formlyDesignerService.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} wrapper
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.addWrapper = /**
     * @param {?} wrapper
     * @return {?}
     */
    function (wrapper) {
        /** @type {?} */
        var field = cloneDeep(this.field);
        if (field.wrappers) {
            field.wrappers.push(wrapper);
        }
        else {
            field.wrappers = [wrapper];
        }
        this.formlyDesignerService.updateField(this.field, field);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.removeWrapper = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var field = cloneDeep(this.field);
        this.fieldWrappers.splice(index, 1);
        field.wrappers = this.fieldWrappers;
        this.formlyDesignerService.updateField(this.field, field);
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.edit = /**
     * @return {?}
     */
    function () {
        this.editing = true;
        this.formlyDesignerService.disabled = true;
        this.fieldEdit.setValue(this.formlyDesignerService.convertField(cloneDeep(this.field)));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.remove = /**
     * @return {?}
     */
    function () {
        this.formlyDesignerService.removeField(this.field);
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.accept = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.fieldsService.checkField(this.fieldEdit.value, this.formlyDesignerService.fields)) {
            return;
        }
        timer().subscribe((/**
         * @return {?}
         */
        function () {
            _this.formlyDesignerService.updateField(_this.field, _this.fieldEdit.value);
            _this.formlyDesignerService.disabled = false;
            _this.editing = false;
        }));
    };
    /**
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.formlyDesignerService.disabled = false;
        this.editing = false;
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.onFieldSelected = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        if (isArray(this.field.fieldGroup) &&
            !this.fieldsService.checkField(field, this.formlyDesignerService.fields, this.field)) {
            return;
        }
        /** @type {?} */
        var updatedField = cloneDeep(this.field);
        updatedField.fieldGroup = isArray(updatedField.fieldGroup) ? updatedField.fieldGroup.slice() : [];
        updatedField.fieldGroup.push(field);
        timer()
            .pipe(tap((/**
         * @return {?}
         */
        function () { return _this.formlyDesignerService.updateField(_this.field, updatedField); })), catchError((/**
         * @return {?}
         */
        function () { return NEVER; })))
            .subscribe();
    };
    /**
     * @private
     * @return {?}
     */
    FormlyDesignerFieldGroupWrapperComponent.prototype.checkDesigner = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = (/** @type {?} */ (this.elementRef.nativeElement));
        if (element.parentNode == null) {
            return;
        }
        /** @type {?} */
        var designerEmpty = element.querySelector('formly-designer-wrapper') == null;
        if (designerEmpty !== element.classList.contains('designerEmpty')) {
            this.changeDetector.detectChanges();
            if (designerEmpty) {
                element.classList.add('designerEmpty');
            }
            else {
                element.classList.remove('designerEmpty');
            }
        }
    };
    FormlyDesignerFieldGroupWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-field-group-wrapper',
                    template: "\n        <div *ngIf=\"!editing\" class=\"bg-info text-white control-panel\">\n            <span class=\"type\">{{ type }}</span>\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn\" data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\" aria-expanded=\"false\" title=\"wrappers\">\n                    <i class=\"fa fa-clone\" aria-hidden=\"true\"></i>\n                </button>\n                <div class=\"dropdown-menu dropdown-menu-right\">\n                    <button class=\"dropdown-item\" type=\"button\" [disabled]=\"disabled\" title=\"add wrapper\"\n                        *ngFor=\"let wrapper of wrappers\" (click)=\"addWrapper(wrapper)\">\n                        {{ wrapper }}\n                    </button>\n                    <ng-container *ngIf=\"fieldWrappers.length\">\n                        <div *ngIf=\"wrappers.length\" class=\"dropdown-divider\"></div>\n                        <button class=\"dropdown-item\" type=\"button\" [disabled]=\"disabled\"\n                            *ngFor=\"let wrapper of fieldWrappers; let i=index\" (click)=\"removeWrapper(i)\">\n                            {{ wrapper }}&nbsp;&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\" title=\"remove wrapper\"></i>\n                        </button>\n                    </ng-container>\n                </div>\n            </div>\n            <button [disabled]=\"disabled\" type=\"button\" class=\"btn\" (click)=\"edit()\">\n                <i class=\"fa fa-pencil\" aria-hidden=\"true\" title=\"edit\"></i>\n            </button>\n            <button [disabled]=\"disabled\" type=\"button\" class=\"btn\" (click)=\"remove()\">\n                <i class=\"fa fa-times\" aria-hidden=\"true\" title=\"remove\"></i>\n            </button>\n        </div>\n        <div class=\"content\">\n            <div [hidden]=\"!editing\">\n                <formly-designer-field-editor #editor [fieldGroup]=\"true\" [hasContent]=\"true\" [showWrappers]=\"true\"\n                    [formControl]=\"fieldEdit\">\n                    <div class=\"footer\">\n                        <button (click)=\"cancel()\" class=\"btn btn-secondary mr-1\">Cancel</button>\n                        <button [disabled]=\"editor.invalid\" (click)=\"accept()\" class=\"btn btn-primary\">Apply</button>\n                    </div>\n                </formly-designer-field-editor>\n            </div>\n            <div [hidden]=\"editing\">\n                <div class=\"form-group\">\n                    <label>child</label>\n                    <formly-designer-field-picker (selected)=\"onFieldSelected($event)\"></formly-designer-field-picker>\n                </div>\n                <ng-template #fieldComponent></ng-template>\n            </div>\n        </div>\n    ",
                    styles: ["\n        :host {\n            display: flex;\n            position: relative;\n            justify-content: flex-start;\n            align-content: flex-start;\n            align-items: flex-start;\n            margin: .25em;\n        }\n        :host.designerEmpty {\n            display:none;\n        }\n        .btn:not(:disabled), .dropdown-item:not(:disabled) {\n            cursor: pointer;\n        }\n        .control-panel {\n            font-size: .8em;\n            position: absolute;\n            padding: 0 0 0 .5em;\n            border-radius: 0 5px 0 0;\n            right: 0;\n            top: 0;\n        }\n        .control-panel > * {\n            padding-right: .5em;\n        }\n        .control-panel .btn {\n            font-size: unset;\n            background-color: unset;\n            padding: 0 .5em 0 0;\n            color: #fff;\n        }\n        .content {\n            border: 1px dashed #000;\n            border-radius: 5px;\n            padding: 1em;\n            width: 100%;\n        }\n        .footer {\n            display: flex;\n            justify-content: flex-end;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    FormlyDesignerFieldGroupWrapperComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FormlyDesignerConfig },
        { type: ElementRef },
        { type: FieldsService },
        { type: FormlyDesignerService },
        { type: NgZone }
    ]; };
    FormlyDesignerFieldGroupWrapperComponent.propDecorators = {
        fieldComponent: [{ type: ViewChild, args: ['fieldComponent', { read: ViewContainerRef },] }]
    };
    return FormlyDesignerFieldGroupWrapperComponent;
}(FieldWrapper));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TemplateDesigner = /** @class */ (function () {
    function TemplateDesigner() {
    }
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    TemplateDesigner.prototype.isNonDesignerField = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return field && (!field.templateOptions || field.templateOptions['$designerField'] !== true);
    };
    /**
     * @param {?} fc
     * @return {?}
     */
    TemplateDesigner.prototype.run = /**
     * @param {?} fc
     * @return {?}
     */
    function (fc) {
        var _this = this;
        fc.templateManipulators.preWrapper.push((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            if (_this.isNonDesignerField(field)) {
                return field.fieldGroup ? 'fieldGroupDesigner' : 'fieldDesigner';
            }
        }));
        fc.templateManipulators.postWrapper.push((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            if (_this.isNonDesignerField(field)) {
                return 'designer';
            }
        }));
    };
    return TemplateDesigner;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var fieldComponents = [];
/** @type {?} */
var wrapperComponents = [
    FormlyDesignerWrapperComponent,
    FormlyDesignerFieldWrapperComponent,
    FormlyDesignerFieldGroupWrapperComponent
];
/** @type {?} */
var config = {
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var FIELD_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return FieldEditorComponent; })),
    multi: true
};
var FieldEditorComponent = /** @class */ (function () {
    function FieldEditorComponent(fieldsService, fb, formlyDesignerConfig) {
        var _this = this;
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
        function (_) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        this.form = fb.group({
            key: this.key = fb.control(''),
            className: this.className = fb.control(''),
            fieldGroupClassName: this.fieldGroupClassName = fb.control(''),
            type: this.type = fb.control('')
        }, { validator: (/**
             * @param {?} control
             * @return {?}
             */
            function (control) { return _this.validator(control); }) });
        this.fieldForm = fb.group({});
    }
    /**
     * @return {?}
     */
    FieldEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.type.valueChanges
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.onTypeChange(); })));
        this.subscriptions.push(this.form.statusChanges
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.invalid = _this.form.invalid; })));
        this.subscribeValueChanges();
    };
    /**
     * @return {?}
     */
    FieldEditorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
        this.subscriptions.splice(0).forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        function (subscription) { return subscription.unsubscribe(); }));
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    FieldEditorComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        this.valueChangesSubscription.unsubscribe();
        this.updateField(obj);
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.subscribeValueChanges();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FieldEditorComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FieldEditorComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    FieldEditorComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    };
    /**
     * @private
     * @return {?}
     */
    FieldEditorComponent.prototype.subscribeValueChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.valueChangesSubscription = merge(this.fieldForm.valueChanges, this.form.valueChanges)
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.updateValue(); }));
    };
    /**
     * @private
     * @param {?} field
     * @return {?}
     */
    FieldEditorComponent.prototype.updateField = /**
     * @private
     * @param {?} field
     * @return {?}
     */
    function (field) {
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
    };
    /**
     * @private
     * @return {?}
     */
    FieldEditorComponent.prototype.updateValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.onChange) {
            return;
        }
        /** @type {?} */
        var field = this.field;
        field.key = this.key.value;
        field.className = this.className.value;
        field.fieldGroupClassName = this.fieldGroupClassName.value;
        field.type = this.type.value;
        this.onChange(field);
    };
    /**
     * @private
     * @return {?}
     */
    FieldEditorComponent.prototype.onTypeChange = /**
     * @private
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
        /** @type {?} */
        var type = this.type.value;
        this.fields = this.fieldsService.getTypeFields(type);
        /** @type {?} */
        var designerType = this.formlyDesignerConfig.types[type];
        this.fieldArray = designerType && designerType.fieldArray;
        this.fieldForm = this.fb.group({});
        this.field = Object.assign({}, this.field);
        this.subscribeValueChanges();
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FieldEditorComponent.prototype.onWrappersSelected = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        this.updateField(field);
    };
    /**
     * @private
     * @param {?} control
     * @return {?}
     */
    FieldEditorComponent.prototype.validator = /**
     * @private
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
        var type = (/** @type {?} */ (control.get('type')));
        /** @type {?} */
        var hasType = isString(type.value) && type.value.trim().length > 0;
        /** @type {?} */
        var key = (/** @type {?} */ (control.get('key')));
        /** @type {?} */
        var result = { key: false, type: this.showType && !hasType, conflict: false };
        if (hasType && (!isString(key.value) || key.value.trim().length === 0)) {
            result.key = true;
        }
        return result.key || result.type ? result : null;
    };
    FieldEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-field-editor',
                    template: "\n        <form [formGroup]=\"form\" novalidate>\n            <div class=\"card\">\n                <div class=\"card-header\" [ngClass]=\"{solo: !hasContent && fields.length === 0}\">\n                    <div class=\"form-group\" [ngClass]=\"{'has-danger': form.hasError('key') && (key.dirty || key.touched)}\">\n                        <label class=\"form-control-label\">key</label>\n                        <input formControlName=\"key\" class=\"form-control\">\n                        <div *ngIf=\"form.hasError('key') && (key.dirty || key.touched)\" class=\"form-control-feedback\">\n                            key required.\n                        </div>\n                    </div>\n                    <div *ngIf=\"formlyDesignerConfig.settings.showClassName\" class=\"form-group\">\n                        <label class=\"form-control-label\">className</label>\n                        <input formControlName=\"className\" class=\"form-control\">\n                    </div>\n                    <div *ngIf=\"fieldGroup && formlyDesignerConfig.settings.showClassName\" class=\"form-group\">\n                        <label class=\"form-control-label\">fieldGroupClassName</label>\n                        <input formControlName=\"fieldGroupClassName\" class=\"form-control\">\n                    </div>\n                    <div *ngIf=\"showType\" class=\"form-group\"\n                        [ngClass]=\"{'has-danger': form.hasError('type') && (type.dirty || type.touched)}\">\n                        <label class=\"form-control-label\">type</label>\n                        <formly-designer-type-select formControlName=\"type\"></formly-designer-type-select>\n                        <div *ngIf=\"form.hasError('type') && (type.dirty || type.touched)\" class=\"form-control-feedback\">\n                            type required.\n                        </div>\n                    </div>\n                    <div *ngIf=\"showWrappers\" class=\"form-group\">\n                        <label class=\"form-control-label\">wrappers</label>\n                        <formly-designer-wrappers-picker [field]=\"field\"\n                            (selected)=\"onWrappersSelected($event)\">\n                        </formly-designer-wrappers-picker>\n                    </div>\n                </div>\n                <div #block class=\"card-body\">\n                    <formly-form *ngIf=\"fields.length > 0\" [form]=\"fieldForm\" [fields]=\"fields\" [model]=\"field\">\n                    </formly-form>\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </form>\n    ",
                    providers: [
                        FIELD_EDITOR_CONTROL_VALUE_ACCESSOR
                    ],
                    styles: ["\n        .card-header.solo {\n            border-bottom: 0;\n        }\n        .card-header.solo + .card-body {\n            display: none;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    FieldEditorComponent.ctorParameters = function () { return [
        { type: FieldsService },
        { type: FormBuilder },
        { type: FormlyDesignerConfig }
    ]; };
    FieldEditorComponent.propDecorators = {
        fieldGroup: [{ type: Input }],
        showType: [{ type: Input }],
        showWrappers: [{ type: Input }],
        hasContent: [{ type: Input }],
        blockElRef: [{ type: ViewChild, args: ['block',] }]
    };
    return FieldEditorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FieldPickerComponent = /** @class */ (function () {
    function FieldPickerComponent(fb, formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
        this.form = fb.group({
            type: this.type = fb.control('', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)]))
        });
    }
    Object.defineProperty(FieldPickerComponent.prototype, "$modal", {
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
     * @return {?}
     */
    FieldPickerComponent.prototype.add = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var type = this.type.value;
        /** @type {?} */
        var field = (/** @type {?} */ ({}));
        if (type !== 'fieldGroup') {
            field.type = type;
        }
        /** @type {?} */
        var designerType = this.formlyDesignerConfig.types[type] || (/** @type {?} */ ({}));
        if (designerType.fieldArray) {
            field.fieldArray = { fieldGroup: [] };
        }
        if (this.fieldGroup = (type === 'fieldGroup' || designerType.fieldGroup)) {
            field.fieldGroup = [];
        }
        this.fieldEdit.setValue(field);
        this.$modal.modal('show');
    };
    /**
     * @return {?}
     */
    FieldPickerComponent.prototype.onApply = /**
     * @return {?}
     */
    function () {
        this.selected.emit(this.fieldEdit.value);
        this.$modal.modal('hide');
    };
    FieldPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-field-picker',
                    template: "\n        <form novalidate [formGroup]=\"form\">\n            <div class=\"form-group\">\n                <div class=\"input-group\">\n                    <formly-designer-type-select formControlName=\"type\">\n                    </formly-designer-type-select>\n                    <button type=\"button\" class=\"btn btn-secondary\" [disabled]=\"form.invalid\" (click)=\"add()\">\n                        Add\n                    </button>\n                </div>\n            </div>\n            <div #modal class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog modal-lg\" role=\"document\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">Add {{ type.value }}</h5>\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancel\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <formly-designer-field-editor #editor [fieldGroup]=\"fieldEdit.value.fieldGroup\" [formControl]=\"fieldEdit\">\n                            </formly-designer-field-editor>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n                            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onApply()\"\n                                [disabled]=\"editor.invalid\">Apply</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    ",
                    styles: ["\n        .btn:not(:disabled) {\n            cursor: pointer;\n        }\n        .input-group > .btn {\n            border-radius: 0 .25rem .25rem 0;\n        }\n        .input-group, .modal-header {\n            display: flex;\n        }\n        .modal-header {\n            justify-content: space-between;\n        }\n        formly-designer-type-select {\n            flex-grow: 2;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    FieldPickerComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: FormlyDesignerConfig }
    ]; };
    FieldPickerComponent.propDecorators = {
        modalRef: [{ type: ViewChild, args: ['modal',] }],
        selected: [{ type: Output }]
    };
    return FieldPickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var TYPE_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return TypeSelectComponent; })),
    multi: true
};
var TypeSelectComponent = /** @class */ (function () {
    function TypeSelectComponent(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formControl = new FormControl();
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @return {?}
     */
    TypeSelectComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        timer().subscribe((/**
         * @return {?}
         */
        function () {
            _this.types = Object.keys(_this.formlyDesignerConfig.types);
            if (_this.types.length > 0) {
                _this.formControl.setValue(_this.types[0]);
            }
            _this.types.push('fieldGroup');
        }));
    };
    /**
     * @return {?}
     */
    TypeSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.valueChangesSubscription = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (_this.onChange) {
                _this.onChange(value);
            }
        }));
    };
    /**
     * @return {?}
     */
    TypeSelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    TypeSelectComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        this.formControl.setValue(obj);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TypeSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TypeSelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    TypeSelectComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
    };
    TypeSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-type-select',
                    template: "\n        <select [formControl]=\"formControl\" class=\"custom-select\">\n            <option *ngFor=\"let type of types\" [ngValue]=\"type\">{{ type }}</option>\n        </select>\n    ",
                    providers: [TYPE_SELECT_CONTROL_VALUE_ACCESSOR],
                    styles: ["\n        select {\n            width: 100%;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    TypeSelectComponent.ctorParameters = function () { return [
        { type: FormlyDesignerConfig }
    ]; };
    return TypeSelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return WrapperEditorComponent; })),
    multi: true
};
var WrapperEditorComponent = /** @class */ (function () {
    function WrapperEditorComponent(fieldsService, formBuilder) {
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.subscriptions = [];
        this.fields = [];
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
        this.fieldForm = formBuilder.group({});
    }
    /**
     * @return {?}
     */
    WrapperEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.fieldForm.statusChanges
            .pipe(switchMap((/**
         * @return {?}
         */
        function () { return timer(); })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.invalid = _this.fieldForm.invalid; })));
        this.subscribeValueChanges();
    };
    /**
     * @return {?}
     */
    WrapperEditorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
        this.subscriptions.splice(0).forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        function (subscription) { return subscription.unsubscribe(); }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    WrapperEditorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    WrapperEditorComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        this.valueChangesSubscription.unsubscribe();
        if (!isObject(obj)) {
            obj = {};
        }
        this.fields = this.fieldsService.getWrapperFields(this.wrapper);
        this.fieldForm = this.formBuilder.group({});
        this.field = cloneDeep(obj);
        this.subscribeValueChanges();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WrapperEditorComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WrapperEditorComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    WrapperEditorComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.fieldForm.disable();
        }
        else {
            this.fieldForm.enable();
        }
    };
    /**
     * @private
     * @return {?}
     */
    WrapperEditorComponent.prototype.subscribeValueChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.valueChangesSubscription = this.fieldForm.valueChanges
            .pipe(debounceTime(0))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.updateValue(); }));
    };
    /**
     * @private
     * @return {?}
     */
    WrapperEditorComponent.prototype.updateValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.onChange) {
            return;
        }
        this.onChange(this.field);
    };
    WrapperEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-wrapper-editor',
                    template: "\n        <form [formGroup]=\"fieldForm\" novalidate>\n            <div class=\"card\">\n                <div class=\"card-body\">\n                    <formly-form [form]=\"fieldForm\" [fields]=\"fields\" [model]=\"field\">\n                    </formly-form>\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </form>\n    ",
                    providers: [
                        WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR
                    ]
                }] }
    ];
    /** @nocollapse */
    WrapperEditorComponent.ctorParameters = function () { return [
        { type: FieldsService },
        { type: FormBuilder }
    ]; };
    WrapperEditorComponent.propDecorators = {
        wrapper: [{ type: Input }]
    };
    return WrapperEditorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return WrapperSelectComponent; })),
    multi: true
};
var WrapperSelectComponent = /** @class */ (function () {
    function WrapperSelectComponent(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formControl = new FormControl();
        this.onChange = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @return {?}
     */
    WrapperSelectComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        timer().subscribe((/**
         * @return {?}
         */
        function () {
            _this.wrappers = Object.keys(_this.formlyDesignerConfig.wrappers);
            if (_this.wrappers.length > 0) {
                _this.formControl.setValue(_this.wrappers[0]);
            }
        }));
    };
    /**
     * @return {?}
     */
    WrapperSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.valueChangesSubscription = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (_this.onChange) {
                _this.onChange(value);
            }
        }));
    };
    /**
     * @return {?}
     */
    WrapperSelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.valueChangesSubscription.unsubscribe();
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    WrapperSelectComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        this.formControl.setValue(obj);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WrapperSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WrapperSelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    WrapperSelectComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
    };
    WrapperSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formly-designer-wrapper-select',
                    template: "\n        <select [formControl]=\"formControl\" class=\"custom-select\">\n            <option *ngFor=\"let wrapper of wrappers\" [ngValue]=\"wrapper\">{{ wrapper }}</option>\n        </select>\n    ",
                    providers: [WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR],
                    styles: ["\n        select {\n            width: 100%;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    WrapperSelectComponent.ctorParameters = function () { return [
        { type: FormlyDesignerConfig }
    ]; };
    return WrapperSelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    var nextId = 1;
    /** @type {?} */
    var objects = new Map();
    return traverse(cloneDeep(value), (/**
     * @param {?} key
     * @param {?} v
     * @return {?}
     */
    function (key, v) {
        if (isObject(v)) {
            if (objects.has(v)) {
                /** @type {?} */
                var id = objects.get(v);
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
        for (var i = 0; i < ((/** @type {?} */ (obj))).length; i++) {
            traverseValue.bind(obj, i, obj[i], replace)();
        }
    }
    else if (isObject(obj)) {
        for (var key in obj) {
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
    var replacement = replace(key, value);
    if (replacement === undefined) {
        traverse(value, replace);
    }
    else {
        this[key] = replacement;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DecyclePipe = /** @class */ (function () {
    function DecyclePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DecyclePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return decycle(value);
    };
    DecyclePipe.decorators = [
        { type: Pipe, args: [{ name: 'decycle' },] }
    ];
    return DecyclePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormlyDesignerModule = /** @class */ (function () {
    function FormlyDesignerModule(formlyConfig) {
        formlyConfig.addConfig(config);
    }
    /**
     * @param {?=} designerConfig
     * @return {?}
     */
    FormlyDesignerModule.forRoot = /**
     * @param {?=} designerConfig
     * @return {?}
     */
    function (designerConfig) {
        if (designerConfig === void 0) { designerConfig = {}; }
        return {
            ngModule: FormlyDesignerModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [fieldComponents, wrapperComponents], multi: true },
                { provide: FORMLY_DESIGNER_CONFIG_TOKEN, useValue: designerConfig, multi: true }
            ]
        };
    };
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
    FormlyDesignerModule.ctorParameters = function () { return [
        { type: FormlyConfig }
    ]; };
    return FormlyDesignerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { fieldComponents, wrapperComponents, config, FieldsService, FORMLY_DESIGNER_CONFIG_TOKEN, FormlyDesignerConfig, FormlyDesignerService, FormlyDesignerComponent, FormlyDesignerModule, decycle, FieldEditorComponent as ɵe, FieldPickerComponent as ɵf, TypeSelectComponent as ɵg, WrapperEditorComponent as ɵh, WrapperPickerComponent as ɵj, WrapperSelectComponent as ɵi, WrappersPickerComponent as ɵk, DecyclePipe as ɵl, TemplateDesigner as ɵd, FormlyDesignerWrapperComponent as ɵa, FormlyDesignerFieldWrapperComponent as ɵb, FormlyDesignerFieldGroupWrapperComponent as ɵc };

//# sourceMappingURL=ngx-formly-designer.js.map