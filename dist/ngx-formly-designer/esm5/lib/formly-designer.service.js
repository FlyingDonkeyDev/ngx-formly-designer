/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldsService } from './fields.service';
import { FormlyConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from './formly-designer-config';
import { BehaviorSubject } from 'rxjs';
import { cloneDeep, get, isArray, isEmpty, isFunction, isString, set, unset } from './util';
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
export { FormlyDesignerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2Zvcm1seS1kZXNpZ25lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBbUIsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFxQixNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFNUY7SUFFRSwrQkFDVSxjQUFvQyxFQUNwQyxhQUE0QixFQUM1QixZQUEwQjtRQUYxQixtQkFBYyxHQUFkLGNBQWMsQ0FBc0I7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFHbkIsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ2hELFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBc0IsRUFBRSxDQUFDLENBQUM7UUFDdkQsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQyxDQUFDO0lBSm5ELENBQUM7SUFNTCxzQkFBSSwyQ0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUM5QixDQUFDOzs7OztR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Q0FBd0U7Ozs7O0lBQ3hFLHVDQUF1RDs7Ozs7SUFQckQsK0NBQTRDOzs7OztJQUM1Qyw4Q0FBb0M7Ozs7O0lBQ3BDLDZDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi9maWVsZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNsb25lRGVlcCwgZ2V0LCBpc0FycmF5LCBpc0VtcHR5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgc2V0LCB1bnNldCB9IGZyb20gJy4vdXRpbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtbHlEZXNpZ25lclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZyxcbiAgICBwcml2YXRlIGZpZWxkc1NlcnZpY2U6IEZpZWxkc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZ1xuICApIHsgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Rpc2FibGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZpZWxkcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9ybWx5RmllbGRDb25maWdbXT4oW10pO1xuICBwcml2YXRlIHJlYWRvbmx5IF9tb2RlbCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55Pih7fSk7XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZC52YWx1ZTtcbiAgfVxuXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkLm5leHQoISF2YWx1ZSk7XG4gIH1cblxuICBnZXQgZGlzYWJsZWQkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBmaWVsZHMoKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkcy52YWx1ZTtcbiAgfVxuXG4gIHNldCBmaWVsZHModmFsdWU6IEZvcm1seUZpZWxkQ29uZmlnW10pIHtcbiAgICAvLyBQcnVuZSB0aGUgZmllbGRzIGJlY2F1c2Ugbmd4LWZvcm1seSBwb2xsdXRlcyB0aGVtIHdpdGggaW50ZXJuYWwgc3RhdGVcbiAgICAvLyBjYXVzaW5nIGluY29ycmVjdCBiZWhhdmlvciB3aGVuIHJlLWFwcGxpZWQuXG4gICAgY29uc3QgZmllbGRzID0gdGhpcy5jcmVhdGVQcnVuZWRGaWVsZHMoaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdKTtcbiAgICB0aGlzLl9maWVsZHMubmV4dChmaWVsZHMpO1xuICB9XG5cbiAgZ2V0IGZpZWxkcyQoKTogT2JzZXJ2YWJsZTxGb3JtbHlGaWVsZENvbmZpZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBtb2RlbCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbC52YWx1ZTtcbiAgfVxuXG4gIHNldCBtb2RlbCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fbW9kZWwubmV4dCh2YWx1ZSA9PSBudWxsID8ge30gOiB2YWx1ZSk7XG4gIH1cblxuICBnZXQgbW9kZWwkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgYWRkRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgdGhpcy5maWVsZHNTZXJ2aWNlLm11dGF0ZUZpZWxkKGZpZWxkLCBmYWxzZSk7XG5cbiAgICBjb25zdCBmaWVsZHMgPSBjbG9uZURlZXAodGhpcy5maWVsZHMpO1xuICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcblxuICAgIHRoaXMuZmllbGRzID0gZmllbGRzO1xuICAgIHRoaXMubW9kZWwgPSBjbG9uZURlZXAodGhpcy5tb2RlbCk7XG4gIH1cblxuICByZW1vdmVGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICB0aGlzLnVuc2V0RmllbGQoZmllbGQpO1xuICAgIGlmICh0aGlzLnJlcGxhY2VGaWVsZCh0aGlzLmZpZWxkcywgZmllbGQsIHVuZGVmaW5lZCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ29udHJvbChmaWVsZC5mb3JtQ29udHJvbCk7XG4gICAgfVxuXG4gICAgdGhpcy5maWVsZHMgPSBjbG9uZURlZXAodGhpcy5maWVsZHMpO1xuICAgIHRoaXMubW9kZWwgPSBjbG9uZURlZXAodGhpcy5tb2RlbCk7XG4gIH1cblxuICB1cGRhdGVGaWVsZChvcmlnaW5hbDogRm9ybWx5RmllbGRDb25maWcsIG1vZGlmaWVkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgIGNvbnN0IHBydW5lZCA9IHRoaXMuZmllbGRzU2VydmljZS5tdXRhdGVGaWVsZCh0aGlzLmNyZWF0ZVBydW5lZEZpZWxkKG1vZGlmaWVkKSwgZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMucmVwbGFjZUZpZWxkKHRoaXMuZmllbGRzLCBvcmlnaW5hbCwgcHJ1bmVkKSkge1xuICAgICAgaWYgKG9yaWdpbmFsLmZvcm1Db250cm9sICE9PSBwcnVuZWQuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy51bnNldEZpZWxkKG9yaWdpbmFsKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDb250cm9sKG9yaWdpbmFsLmZvcm1Db250cm9sKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maWVsZHMgPSBjbG9uZURlZXAodGhpcy5maWVsZHMpO1xuICAgICAgdGhpcy5tb2RlbCA9IGNsb25lRGVlcCh0aGlzLm1vZGVsKTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0RmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkKGZpZWxkKTtcbiAgfVxuXG4gIGNvbnZlcnRGaWVsZHMoZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKGZpZWxkcyk7XG4gIH1cblxuICBjcmVhdGVEZXNpZ25lckZpZWxkcygpOiBGb3JtbHlGaWVsZENvbmZpZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVQcnVuZWRGaWVsZHModGhpcy5maWVsZHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcnVuZWRGaWVsZHMoZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgY29uc3QgcHJ1bmVkRmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW107XG4gICAgaWYgKGlzQXJyYXkoZmllbGRzKSkge1xuICAgICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBjb25zdCBwcnVuZWQgPSB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkKGZpZWxkKTtcbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkQXJyYXkpIHtcbiAgICAgICAgICBwcnVuZWQuZmllbGRBcnJheSA9IHRoaXMuY3JlYXRlUHJ1bmVkRmllbGQoZmllbGQuZmllbGRBcnJheSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGQuZmllbGRHcm91cCAmJiAhcHJ1bmVkLmZpZWxkQXJyYXkpIHtcbiAgICAgICAgICBwcnVuZWQuZmllbGRHcm91cCA9IHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKGZpZWxkLmZpZWxkR3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwcnVuZWQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBwcnVuZWRGaWVsZHMucHVzaChwcnVuZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHBydW5lZEZpZWxkcztcbiAgfVxuXG4gIGdldFdyYXBwZXJzKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAoIWZpZWxkIHx8ICFpc0FycmF5KGZpZWxkLndyYXBwZXJzKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IGNsb25lZEZpZWxkID0gY2xvbmVEZWVwKGZpZWxkKTtcbiAgICBsZXQgd3JhcHBlcnMgPSBjbG9uZWRGaWVsZC53cmFwcGVycyA9IChjbG9uZWRGaWVsZC53cmFwcGVycyB8fCBbXSk7XG4gICAgaWYgKGlzRnVuY3Rpb24odGhpcy5kZXNpZ25lckNvbmZpZy5zZXR0aW5ncy5maWx0ZXJXcmFwcGVyKSkge1xuICAgICAgd3JhcHBlcnMgPSB3cmFwcGVycy5maWx0ZXIodyA9PiB0aGlzLmRlc2lnbmVyQ29uZmlnLnNldHRpbmdzLmZpbHRlcldyYXBwZXIodywgY2xvbmVkRmllbGQpKTtcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgd3JhcHBlcnMgcGFydCBvZiB0aGUgZm9ybWx5IGNvbmZpZ3VyYXRpb24gKHN0YXRpYyBhbmQgZHluYW1pYykgdG8gZXhjbHVkZSB0aGVtIGZyb20gdGhlIHJlc3VsdFxuICAgIGNvbnN0IHN0YXRpY1dyYXBwZXJzID0gZmllbGQudHlwZSA/IHRoaXMuZm9ybWx5Q29uZmlnLmdldFR5cGUoZmllbGQudHlwZSkud3JhcHBlcnMgfHwgW10gOiBbXTtcbiAgICBjb25zdCB0eXBlV3JhcHBlcnMgPSBzdGF0aWNXcmFwcGVyc1xuICAgICAgLmNvbmNhdCh0aGlzLmZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLm1hcChtID0+IG0oY2xvbmVkRmllbGQpKSlcbiAgICAgIC5jb25jYXQodGhpcy5mb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucG9zdFdyYXBwZXIubWFwKG0gPT4gbShjbG9uZWRGaWVsZCkpKVxuICAgICAgLmZpbHRlcih3ID0+IHcpO1xuXG4gICAgLy8gUmVtb3ZlIHdyYXBwZXJzIHBhcnQgb2YgdGhlIGZvcm1seSBjb25maWd1cmF0aW9uIGZyb20gdGhlIHJlc3VsdFxuICAgIGlmICh0eXBlV3JhcHBlcnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IHdyYXBwZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGZvciAobGV0IGogPSB0eXBlV3JhcHBlcnMubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICBpZiAod3JhcHBlcnNbaV0gPT09IHR5cGVXcmFwcGVyc1tqXSkge1xuICAgICAgICAgICAgdHlwZVdyYXBwZXJzLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgIHdyYXBwZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlcnM7XG4gIH1cblxuICAvKiogUHJ1bmVzIHRoZSBmaWVsZCBvZiBwYXRocyBub3QgaWRlbnRpZmllZCBpbiB0aGUgZGVzaWduZXIgY29uZmlnICovXG4gIHByaXZhdGUgY3JlYXRlUHJ1bmVkRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgIGNvbnN0IHR5cGUgPSBnZXQoZmllbGQsICd0ZW1wbGF0ZU9wdGlvbnMuJGZpZWxkQXJyYXkudHlwZScsIGZpZWxkLnR5cGUpO1xuICAgIGNvbnN0IGRlc2lnbmVyVHlwZSA9IHRoaXMuZGVzaWduZXJDb25maWcudHlwZXNbdHlwZV07XG4gICAgY29uc3QgcHJ1bmVkOiBGb3JtbHlGaWVsZENvbmZpZyA9IGlzRW1wdHkoZmllbGQua2V5KSA/IHt9IDogeyBrZXk6IGZpZWxkLmtleSB9O1xuXG4gICAgaWYgKGRlc2lnbmVyVHlwZSkge1xuICAgICAgcHJ1bmVkLnR5cGUgPSB0eXBlO1xuICAgICAgdGhpcy5hcHBseVByb3BlcnRpZXMoZmllbGQsIHBydW5lZCwgZGVzaWduZXJUeXBlLmZpZWxkcyk7XG4gICAgICBpZiAoZGVzaWduZXJUeXBlLmZpZWxkQXJyYXkpIHtcbiAgICAgICAgcHJ1bmVkLmZpZWxkQXJyYXkgPSB7XG4gICAgICAgICAgZmllbGRHcm91cDogdGhpcy5jcmVhdGVQcnVuZWRGaWVsZHMoZmllbGQuZmllbGRHcm91cClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShmaWVsZC5maWVsZEdyb3VwKSAmJiAhaXNBcnJheShwcnVuZWQuZmllbGRBcnJheSkpIHtcbiAgICAgIHBydW5lZC5maWVsZEdyb3VwID0gdGhpcy5jcmVhdGVQcnVuZWRGaWVsZHMoZmllbGQuZmllbGRHcm91cCk7XG5cbiAgICAgIGxldCBmaWVsZEdyb3VwQ2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgICBpZiAoaXNTdHJpbmcoZmllbGQuZmllbGRHcm91cENsYXNzTmFtZSkgJiYgKGZpZWxkR3JvdXBDbGFzc05hbWUgPSBmaWVsZC5maWVsZEdyb3VwQ2xhc3NOYW1lLnRyaW0oKSkubGVuZ3RoID4gMCkge1xuICAgICAgICBwcnVuZWQuZmllbGRHcm91cENsYXNzTmFtZSA9IGZpZWxkR3JvdXBDbGFzc05hbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNsYXNzTmFtZTogc3RyaW5nO1xuICAgIGlmIChpc1N0cmluZyhmaWVsZC5jbGFzc05hbWUpICYmIChjbGFzc05hbWUgPSBmaWVsZC5jbGFzc05hbWUudHJpbSgpKS5sZW5ndGggPiAwKSB7XG4gICAgICBwcnVuZWQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IHdyYXBwZXJzID0gdGhpcy5nZXRXcmFwcGVycyhmaWVsZCk7XG4gICAgaWYgKHdyYXBwZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHBydW5lZC53cmFwcGVycyA9IHdyYXBwZXJzO1xuICAgICAgY29uc3QgZGVzaWduZXJXcmFwcGVyRmllbGRzID0gd3JhcHBlcnMubWFwKHdyYXBwZXIgPT4gdGhpcy5kZXNpZ25lckNvbmZpZy53cmFwcGVyc1t3cmFwcGVyXSlcbiAgICAgICAgLmZpbHRlcihkZXNpZ25lck9wdGlvbiA9PiBkZXNpZ25lck9wdGlvbiAmJiBpc0FycmF5KGRlc2lnbmVyT3B0aW9uLmZpZWxkcykpXG4gICAgICAgIC5yZWR1Y2U8Rm9ybWx5RmllbGRDb25maWdbXT4oKHByZXZpb3VzLCBjdXJyZW50KSA9PiBwcmV2aW91cy5jb25jYXQoY3VycmVudC5maWVsZHMpLCBbXSk7XG4gICAgICB0aGlzLmFwcGx5UHJvcGVydGllcyhmaWVsZCwgcHJ1bmVkLCBkZXNpZ25lcldyYXBwZXJGaWVsZHMpO1xuICAgIH1cbiAgICByZXR1cm4gcHJ1bmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVByb3BlcnRpZXMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBkZXNpZ25lZDogRm9ybWx5RmllbGRDb25maWcsIGRlc2lnbmVyRmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdKTogdm9pZCB7XG4gICAgaWYgKGlzQXJyYXkoZGVzaWduZXJGaWVsZHMpKSB7XG4gICAgICBkZXNpZ25lckZpZWxkcy5mb3JFYWNoKGRlc2lnbmVyRmllbGQgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGdldChmaWVsZCwgZGVzaWduZXJGaWVsZC5rZXkpO1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAoIWlzU3RyaW5nKHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPiAwKSAmJiB2YWx1ZSAhPT0gZGVzaWduZXJGaWVsZC5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICBzZXQoZGVzaWduZWQsIGRlc2lnbmVyRmllbGQua2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVwbGFjZUZpZWxkKGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSwgb3JpZ2luYWw6IEZvcm1seUZpZWxkQ29uZmlnLCBtb2RpZmllZDogRm9ybWx5RmllbGRDb25maWcpOiBib29sZWFuIHtcbiAgICBpZiAoaXNBcnJheShmaWVsZHMpKSB7XG4gICAgICBjb25zdCBsID0gZmllbGRzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRzW2ldO1xuICAgICAgICBpZiAoZmllbGQgPT09IG9yaWdpbmFsKSB7XG4gICAgICAgICAgaWYgKG1vZGlmaWVkID09IG51bGwpIHtcbiAgICAgICAgICAgIGZpZWxkcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpZWxkc1tpXSA9IG1vZGlmaWVkO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGQuZmllbGRHcm91cCAmJiB0aGlzLnJlcGxhY2VGaWVsZChmaWVsZC5maWVsZEdyb3VwLCBvcmlnaW5hbCwgbW9kaWZpZWQpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkQXJyYXkgJiYgdGhpcy5yZXBsYWNlRmllbGRBcnJheShmaWVsZCwgb3JpZ2luYWwsIG1vZGlmaWVkKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVwbGFjZUZpZWxkQXJyYXkocGFyZW50OiBGb3JtbHlGaWVsZENvbmZpZywgb3JpZ2luYWw6IEZvcm1seUZpZWxkQ29uZmlnLCBtb2RpZmllZDogRm9ybWx5RmllbGRDb25maWcpOiBib29sZWFuIHtcbiAgICBjb25zdCBmaWVsZEFycmF5ID0gcGFyZW50LmZpZWxkQXJyYXk7XG4gICAgaWYgKGZpZWxkQXJyYXkgPT09IG9yaWdpbmFsKSB7XG4gICAgICBwYXJlbnQuZmllbGRBcnJheSA9IG1vZGlmaWVkO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChmaWVsZEFycmF5LmZpZWxkR3JvdXAgJiYgdGhpcy5yZXBsYWNlRmllbGQoZmllbGRBcnJheS5maWVsZEdyb3VwLCBvcmlnaW5hbCwgbW9kaWZpZWQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkQXJyYXkuZmllbGRBcnJheSAmJiB0aGlzLnJlcGxhY2VGaWVsZEFycmF5KGZpZWxkQXJyYXksIG9yaWdpbmFsLCBtb2RpZmllZCk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkUGF0aChrZXk6IHN0cmluZywgcGF0aDogc3RyaW5nLCBhcnJheU5leHQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHJldHVybiBwYXRoID8ga2V5ICsgKGFycmF5TmV4dCA/IHBhdGggOiAnLicgKyBwYXRoKSA6IGtleTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0aChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGluY2x1ZGVTZWxmOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZyB7XG4gICAgbGV0IHBhdGggPSAnJztcbiAgICBsZXQgYXJyYXlOZXh0ID0gZmFsc2U7XG5cbiAgICBpZiAoIWluY2x1ZGVTZWxmKSB7XG4gICAgICBjb250cm9sID0gKGNvbnRyb2wgfHwge30gYXMgQWJzdHJhY3RDb250cm9sKS5wYXJlbnQ7XG4gICAgfVxuICAgIGZvciAobGV0IGNoaWxkID0gY29udHJvbCwgcGFyZW50ID0gKGNvbnRyb2wgfHwge30gYXMgQWJzdHJhY3RDb250cm9sKS5wYXJlbnQ7ICEhcGFyZW50OyBjaGlsZCA9IHBhcmVudCwgcGFyZW50ID0gcGFyZW50LnBhcmVudCkge1xuICAgICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJlbnQuY29udHJvbHMpIHtcbiAgICAgICAgICBpZiAocGFyZW50LmNvbnRyb2xzW2tleV0gPT09IGNoaWxkKSB7XG4gICAgICAgICAgICBwYXRoID0gdGhpcy5idWlsZFBhdGgoa2V5LCBwYXRoLCBhcnJheU5leHQpO1xuICAgICAgICAgICAgYXJyYXlOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyZW50IGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcmVudC5hdChpKSA9PT0gY2hpbGQpIHtcbiAgICAgICAgICAgIHBhdGggPSB0aGlzLmJ1aWxkUGF0aCgnWycgKyBpICsgJ10nLCBwYXRoLCBhcnJheU5leHQpO1xuICAgICAgICAgICAgYXJyYXlOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIHByaXZhdGUgdW5zZXRGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICBpZiAoZmllbGQpIHtcbiAgICAgIGlmIChmaWVsZC5maWVsZEFycmF5KSB7XG4gICAgICAgIHRoaXMudW5zZXRGaWVsZChmaWVsZC5maWVsZEFycmF5KTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICAgIGZpZWxkLmZpZWxkR3JvdXAuZm9yRWFjaChmID0+IHRoaXMudW5zZXRGaWVsZChmKSk7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGQuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMucGF0aChmaWVsZC5mb3JtQ29udHJvbCk7XG4gICAgICAgIHVuc2V0KHRoaXMubW9kZWwsIHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ29udHJvbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJlbnQgPSBjb250cm9sID8gY29udHJvbC5wYXJlbnQgOiB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGFyZW50LmNvbnRyb2xzKSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29udHJvbHNba2V5XSA9PT0gY29udHJvbCkge1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVDb250cm9sKGtleSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwYXJlbnQuYXQoaSkgPT09IGNvbnRyb2wpIHtcbiAgICAgICAgICBwYXJlbnQucmVtb3ZlQXQoaSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=