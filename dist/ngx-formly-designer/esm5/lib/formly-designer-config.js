/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { FormlyConfig } from '@ngx-formly/core';
/** @type {?} */
export var FORMLY_DESIGNER_CONFIG_TOKEN = new InjectionToken('FORMLY_DESIGNER_CONFIG_TOKEN');
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
export { FormlyDesignerConfig };
if (false) {
    /** @type {?} */
    FormlyDesignerConfig.prototype.types;
    /** @type {?} */
    FormlyDesignerConfig.prototype.wrappers;
    /** @type {?} */
    FormlyDesignerConfig.prototype.settings;
    /**
     * @type {?}
     * @private
     */
    FormlyDesignerConfig.prototype.formlyConfig;
}
/**
 * @record
 */
export function DesignerOption() { }
if (false) {
    /** @type {?} */
    DesignerOption.prototype.name;
    /** @type {?|undefined} */
    DesignerOption.prototype.fields;
}
/**
 * @record
 */
export function DesignerTypeOption() { }
if (false) {
    /** @type {?|undefined} */
    DesignerTypeOption.prototype.fieldArray;
    /** @type {?|undefined} */
    DesignerTypeOption.prototype.fieldGroup;
}
/**
 * @record
 */
export function DesignerSettings() { }
if (false) {
    /** @type {?|undefined} */
    DesignerSettings.prototype.showClassName;
    /** @type {?|undefined} */
    DesignerSettings.prototype.filterWrapper;
}
/**
 * @record
 */
