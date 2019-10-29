import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
export declare class TypeSelectComponent implements AfterViewInit, ControlValueAccessor, OnDestroy, OnInit {
    private formlyDesignerConfig;
    private valueChangesSubscription;
    formControl: FormControl;
    types: string[];
    constructor(formlyDesignerConfig: FormlyDesignerConfig);
    protected onChange: (value: any) => void;
    protected onTouched: () => void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
}
