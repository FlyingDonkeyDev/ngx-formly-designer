/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormlyDesignerWrapperComponent } from './wrappers/designer';
import { FormlyDesignerFieldWrapperComponent } from './wrappers/field-designer';
import { FormlyDesignerFieldGroupWrapperComponent } from './wrappers/field-group-designer';
import { TemplateDesigner } from './run/designer';
/** @type {?} */
export const fieldComponents = [];
/** @type {?} */
export const wrapperComponents = [
    FormlyDesignerWrapperComponent,
    FormlyDesignerFieldWrapperComponent,
    FormlyDesignerFieldGroupWrapperComponent
];
/** @type {?} */
export const config = {
    wrappers: [
        { name: 'designer', component: FormlyDesignerWrapperComponent },
        { name: 'fieldDesigner', component: FormlyDesignerFieldWrapperComponent },
        { name: 'fieldGroupDesigner', component: FormlyDesignerFieldGroupWrapperComponent }
    ],
    manipulators: [
        { class: TemplateDesigner, method: 'run' }
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZvcm1seS1kZXNpZ25lci8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUVsRCxNQUFNLE9BQU8sZUFBZSxHQUFHLEVBQUU7O0FBRWpDLE1BQU0sT0FBTyxpQkFBaUIsR0FBRztJQUM3Qiw4QkFBOEI7SUFDOUIsbUNBQW1DO0lBQ25DLHdDQUF3QztDQUMzQzs7QUFFRCxNQUFNLE9BQU8sTUFBTSxHQUFpQjtJQUNoQyxRQUFRLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLDhCQUE4QixFQUFFO1FBQy9ELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsbUNBQW1DLEVBQUU7UUFDekUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLHdDQUF3QyxFQUFFO0tBQ3RGO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtLQUM3QztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnT3B0aW9uIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lcldyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3dyYXBwZXJzL2Rlc2lnbmVyJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyRmllbGRXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi93cmFwcGVycy9maWVsZC1kZXNpZ25lcic7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lckZpZWxkR3JvdXBXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi93cmFwcGVycy9maWVsZC1ncm91cC1kZXNpZ25lcic7XG5pbXBvcnQgeyBUZW1wbGF0ZURlc2lnbmVyIH0gZnJvbSAnLi9ydW4vZGVzaWduZXInO1xuXG5leHBvcnQgY29uc3QgZmllbGRDb21wb25lbnRzID0gW107XG5cbmV4cG9ydCBjb25zdCB3cmFwcGVyQ29tcG9uZW50cyA9IFtcbiAgICBGb3JtbHlEZXNpZ25lcldyYXBwZXJDb21wb25lbnQsXG4gICAgRm9ybWx5RGVzaWduZXJGaWVsZFdyYXBwZXJDb21wb25lbnQsXG4gICAgRm9ybWx5RGVzaWduZXJGaWVsZEdyb3VwV3JhcHBlckNvbXBvbmVudFxuXTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29uZmlnT3B0aW9uID0ge1xuICAgIHdyYXBwZXJzOiBbXG4gICAgICAgIHsgbmFtZTogJ2Rlc2lnbmVyJywgY29tcG9uZW50OiBGb3JtbHlEZXNpZ25lcldyYXBwZXJDb21wb25lbnQgfSxcbiAgICAgICAgeyBuYW1lOiAnZmllbGREZXNpZ25lcicsIGNvbXBvbmVudDogRm9ybWx5RGVzaWduZXJGaWVsZFdyYXBwZXJDb21wb25lbnQgfSxcbiAgICAgICAgeyBuYW1lOiAnZmllbGRHcm91cERlc2lnbmVyJywgY29tcG9uZW50OiBGb3JtbHlEZXNpZ25lckZpZWxkR3JvdXBXcmFwcGVyQ29tcG9uZW50IH1cbiAgICBdLFxuICAgIG1hbmlwdWxhdG9yczogW1xuICAgICAgICB7IGNsYXNzOiBUZW1wbGF0ZURlc2lnbmVyLCBtZXRob2Q6ICdydW4nIH1cbiAgICBdXG59O1xuIl19