export function DesignerConfigOption() { }
if (false) {
    /** @type {?|undefined} */
    DesignerConfigOption.prototype.settings;
    /** @type {?|undefined} */
    DesignerConfigOption.prototype.types;
    /** @type {?|undefined} */
    DesignerConfigOption.prototype.wrappers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvZm9ybWx5LWRlc2lnbmVyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQXFCLE1BQU0sa0JBQWtCLENBQUM7O0FBRW5FLE1BQU0sS0FBTyw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBUyw4QkFBOEIsQ0FBQztBQUV0RztJQUVJLDhCQUMwQyxPQUFvQyxFQUNsRSxZQUEwQjtRQURsQyx3QkFBQSxFQUFBLFlBQTBFO1FBRDlFLGlCQUtDO1FBSFcsaUJBQVksR0FBWixZQUFZLENBQWM7UUFLdEMsVUFBSyxHQUF5QyxFQUFFLENBQUM7UUFDakQsYUFBUSxHQUFxQyxFQUFFLENBQUM7UUFDaEQsYUFBUSxHQUFxQixFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUxqRCxPQUFPLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBdEIsQ0FBc0IsRUFBQyxDQUFDO0lBQ3RELENBQUM7Ozs7O0lBTUQsd0NBQVM7Ozs7SUFBVCxVQUFVLE1BQTRCO1FBQ2xDLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCwwQ0FBVzs7OztJQUFYLFVBQVksUUFBMEI7UUFDbEMsSUFBSSxRQUFRLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztTQUMxRDtJQUNMLENBQUM7Ozs7O0lBRUQsc0NBQU87Ozs7SUFBUCxVQUFRLE9BQWtEO1FBQTFELGlCQW1CQztRQWxCRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLE1BQU07Z0JBQ25CLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsQ0FBQyxFQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsZ0RBQWdEO1lBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLG1CQUFvQixFQUFFLEVBQUEsQ0FBQzthQUNyRDs7Z0JBRUssSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNoQztJQUNMLENBQUM7Ozs7O0lBRUQseUNBQVU7Ozs7SUFBVixVQUFXLE9BQTBDO1FBQXJELGlCQWlCQztRQWhCRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLE1BQU07Z0JBQ25CLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxFQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsbURBQW1EO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLG1CQUFnQixFQUFFLEVBQUEsQ0FBQzthQUNwRDs7Z0JBRUssT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDNUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7Z0JBckVKLFVBQVU7Ozs7NENBR0YsTUFBTSxTQUFDLDRCQUE0QjtnQkFQbkMsWUFBWTs7SUEwRXJCLDJCQUFDO0NBQUEsQUF0RUQsSUFzRUM7U0FyRVksb0JBQW9COzs7SUFRN0IscUNBQWlEOztJQUNqRCx3Q0FBZ0Q7O0lBQ2hELHdDQUFxRDs7Ozs7SUFQakQsNENBQWtDOzs7OztBQW9FMUMsb0NBR0M7OztJQUZHLDhCQUFhOztJQUNiLGdDQUE2Qjs7Ozs7QUFHakMsd0NBR0M7OztJQUZHLHdDQUFxQjs7SUFDckIsd0NBQXFCOzs7OztBQUd6QixzQ0FHQzs7O0lBRkcseUNBQXdCOztJQUN4Qix5Q0FBdUU7Ozs7O0FBRzNFLDBDQUlDOzs7SUFIRyx3Q0FBNEI7O0lBQzVCLHFDQUE2Qjs7SUFDN0Isd0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5Q29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5leHBvcnQgY29uc3QgRk9STUxZX0RFU0lHTkVSX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdGT1JNTFlfREVTSUdORVJfQ09ORklHX1RPS0VOJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtbHlEZXNpZ25lckNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoRk9STUxZX0RFU0lHTkVSX0NPTkZJR19UT0tFTikgY29uZmlnczogRGVzaWduZXJDb25maWdPcHRpb25bXSA9IFtdLFxuICAgICAgICBwcml2YXRlIGZvcm1seUNvbmZpZzogRm9ybWx5Q29uZmlnXG4gICAgKSB7XG4gICAgICAgIGNvbmZpZ3MuZm9yRWFjaChjb25maWcgPT4gdGhpcy5hZGRDb25maWcoY29uZmlnKSk7XG4gICAgfVxuXG4gICAgdHlwZXM6IHtbbmFtZTogc3RyaW5nXTogRGVzaWduZXJUeXBlT3B0aW9ufSA9IHt9O1xuICAgIHdyYXBwZXJzOiB7W25hbWU6IHN0cmluZ106IERlc2lnbmVyT3B0aW9ufSA9IHt9O1xuICAgIHNldHRpbmdzOiBEZXNpZ25lclNldHRpbmdzID0geyBzaG93Q2xhc3NOYW1lOiB0cnVlIH07XG5cbiAgICBhZGRDb25maWcoY29uZmlnOiBEZXNpZ25lckNvbmZpZ09wdGlvbik6IHZvaWQge1xuICAgICAgICBpZiAoY29uZmlnLnNldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNldHRpbmdzKGNvbmZpZy5zZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy50eXBlcykge1xuICAgICAgICAgICAgdGhpcy5zZXRUeXBlKGNvbmZpZy50eXBlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy53cmFwcGVycykge1xuICAgICAgICAgICAgdGhpcy5zZXRXcmFwcGVyKGNvbmZpZy53cmFwcGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTZXR0aW5ncyhzZXR0aW5nczogRGVzaWduZXJTZXR0aW5ncyk6IHZvaWQge1xuICAgICAgICBpZiAoc2V0dGluZ3Muc2hvd0NsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnNob3dDbGFzc05hbWUgPSAhIXNldHRpbmdzLnNob3dDbGFzc05hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRUeXBlKG9wdGlvbnM6IERlc2lnbmVyVHlwZU9wdGlvbiB8IERlc2lnbmVyVHlwZU9wdGlvbltdKTogdm9pZCB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHlwZShvcHRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBpZiB0eXBlIGlzbid0IHBhcnQgb2YgdGhlIGZvcm1seSBjb25maWdcbiAgICAgICAgICAgIHRoaXMuZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy5uYW1lKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnR5cGVzW29wdGlvbnMubmFtZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVzW29wdGlvbnMubmFtZV0gPSA8RGVzaWduZXJUeXBlT3B0aW9uPnt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy50eXBlc1tvcHRpb25zLm5hbWVdO1xuICAgICAgICAgICAgdHlwZS5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgICAgICAgICAgdHlwZS5maWVsZEFycmF5ID0gISFvcHRpb25zLmZpZWxkQXJyYXk7XG4gICAgICAgICAgICB0eXBlLmZpZWxkR3JvdXAgPSAhIW9wdGlvbnMuZmllbGRHcm91cDtcbiAgICAgICAgICAgIHR5cGUuZmllbGRzID0gb3B0aW9ucy5maWVsZHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRXcmFwcGVyKG9wdGlvbnM6IERlc2lnbmVyT3B0aW9uIHwgRGVzaWduZXJPcHRpb25bXSk6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFdyYXBwZXIob3B0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhyb3cgaWYgd3JhcHBlciBpc24ndCBwYXJ0IG9mIHRoZSBmb3JtbHkgY29uZmlnXG4gICAgICAgICAgICB0aGlzLmZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKG9wdGlvbnMubmFtZSk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy53cmFwcGVyc1tvcHRpb25zLm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyc1tvcHRpb25zLm5hbWVdID0gPERlc2lnbmVyT3B0aW9uPnt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy53cmFwcGVyc1tvcHRpb25zLm5hbWVdO1xuICAgICAgICAgICAgd3JhcHBlci5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgICAgICAgICAgd3JhcHBlci5maWVsZHMgPSBvcHRpb25zLmZpZWxkcztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZXNpZ25lck9wdGlvbiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGZpZWxkcz86IEZvcm1seUZpZWxkQ29uZmlnW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVzaWduZXJUeXBlT3B0aW9uIGV4dGVuZHMgRGVzaWduZXJPcHRpb24ge1xuICAgIGZpZWxkQXJyYXk/OiBib29sZWFuO1xuICAgIGZpZWxkR3JvdXA/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2lnbmVyU2V0dGluZ3Mge1xuICAgIHNob3dDbGFzc05hbWU/OiBib29sZWFuO1xuICAgIGZpbHRlcldyYXBwZXI/OiAod3JhcHBlcjogc3RyaW5nLCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcpID0+IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVzaWduZXJDb25maWdPcHRpb24ge1xuICAgIHNldHRpbmdzPzogRGVzaWduZXJTZXR0aW5ncztcbiAgICB0eXBlcz86IERlc2lnbmVyVHlwZU9wdGlvbltdO1xuICAgIHdyYXBwZXJzPzogRGVzaWduZXJPcHRpb25bXTtcbn1cbiJdfQ==