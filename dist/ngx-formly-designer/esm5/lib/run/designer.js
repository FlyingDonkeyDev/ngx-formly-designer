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
export { TemplateDesigner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzaWduZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL3J1bi9kZXNpZ25lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFBQTtJQWlCQSxDQUFDOzs7Ozs7SUFoQlcsNkNBQWtCOzs7OztJQUExQixVQUEyQixLQUF3QjtRQUMvQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDakcsQ0FBQzs7Ozs7SUFFRCw4QkFBRzs7OztJQUFILFVBQUksRUFBZ0I7UUFBcEIsaUJBV0M7UUFWRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFDLEtBQXdCO1lBQzdELElBQUksS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQyxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7YUFDcEU7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSTs7OztRQUFDLFVBQUMsS0FBd0I7WUFDOUQsSUFBSSxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hDLE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seUNvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVEZXNpZ25lciB7XG4gICAgcHJpdmF0ZSBpc05vbkRlc2lnbmVyRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmaWVsZCAmJiAoIWZpZWxkLnRlbXBsYXRlT3B0aW9ucyB8fCBmaWVsZC50ZW1wbGF0ZU9wdGlvbnNbJyRkZXNpZ25lckZpZWxkJ10gIT09IHRydWUpO1xuICAgIH1cblxuICAgIHJ1bihmYzogRm9ybWx5Q29uZmlnKSB7XG4gICAgICAgIGZjLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIucHVzaCgoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc05vbkRlc2lnbmVyRmllbGQoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkLmZpZWxkR3JvdXAgPyAnZmllbGRHcm91cERlc2lnbmVyJyA6ICdmaWVsZERlc2lnbmVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZjLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnBvc3RXcmFwcGVyLnB1c2goKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb25EZXNpZ25lckZpZWxkKGZpZWxkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnZGVzaWduZXInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=