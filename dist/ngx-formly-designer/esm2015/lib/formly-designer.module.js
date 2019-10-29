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
export class FormlyDesignerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvZm9ybWx5LWRlc2lnbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsNEJBQTRCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUF3QixvQkFBb0IsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BILE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLFFBQVEsQ0FBQztBQWtDaEIsTUFBTSxPQUFPLG9CQUFvQjs7OztJQUM3QixZQUNJLFlBQTBCO1FBRTFCLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUF1QyxFQUFFO1FBQ3BELE9BQU87WUFDSCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUN0RyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDbkY7U0FDSixDQUFDO0lBQ04sQ0FBQzs7O1lBL0NKLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1Ysb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBRXZCLFdBQVc7b0JBRVgsZUFBZTtvQkFDZixpQkFBaUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUVuQixZQUFZLENBQUMsUUFBUSxFQUFFO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsdUJBQXVCO2lCQUMxQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1Asb0JBQW9CO29CQUNwQixhQUFhO2lCQUNoQjtnQkFDRCxlQUFlLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDaEM7Ozs7WUEzQ1EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWVsZC1lZGl0b3InO1xuaW1wb3J0IHsgRmllbGRQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmllbGQtcGlja2VyJztcbmltcG9ydCB7IEZpZWxkc1NlcnZpY2UgfSBmcm9tICcuL2ZpZWxkcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZywgRm9ybWx5Rm9ybSwgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lckNvbXBvbmVudCB9IGZyb20gJy4vZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZXNpZ25lckNvbmZpZ09wdGlvbiwgRm9ybWx5RGVzaWduZXJDb25maWcsIEZPUk1MWV9ERVNJR05FUl9DT05GSUdfVE9LRU4gfSBmcm9tICcuL2Zvcm1seS1kZXNpZ25lci1jb25maWcnO1xuaW1wb3J0IHsgY29uZmlnLCBmaWVsZENvbXBvbmVudHMsIHdyYXBwZXJDb21wb25lbnRzIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgVHlwZVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90eXBlLXNlbGVjdCc7XG5pbXBvcnQgeyBXcmFwcGVyRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dyYXBwZXItZWRpdG9yJztcbmltcG9ydCB7IFdyYXBwZXJTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3JhcHBlci1zZWxlY3QnO1xuaW1wb3J0IHsgV3JhcHBlclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93cmFwcGVyLXBpY2tlcic7XG5pbXBvcnQgeyBXcmFwcGVyc1BpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93cmFwcGVycy1waWNrZXInO1xuaW1wb3J0IHsgRGVjeWNsZVBpcGUgfSBmcm9tICcuL3BpcGVzL2RlY3ljbGUnO1xuaW1wb3J0ICdqcXVlcnknO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGaWVsZEVkaXRvckNvbXBvbmVudCxcbiAgICAgICAgRmllbGRQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIEZvcm1seURlc2lnbmVyQ29tcG9uZW50LFxuICAgICAgICBUeXBlU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBXcmFwcGVyRWRpdG9yQ29tcG9uZW50LFxuICAgICAgICBXcmFwcGVyU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBXcmFwcGVyUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBXcmFwcGVyc1BpY2tlckNvbXBvbmVudCxcblxuICAgICAgICBEZWN5Y2xlUGlwZSxcblxuICAgICAgICBmaWVsZENvbXBvbmVudHMsXG4gICAgICAgIHdyYXBwZXJDb21wb25lbnRzXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cbiAgICAgICAgRm9ybWx5TW9kdWxlLmZvckNoaWxkKClcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRm9ybWx5RGVzaWduZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBGb3JtbHlEZXNpZ25lckNvbmZpZyxcbiAgICAgICAgRmllbGRzU2VydmljZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbRm9ybWx5Rm9ybV1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RGVzaWduZXJNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZ1xuICAgICkge1xuICAgICAgICBmb3JtbHlDb25maWcuYWRkQ29uZmlnKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZvclJvb3QoZGVzaWduZXJDb25maWc6IERlc2lnbmVyQ29uZmlnT3B0aW9uID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBGb3JtbHlEZXNpZ25lck1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IFtmaWVsZENvbXBvbmVudHMsIHdyYXBwZXJDb21wb25lbnRzXSwgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEZPUk1MWV9ERVNJR05FUl9DT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBkZXNpZ25lckNvbmZpZywgbXVsdGk6IHRydWUgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==