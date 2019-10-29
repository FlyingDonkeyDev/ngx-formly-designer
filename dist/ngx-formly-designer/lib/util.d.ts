import { FormlyFieldConfig } from '@ngx-formly/core';
export { cloneDeep, get, set, unset } from 'lodash-es';
export declare function getKeyPath(field: {
    key?: string | string[];
    fieldGroup?: any;
    fieldArray?: any;
}): (string | number)[];
export declare function equalType(a: FormlyFieldConfig, b: FormlyFieldConfig): boolean;
export declare function traverseFields(fields: FormlyFieldConfig[], callback: (field: FormlyFieldConfig, path?: (string | number)[], parent?: FormlyFieldConfig) => boolean | any, path?: (string | number)[], parent?: FormlyFieldConfig): boolean | any;
export declare const isArray: (arg: any) => arg is any[];
export declare const isEmpty: (val: any) => boolean;
export declare const isFunction: (val: any) => boolean;
export declare const isObject: (val: any) => boolean;
export declare const isString: (val: any) => boolean;
