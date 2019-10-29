import { ModuleWithProviders } from '@angular/core';
import { FormlyConfig } from '@ngx-formly/core';
import { DesignerConfigOption } from './formly-designer-config';
import 'jquery';
export declare class FormlyDesignerModule {
    constructor(formlyConfig: FormlyConfig);
    static forRoot(designerConfig?: DesignerConfigOption): ModuleWithProviders;
}
