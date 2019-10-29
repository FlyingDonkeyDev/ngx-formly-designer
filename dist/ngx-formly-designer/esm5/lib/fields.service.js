/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormlyDesignerConfig } from './formly-designer-config';
import { cloneDeep, equalType, getKeyPath, isObject, traverseFields } from './util';
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
export { FieldsService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FieldsService.prototype.formlyDesignerConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2ZpZWxkcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBa0Isb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUVwRjtJQUVJLHVCQUNZLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQ2xELENBQUM7Ozs7OztJQUVMLHNDQUFjOzs7OztJQUFkLFVBQWUsS0FBd0IsRUFBRSxNQUEyQjs7WUFDNUQsT0FBTyxHQUFHLEVBQUU7UUFDaEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTs7Z0JBQ2QsU0FBTyxHQUFHLElBQUksR0FBRyxFQUF3QztZQUMvRCxjQUFjLENBQUMsTUFBTTs7Ozs7O1lBQUUsVUFBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU07Z0JBQ25DLFNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1lBRUgsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBQ3hCLEdBQUcsR0FBRyxTQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM1QixPQUFPLEdBQUcsRUFBRTtnQkFDUixPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsR0FBRyxHQUFHLFNBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUI7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQscUNBQWE7Ozs7SUFBYixVQUFjLElBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUVELHdDQUFnQjs7OztJQUFoQixVQUFpQixPQUFlO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGdEQUFnRDs7Ozs7Ozs7SUFDaEQsa0NBQVU7Ozs7Ozs7SUFBVixVQUFXLEtBQXdCLEVBQUUsTUFBMkIsRUFBRSxNQUEwQjs7WUFDbEYsZUFBZSxHQUFHLElBQUksR0FBRyxFQUEwQzs7WUFFbkUsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUM3RSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU07UUFDN0IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNOzs7OztRQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUM7O2dCQUMxQixJQUFJLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JHLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQ3hCLE9BQU87YUFDVjtZQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDeEIsT0FBTztpQkFDVjthQUNKO1lBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFRCxtQ0FBVzs7Ozs7SUFBWCxVQUFZLEtBQXdCLEVBQUUsYUFBc0I7UUFDeEQsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2pDLEtBQUssQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxhQUFhLENBQUM7U0FDM0Q7YUFBTTtZQUNILEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLENBQUM7U0FDN0Q7UUFDRCxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO2FBQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQ3hELElBQUksYUFBYSxFQUFFO2dCQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUNyRDtpQkFBTTtnQkFDSCxzQ0FBc0M7Z0JBQ3RDLEtBQUssQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM1RCxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO2dCQUMvQyxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQztnQkFFbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3REO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCxvQ0FBWTs7Ozs7SUFBWixVQUFhLE1BQTJCLEVBQUUsY0FBdUI7UUFBakUsaUJBRUM7UUFERyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLEVBQXZDLENBQXVDLEVBQUMsQ0FBQztJQUNyRSxDQUFDOzs7Ozs7O0lBRU8saUNBQVM7Ozs7OztJQUFqQixVQUFrQixJQUFZLEVBQUUsSUFBWTs7WUFDbEMsY0FBYyxHQUFHLG1CQUFBLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBa0I7O1lBQzFGLE1BQU0sR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0lBRU8sMENBQWtCOzs7OztJQUExQixVQUEyQixJQUFZO1FBQ25DLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDOztnQkEvRkosVUFBVTs7OztnQkFIYyxvQkFBb0I7O0lBbUc3QyxvQkFBQztDQUFBLEFBaEdELElBZ0dDO1NBL0ZZLGFBQWE7Ozs7OztJQUVsQiw2Q0FBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRGVzaWduZXJPcHRpb24sIEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi9mb3JtbHktZGVzaWduZXItY29uZmlnJztcbmltcG9ydCB7IGNsb25lRGVlcCwgZXF1YWxUeXBlLCBnZXRLZXlQYXRoLCBpc09iamVjdCwgdHJhdmVyc2VGaWVsZHMgfSBmcm9tICcuL3V0aWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmllbGRzU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZm9ybWx5RGVzaWduZXJDb25maWc6IEZvcm1seURlc2lnbmVyQ29uZmlnXG4gICAgKSB7IH1cblxuICAgIGdldEZ1bGxLZXlQYXRoKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZywgZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdKTogKHN0cmluZyB8IG51bWJlcilbXSB7XG4gICAgICAgIGxldCBrZXlQYXRoID0gW107XG4gICAgICAgIGlmIChmaWVsZCAmJiBmaWVsZC5rZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudHMgPSBuZXcgTWFwPEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZz4oKTtcbiAgICAgICAgICAgIHRyYXZlcnNlRmllbGRzKGZpZWxkcywgKGYsIHBhdGgsIHBhcmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHBhcmVudHMuc2V0KGYsIHBhcmVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAga2V5UGF0aCA9IGdldEtleVBhdGgoZmllbGQpO1xuICAgICAgICAgICAgbGV0IGN1ciA9IHBhcmVudHMuZ2V0KGZpZWxkKTtcbiAgICAgICAgICAgIHdoaWxlIChjdXIpIHtcbiAgICAgICAgICAgICAgICBrZXlQYXRoID0gZ2V0S2V5UGF0aChjdXIpLmNvbmNhdChrZXlQYXRoKTtcbiAgICAgICAgICAgICAgICBjdXIgPSBwYXJlbnRzLmdldChjdXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlQYXRoO1xuICAgIH1cblxuICAgIGdldFR5cGVGaWVsZHModHlwZTogc3RyaW5nKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpZWxkcyh0eXBlLCAndHlwZScpO1xuICAgIH1cblxuICAgIGdldFdyYXBwZXJGaWVsZHMod3JhcHBlcjogc3RyaW5nKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpZWxkcyh3cmFwcGVyLCAnd3JhcHBlcicpO1xuICAgIH1cblxuICAgIC8qKiBDaGVjayB0aGUgZmllbGQgZm9yIGNvbnRyb2wgdHlwZSBjb25mbGljdCAqL1xuICAgIGNoZWNrRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBmaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10sIHBhcmVudD86IEZvcm1seUZpZWxkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGZ1bGxQYXRoQnlGaWVsZCA9IG5ldyBNYXA8Rm9ybWx5RmllbGRDb25maWcsIChzdHJpbmcgfCBudW1iZXIpW10+KCk7XG5cbiAgICAgICAgY29uc3QgbmV3UGF0aCA9IHRoaXMuZ2V0RnVsbEtleVBhdGgocGFyZW50IHx8IHt9LCBmaWVsZHMpLmNvbmNhdChnZXRLZXlQYXRoKGZpZWxkKSk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IG5ld1BhdGgubGVuZ3RoO1xuICAgICAgICByZXR1cm4gIXRyYXZlcnNlRmllbGRzKGZpZWxkcywgKGYsIHApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmdWxsUGF0aEJ5RmllbGQuZ2V0KGYpIHx8IGZ1bGxQYXRoQnlGaWVsZC5zZXQoZiwgKHAgfHwgW10pLmNvbmNhdChnZXRLZXlQYXRoKGYpKSkuZ2V0KGYpO1xuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoICE9PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhdGhbaV0gIT09IG5ld1BhdGhbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAhZXF1YWxUeXBlKGZpZWxkLCBmKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbXV0YXRlRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBkZXNpZ25lckZpZWxkOiBib29sZWFuKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgICAgICBpZiAoaXNPYmplY3QoZmllbGQudGVtcGxhdGVPcHRpb25zKSkge1xuICAgICAgICAgICAgZmllbGQudGVtcGxhdGVPcHRpb25zWyckZGVzaWduZXJGaWVsZCddID0gZGVzaWduZXJGaWVsZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucyA9IHsgJGRlc2lnbmVyRmllbGQ6IGRlc2lnbmVyRmllbGQgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgICAgICAgdGhpcy5tdXRhdGVGaWVsZHMoZmllbGQuZmllbGRHcm91cCwgZGVzaWduZXJGaWVsZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGQuZmllbGRBcnJheSAmJiBmaWVsZC5maWVsZEFycmF5LmZpZWxkR3JvdXApIHtcbiAgICAgICAgICAgIGlmIChkZXNpZ25lckZpZWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tdXRhdGVGaWVsZChmaWVsZC5maWVsZEFycmF5LCBkZXNpZ25lckZpZWxkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVHJlYXRpbmcgZmllbGRBcnJheXMgYXMgZmllbGRHcm91cHNcbiAgICAgICAgICAgICAgICBmaWVsZC50ZW1wbGF0ZU9wdGlvbnNbJyRmaWVsZEFycmF5J10gPSB7IHR5cGU6IGZpZWxkLnR5cGUgfTtcbiAgICAgICAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwID0gZmllbGQuZmllbGRBcnJheS5maWVsZEdyb3VwO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmaWVsZC5maWVsZEFycmF5O1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmaWVsZC50eXBlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tdXRhdGVGaWVsZHMoZmllbGQuZmllbGRHcm91cCwgZGVzaWduZXJGaWVsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgIH1cblxuICAgIG11dGF0ZUZpZWxkcyhmaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10sIGRlc2lnbmVyRmllbGRzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHRoaXMubXV0YXRlRmllbGQoZmllbGQsIGRlc2lnbmVyRmllbGRzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGaWVsZHMobmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOiBGb3JtbHlGaWVsZENvbmZpZ1tdIHtcbiAgICAgICAgY29uc3QgZGVzaWduZXJPcHRpb24gPSAobmFtZSA/IHRoaXMuZ2V0RGVzaWduZXJPcHRpb25zKHR5cGUpW25hbWVdIHx8IHt9IDoge30pIGFzIERlc2lnbmVyT3B0aW9uO1xuICAgICAgICBjb25zdCBmaWVsZHMgPSBjbG9uZURlZXAoZGVzaWduZXJPcHRpb24uZmllbGRzIHx8IFtdKTtcbiAgICAgICAgdGhpcy5tdXRhdGVGaWVsZHMoZmllbGRzLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERlc2lnbmVyT3B0aW9ucyh0eXBlOiBzdHJpbmcpOiB7IFtuYW1lOiBzdHJpbmddOiBEZXNpZ25lck9wdGlvbiB9IHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICd0eXBlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWx5RGVzaWduZXJDb25maWcudHlwZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICd3cmFwcGVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWx5RGVzaWduZXJDb25maWcud3JhcHBlcnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn1cbiJdfQ==