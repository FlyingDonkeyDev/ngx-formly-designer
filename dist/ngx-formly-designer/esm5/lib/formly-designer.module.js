/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldEditorComponent } from './components/field-editor';
import { FieldPickerComponent } from './components/field-picker';
import { FieldsService } from './fields.service';
import { FormlyConfig, FormlyForm, FormlyModule } from '@ngx-formly/core';
import { FormlyDesignerComponent } from './formly-designer.component';
import { FormlyDesignerConfig, FORMLY_DESIGNER_CONFIG_TOKEN } from './formly-designer-config';
import { config, fieldComponents, wrapperComponents } from './config';
import { TypeSelectComponent } from './components/type-select';
import { WrapperEditorComponent } from './components/wrapper-editor';
import { WrapperSelectComponent } from './components/wrapper-select';
import { WrapperPickerComponent } from './components/wrapper-picker';
import { WrappersPickerComponent } from './components/wrappers-picker';
import { DecyclePipe } from './pipes/decycle';
import 'jquery';
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
export { FormlyDesignerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvZm9ybWx5LWRlc2lnbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsNEJBQTRCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUF3QixvQkFBb0IsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BILE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLFFBQVEsQ0FBQztBQUVoQjtJQWlDSSw4QkFDSSxZQUEwQjtRQUUxQixZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRU0sNEJBQU87Ozs7SUFBZCxVQUFlLGNBQXlDO1FBQXpDLCtCQUFBLEVBQUEsbUJBQXlDO1FBQ3BELE9BQU87WUFDSCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUN0RyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDbkY7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Z0JBL0NKLFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1Ysb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBRXZCLFdBQVc7d0JBRVgsZUFBZTt3QkFDZixpQkFBaUI7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUVuQixZQUFZLENBQUMsUUFBUSxFQUFFO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsdUJBQXVCO3FCQUMxQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Asb0JBQW9CO3dCQUNwQixhQUFhO3FCQUNoQjtvQkFDRCxlQUFlLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBQ2hDOzs7O2dCQTNDUSxZQUFZOztJQTREckIsMkJBQUM7Q0FBQSxBQWhERCxJQWdEQztTQWhCWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmllbGQtZWRpdG9yJztcbmltcG9ydCB7IEZpZWxkUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpZWxkLXBpY2tlcic7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi9maWVsZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcsIEZvcm1seUZvcm0sIEZvcm1seU1vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvcm1seS1kZXNpZ25lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVzaWduZXJDb25maWdPcHRpb24sIEZvcm1seURlc2lnbmVyQ29uZmlnLCBGT1JNTFlfREVTSUdORVJfQ09ORklHX1RPS0VOIH0gZnJvbSAnLi9mb3JtbHktZGVzaWduZXItY29uZmlnJztcbmltcG9ydCB7IGNvbmZpZywgZmllbGRDb21wb25lbnRzLCB3cmFwcGVyQ29tcG9uZW50cyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IFR5cGVTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHlwZS1zZWxlY3QnO1xuaW1wb3J0IHsgV3JhcHBlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93cmFwcGVyLWVkaXRvcic7XG5pbXBvcnQgeyBXcmFwcGVyU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dyYXBwZXItc2VsZWN0JztcbmltcG9ydCB7IFdyYXBwZXJQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3JhcHBlci1waWNrZXInO1xuaW1wb3J0IHsgV3JhcHBlcnNQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3JhcHBlcnMtcGlja2VyJztcbmltcG9ydCB7IERlY3ljbGVQaXBlIH0gZnJvbSAnLi9waXBlcy9kZWN5Y2xlJztcbmltcG9ydCAnanF1ZXJ5JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRmllbGRFZGl0b3JDb21wb25lbnQsXG4gICAgICAgIEZpZWxkUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBGb3JtbHlEZXNpZ25lckNvbXBvbmVudCxcbiAgICAgICAgVHlwZVNlbGVjdENvbXBvbmVudCxcbiAgICAgICAgV3JhcHBlckVkaXRvckNvbXBvbmVudCxcbiAgICAgICAgV3JhcHBlclNlbGVjdENvbXBvbmVudCxcbiAgICAgICAgV3JhcHBlclBpY2tlckNvbXBvbmVudCxcbiAgICAgICAgV3JhcHBlcnNQaWNrZXJDb21wb25lbnQsXG5cbiAgICAgICAgRGVjeWNsZVBpcGUsXG5cbiAgICAgICAgZmllbGRDb21wb25lbnRzLFxuICAgICAgICB3cmFwcGVyQ29tcG9uZW50c1xuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgICAgIEZvcm1seU1vZHVsZS5mb3JDaGlsZCgpXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZvcm1seURlc2lnbmVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRm9ybWx5RGVzaWduZXJDb25maWcsXG4gICAgICAgIEZpZWxkc1NlcnZpY2VcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0Zvcm1seUZvcm1dXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seURlc2lnbmVyTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZm9ybWx5Q29uZmlnOiBGb3JtbHlDb25maWdcbiAgICApIHtcbiAgICAgICAgZm9ybWx5Q29uZmlnLmFkZENvbmZpZyhjb25maWcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmb3JSb290KGRlc2lnbmVyQ29uZmlnOiBEZXNpZ25lckNvbmZpZ09wdGlvbiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogRm9ybWx5RGVzaWduZXJNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIHVzZVZhbHVlOiBbZmllbGRDb21wb25lbnRzLCB3cmFwcGVyQ29tcG9uZW50c10sIG11bHRpOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBGT1JNTFlfREVTSUdORVJfQ09ORklHX1RPS0VOLCB1c2VWYWx1ZTogZGVzaWduZXJDb25maWcsIG11bHRpOiB0cnVlIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=