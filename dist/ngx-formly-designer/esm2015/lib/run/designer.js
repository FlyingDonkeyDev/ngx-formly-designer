/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class TemplateDesigner {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzaWduZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL3J1bi9kZXNpZ25lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7O0lBQ2pCLGtCQUFrQixDQUFDLEtBQXdCO1FBQy9DLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNqRyxDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxFQUFnQjtRQUNoQixFQUFFLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLEtBQXdCLEVBQUUsRUFBRTtZQUNqRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO2FBQ3BFO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLEtBQXdCLEVBQUUsRUFBRTtZQUNsRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxVQUFVLENBQUM7YUFDckI7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlRGVzaWduZXIge1xuICAgIHByaXZhdGUgaXNOb25EZXNpZ25lckZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmllbGQgJiYgKCFmaWVsZC50ZW1wbGF0ZU9wdGlvbnMgfHwgZmllbGQudGVtcGxhdGVPcHRpb25zWyckZGVzaWduZXJGaWVsZCddICE9PSB0cnVlKTtcbiAgICB9XG5cbiAgICBydW4oZmM6IEZvcm1seUNvbmZpZykge1xuICAgICAgICBmYy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLnB1c2goKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNOb25EZXNpZ25lckZpZWxkKGZpZWxkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZC5maWVsZEdyb3VwID8gJ2ZpZWxkR3JvdXBEZXNpZ25lcicgOiAnZmllbGREZXNpZ25lcic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmYy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wb3N0V3JhcHBlci5wdXNoKChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTm9uRGVzaWduZXJGaWVsZChmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Rlc2lnbmVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19