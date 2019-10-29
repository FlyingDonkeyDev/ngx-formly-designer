/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { FormlyConfig } from '@ngx-formly/core';
/** @type {?} */
export const FORMLY_DESIGNER_CONFIG_TOKEN = new InjectionToken('FORMLY_DESIGNER_CONFIG_TOKEN');
export class FormlyDesignerConfig {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvZm9ybWx5LWRlc2lnbmVyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQXFCLE1BQU0sa0JBQWtCLENBQUM7O0FBRW5FLE1BQU0sT0FBTyw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBUyw4QkFBOEIsQ0FBQztBQUd0RyxNQUFNLE9BQU8sb0JBQW9COzs7OztJQUM3QixZQUMwQyxVQUFrQyxFQUFFLEVBQ2xFLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBS3RDLFVBQUssR0FBeUMsRUFBRSxDQUFDO1FBQ2pELGFBQVEsR0FBcUMsRUFBRSxDQUFDO1FBQ2hELGFBQVEsR0FBcUIsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFMakQsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztJQUN0RCxDQUFDOzs7OztJQU1ELFNBQVMsQ0FBQyxNQUE0QjtRQUNsQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUNELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLFFBQTBCO1FBQ2xDLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDMUQ7SUFDTCxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxPQUFrRDtRQUN0RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pCLENBQUMsRUFBQyxDQUFDO1NBQ047YUFBTTtZQUNILGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxtQkFBb0IsRUFBRSxFQUFBLENBQUM7YUFDckQ7O2tCQUVLLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDaEM7SUFDTCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxPQUEwQztRQUNqRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLENBQUMsRUFBQyxDQUFDO1NBQ047YUFBTTtZQUNILG1EQUFtRDtZQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxtQkFBZ0IsRUFBRSxFQUFBLENBQUM7YUFDcEQ7O2tCQUVLLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDM0MsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNuQztJQUNMLENBQUM7OztZQXJFSixVQUFVOzs7O3dDQUdGLE1BQU0sU0FBQyw0QkFBNEI7WUFQbkMsWUFBWTs7OztJQWFqQixxQ0FBaUQ7O0lBQ2pELHdDQUFnRDs7SUFDaEQsd0NBQXFEOzs7OztJQVBqRCw0Q0FBa0M7Ozs7O0FBb0UxQyxvQ0FHQzs7O0lBRkcsOEJBQWE7O0lBQ2IsZ0NBQTZCOzs7OztBQUdqQyx3Q0FHQzs7O0lBRkcsd0NBQXFCOztJQUNyQix3Q0FBcUI7Ozs7O0FBR3pCLHNDQUdDOzs7SUFGRyx5Q0FBd0I7O0lBQ3hCLHlDQUF1RTs7Ozs7QUFHM0UsMENBSUM7OztJQUhHLHdDQUE0Qjs7SUFDNUIscUNBQTZCOztJQUM3Qix3Q0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBGT1JNTFlfREVTSUdORVJfQ09ORklHX1RPS0VOID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ0ZPUk1MWV9ERVNJR05FUl9DT05GSUdfVE9LRU4nKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1seURlc2lnbmVyQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChGT1JNTFlfREVTSUdORVJfQ09ORklHX1RPS0VOKSBjb25maWdzOiBEZXNpZ25lckNvbmZpZ09wdGlvbltdID0gW10sXG4gICAgICAgIHByaXZhdGUgZm9ybWx5Q29uZmlnOiBGb3JtbHlDb25maWdcbiAgICApIHtcbiAgICAgICAgY29uZmlncy5mb3JFYWNoKGNvbmZpZyA9PiB0aGlzLmFkZENvbmZpZyhjb25maWcpKTtcbiAgICB9XG5cbiAgICB0eXBlczoge1tuYW1lOiBzdHJpbmddOiBEZXNpZ25lclR5cGVPcHRpb259ID0ge307XG4gICAgd3JhcHBlcnM6IHtbbmFtZTogc3RyaW5nXTogRGVzaWduZXJPcHRpb259ID0ge307XG4gICAgc2V0dGluZ3M6IERlc2lnbmVyU2V0dGluZ3MgPSB7IHNob3dDbGFzc05hbWU6IHRydWUgfTtcblxuICAgIGFkZENvbmZpZyhjb25maWc6IERlc2lnbmVyQ29uZmlnT3B0aW9uKTogdm9pZCB7XG4gICAgICAgIGlmIChjb25maWcuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2V0dGluZ3MoY29uZmlnLnNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLnR5cGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFR5cGUoY29uZmlnLnR5cGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLndyYXBwZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFdyYXBwZXIoY29uZmlnLndyYXBwZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFNldHRpbmdzKHNldHRpbmdzOiBEZXNpZ25lclNldHRpbmdzKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5zaG93Q2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Muc2hvd0NsYXNzTmFtZSA9ICEhc2V0dGluZ3Muc2hvd0NsYXNzTmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFR5cGUob3B0aW9uczogRGVzaWduZXJUeXBlT3B0aW9uIHwgRGVzaWduZXJUeXBlT3B0aW9uW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUeXBlKG9wdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRocm93IGlmIHR5cGUgaXNuJ3QgcGFydCBvZiB0aGUgZm9ybWx5IGNvbmZpZ1xuICAgICAgICAgICAgdGhpcy5mb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLm5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudHlwZXNbb3B0aW9ucy5uYW1lXSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHlwZXNbb3B0aW9ucy5uYW1lXSA9IDxEZXNpZ25lclR5cGVPcHRpb24+e307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLnR5cGVzW29wdGlvbnMubmFtZV07XG4gICAgICAgICAgICB0eXBlLm5hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgICAgICAgICB0eXBlLmZpZWxkQXJyYXkgPSAhIW9wdGlvbnMuZmllbGRBcnJheTtcbiAgICAgICAgICAgIHR5cGUuZmllbGRHcm91cCA9ICEhb3B0aW9ucy5maWVsZEdyb3VwO1xuICAgICAgICAgICAgdHlwZS5maWVsZHMgPSBvcHRpb25zLmZpZWxkcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFdyYXBwZXIob3B0aW9uczogRGVzaWduZXJPcHRpb24gfCBEZXNpZ25lck9wdGlvbltdKTogdm9pZCB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0V3JhcHBlcihvcHRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaHJvdyBpZiB3cmFwcGVyIGlzbid0IHBhcnQgb2YgdGhlIGZvcm1seSBjb25maWdcbiAgICAgICAgICAgIHRoaXMuZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIob3B0aW9ucy5uYW1lKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLndyYXBwZXJzW29wdGlvbnMubmFtZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXJzW29wdGlvbnMubmFtZV0gPSA8RGVzaWduZXJPcHRpb24+e307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXJzW29wdGlvbnMubmFtZV07XG4gICAgICAgICAgICB3cmFwcGVyLm5hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgICAgICAgICB3cmFwcGVyLmZpZWxkcyA9IG9wdGlvbnMuZmllbGRzO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2lnbmVyT3B0aW9uIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZmllbGRzPzogRm9ybWx5RmllbGRDb25maWdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZXNpZ25lclR5cGVPcHRpb24gZXh0ZW5kcyBEZXNpZ25lck9wdGlvbiB7XG4gICAgZmllbGRBcnJheT86IGJvb2xlYW47XG4gICAgZmllbGRHcm91cD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVzaWduZXJTZXR0aW5ncyB7XG4gICAgc2hvd0NsYXNzTmFtZT86IGJvb2xlYW47XG4gICAgZmlsdGVyV3JhcHBlcj86ICh3cmFwcGVyOiBzdHJpbmcsIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykgPT4gYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZXNpZ25lckNvbmZpZ09wdGlvbiB7XG4gICAgc2V0dGluZ3M/OiBEZXNpZ25lclNldHRpbmdzO1xuICAgIHR5cGVzPzogRGVzaWduZXJUeXBlT3B0aW9uW107XG4gICAgd3JhcHBlcnM/OiBEZXNpZ25lck9wdGlvbltdO1xufVxuIl19