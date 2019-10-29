/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { decycle } from '../json-helper';
var DecyclePipe = /** @class */ (function () {
    function DecyclePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DecyclePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return decycle(value);
    };
    DecyclePipe.decorators = [
        { type: Pipe, args: [{ name: 'decycle' },] }
    ];
    return DecyclePipe;
}());
export { DecyclePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjeWNsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvZGVjeWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpDO0lBQUE7SUFLQSxDQUFDOzs7OztJQUhHLCtCQUFTOzs7O0lBQVQsVUFBVSxLQUFVO1FBQ2hCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7O2dCQUpKLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7O0lBS3pCLGtCQUFDO0NBQUEsQUFMRCxJQUtDO1NBSlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlY3ljbGUgfSBmcm9tICcuLi9qc29uLWhlbHBlcic7XG5cbkBQaXBlKHsgbmFtZTogJ2RlY3ljbGUnIH0pXG5leHBvcnQgY2xhc3MgRGVjeWNsZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiBkZWN5Y2xlKHZhbHVlKTtcbiAgICB9XG59XG4iXX0=