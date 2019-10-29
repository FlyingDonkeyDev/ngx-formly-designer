/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormlyDesignerConfig } from './formly-designer-config';
import { cloneDeep, equalType, getKeyPath, isObject, traverseFields } from './util';
export class FieldsService {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    FieldsService.prototype.formlyDesignerConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2ZpZWxkcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBa0Isb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUdwRixNQUFNLE9BQU8sYUFBYTs7OztJQUN0QixZQUNZLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQ2xELENBQUM7Ozs7OztJQUVMLGNBQWMsQ0FBQyxLQUF3QixFQUFFLE1BQTJCOztZQUM1RCxPQUFPLEdBQUcsRUFBRTtRQUNoQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFOztrQkFDZCxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQXdDO1lBQy9ELGNBQWMsQ0FBQyxNQUFNOzs7Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1lBRUgsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBQ3hCLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM1QixPQUFPLEdBQUcsRUFBRTtnQkFDUixPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7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Y0FBdUI7UUFDN0QsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxFQUFDLENBQUM7SUFDckUsQ0FBQzs7Ozs7OztJQUVPLFNBQVMsQ0FBQyxJQUFZLEVBQUUsSUFBWTs7Y0FDbEMsY0FBYyxHQUFHLG1CQUFBLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBa0I7O2NBQzFGLE1BQU0sR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsSUFBWTtRQUNuQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztTQUM3QztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7O1lBL0ZKLFVBQVU7Ozs7WUFIYyxvQkFBb0I7Ozs7Ozs7SUFNckMsNkNBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IERlc2lnbmVyT3B0aW9uLCBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBjbG9uZURlZXAsIGVxdWFsVHlwZSwgZ2V0S2V5UGF0aCwgaXNPYmplY3QsIHRyYXZlcnNlRmllbGRzIH0gZnJvbSAnLi91dGlsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpZWxkc1NlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZ1xuICAgICkgeyB9XG5cbiAgICBnZXRGdWxsS2V5UGF0aChmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSk6IChzdHJpbmcgfCBudW1iZXIpW10ge1xuICAgICAgICBsZXQga2V5UGF0aCA9IFtdO1xuICAgICAgICBpZiAoZmllbGQgJiYgZmllbGQua2V5KSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRzID0gbmV3IE1hcDxGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5RmllbGRDb25maWc+KCk7XG4gICAgICAgICAgICB0cmF2ZXJzZUZpZWxkcyhmaWVsZHMsIChmLCBwYXRoLCBwYXJlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzLnNldChmLCBwYXJlbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGtleVBhdGggPSBnZXRLZXlQYXRoKGZpZWxkKTtcbiAgICAgICAgICAgIGxldCBjdXIgPSBwYXJlbnRzLmdldChmaWVsZCk7XG4gICAgICAgICAgICB3aGlsZSAoY3VyKSB7XG4gICAgICAgICAgICAgICAga2V5UGF0aCA9IGdldEtleVBhdGgoY3VyKS5jb25jYXQoa2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgY3VyID0gcGFyZW50cy5nZXQoY3VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5UGF0aDtcbiAgICB9XG5cbiAgICBnZXRUeXBlRmllbGRzKHR5cGU6IHN0cmluZyk6IEZvcm1seUZpZWxkQ29uZmlnW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWVsZHModHlwZSwgJ3R5cGUnKTtcbiAgICB9XG5cbiAgICBnZXRXcmFwcGVyRmllbGRzKHdyYXBwZXI6IHN0cmluZyk6IEZvcm1seUZpZWxkQ29uZmlnW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWVsZHMod3JhcHBlciwgJ3dyYXBwZXInKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2sgdGhlIGZpZWxkIGZvciBjb250cm9sIHR5cGUgY29uZmxpY3QgKi9cbiAgICBjaGVja0ZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZywgZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdLCBwYXJlbnQ/OiBGb3JtbHlGaWVsZENvbmZpZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBmdWxsUGF0aEJ5RmllbGQgPSBuZXcgTWFwPEZvcm1seUZpZWxkQ29uZmlnLCAoc3RyaW5nIHwgbnVtYmVyKVtdPigpO1xuXG4gICAgICAgIGNvbnN0IG5ld1BhdGggPSB0aGlzLmdldEZ1bGxLZXlQYXRoKHBhcmVudCB8fCB7fSwgZmllbGRzKS5jb25jYXQoZ2V0S2V5UGF0aChmaWVsZCkpO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBuZXdQYXRoLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuICF0cmF2ZXJzZUZpZWxkcyhmaWVsZHMsIChmLCBwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gZnVsbFBhdGhCeUZpZWxkLmdldChmKSB8fCBmdWxsUGF0aEJ5RmllbGQuc2V0KGYsIChwIHx8IFtdKS5jb25jYXQoZ2V0S2V5UGF0aChmKSkpLmdldChmKTtcbiAgICAgICAgICAgIGlmIChwYXRoLmxlbmd0aCAhPT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwYXRoW2ldICE9PSBuZXdQYXRoW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gIWVxdWFsVHlwZShmaWVsZCwgZik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG11dGF0ZUZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZywgZGVzaWduZXJGaWVsZDogYm9vbGVhbik6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICAgICAgaWYgKGlzT2JqZWN0KGZpZWxkLnRlbXBsYXRlT3B0aW9ucykpIHtcbiAgICAgICAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9uc1snJGRlc2lnbmVyRmllbGQnXSA9IGRlc2lnbmVyRmllbGQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnMgPSB7ICRkZXNpZ25lckZpZWxkOiBkZXNpZ25lckZpZWxkIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgICAgICAgIHRoaXMubXV0YXRlRmllbGRzKGZpZWxkLmZpZWxkR3JvdXAsIGRlc2lnbmVyRmllbGQpO1xuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLmZpZWxkQXJyYXkgJiYgZmllbGQuZmllbGRBcnJheS5maWVsZEdyb3VwKSB7XG4gICAgICAgICAgICBpZiAoZGVzaWduZXJGaWVsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubXV0YXRlRmllbGQoZmllbGQuZmllbGRBcnJheSwgZGVzaWduZXJGaWVsZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRyZWF0aW5nIGZpZWxkQXJyYXlzIGFzIGZpZWxkR3JvdXBzXG4gICAgICAgICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zWyckZmllbGRBcnJheSddID0geyB0eXBlOiBmaWVsZC50eXBlIH07XG4gICAgICAgICAgICAgICAgZmllbGQuZmllbGRHcm91cCA9IGZpZWxkLmZpZWxkQXJyYXkuZmllbGRHcm91cDtcbiAgICAgICAgICAgICAgICBkZWxldGUgZmllbGQuZmllbGRBcnJheTtcbiAgICAgICAgICAgICAgICBkZWxldGUgZmllbGQudHlwZTtcblxuICAgICAgICAgICAgICAgIHRoaXMubXV0YXRlRmllbGRzKGZpZWxkLmZpZWxkR3JvdXAsIGRlc2lnbmVyRmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZDtcbiAgICB9XG5cbiAgICBtdXRhdGVGaWVsZHMoZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdLCBkZXNpZ25lckZpZWxkczogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB0aGlzLm11dGF0ZUZpZWxkKGZpZWxkLCBkZXNpZ25lckZpZWxkcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RmllbGRzKG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbmVyT3B0aW9uID0gKG5hbWUgPyB0aGlzLmdldERlc2lnbmVyT3B0aW9ucyh0eXBlKVtuYW1lXSB8fCB7fSA6IHt9KSBhcyBEZXNpZ25lck9wdGlvbjtcbiAgICAgICAgY29uc3QgZmllbGRzID0gY2xvbmVEZWVwKGRlc2lnbmVyT3B0aW9uLmZpZWxkcyB8fCBbXSk7XG4gICAgICAgIHRoaXMubXV0YXRlRmllbGRzKGZpZWxkcywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZXNpZ25lck9wdGlvbnModHlwZTogc3RyaW5nKTogeyBbbmFtZTogc3RyaW5nXTogRGVzaWduZXJPcHRpb24gfSB7XG4gICAgICAgIGlmICh0eXBlID09PSAndHlwZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLnR5cGVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnd3JhcHBlcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLndyYXBwZXJzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG59XG4iXX0=