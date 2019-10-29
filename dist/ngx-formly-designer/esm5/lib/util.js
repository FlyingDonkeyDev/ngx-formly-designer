/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
export { cloneDeep, get, set, unset } from 'lodash-es';
/** @type {?} */
var keyPathMemberName = '_formlyDesignerKeyPath';
// Source: https://github.com/formly-js/ngx-formly/blob/master/src/core/src/lib/utils.ts
/**
 * @param {?} field
 * @return {?}
 */
export function getKeyPath(field) {
    var e_1, _a;
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!((/** @type {?} */ (field)))[keyPathMemberName] || ((/** @type {?} */ (field)))[keyPathMemberName].key !== field.key) {
        /** @type {?} */
        var keyPath = [];
        if (field.key) {
            /* Also allow for an array key, hence the type check  */
            /** @type {?} */
            var pathElements = typeof field.key === 'string' ? field.key.split('.') : field.key;
            try {
                for (var pathElements_1 = tslib_1.__values(pathElements), pathElements_1_1 = pathElements_1.next(); !pathElements_1_1.done; pathElements_1_1 = pathElements_1.next()) {
                    var pathElement = pathElements_1_1.value;
                    if (typeof pathElement === 'string') {
                        /* replace paths of the form names[2] by names.2, cfr. angular formly */
                        pathElement = pathElement.replace(/\[(\w+)\]/g, '.$1');
                        keyPath = keyPath.concat(pathElement.split('.'));
                    }
                    else {
                        keyPath.push(pathElement);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (pathElements_1_1 && !pathElements_1_1.done && (_a = pathElements_1.return)) _a.call(pathElements_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            for (var i = 0; i < keyPath.length; i++) {
                /** @type {?} */
                var pathElement = keyPath[i];
                if (typeof pathElement === 'string' && /^\d+$/.test(pathElement)) {
                    keyPath[i] = parseInt(pathElement, 10);
                }
            }
        }
        ((/** @type {?} */ (field)))[keyPathMemberName] = {
            key: field.key,
            path: keyPath,
        };
    }
    return ((/** @type {?} */ (field)))[keyPathMemberName].path.slice();
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function equalType(a, b) {
    return (!a.fieldArray === !b.fieldArray) && (!a.fieldGroup === !b.fieldGroup);
}
/**
 * @param {?} fields
 * @param {?} callback
 * @param {?=} path
 * @param {?=} parent
 * @return {?}
 */
export function traverseFields(fields, callback, path, parent) {
    var e_2, _a;
    path = path || [];
    try {
        for (var fields_1 = tslib_1.__values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
            var field = fields_1_1.value;
            if (callback(field, path, parent)) {
                return true;
            }
            if (field.fieldArray) {
                if (traverseFields([field.fieldArray], callback, path.concat(getKeyPath(field)), field)) {
                    return true;
                }
            }
            else if (field.fieldGroup) {
                if (traverseFields(field.fieldGroup, callback, path.concat(getKeyPath(field)), field)) {
                    return true;
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
// https://stackoverflow.com/a/40294058
// export const cloneDeep = (obj, hash = new WeakMap()): typeof obj => {
//   if (Object(obj) !== obj) return obj; // primitives
//   if (hash.has(obj)) return hash.get(obj); // cyclic reference
//   const result = obj instanceof Date ? new Date(obj)
//     : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
//       : obj.constructor ? new obj.constructor()
//         : Object.create(null);
//   hash.set(obj, result);
//   if (obj instanceof Map)
//     Array.from(obj, ([key, val]) => result.set(key, cloneDeep(val, hash)));
//   return Object.assign(result, ...Object.keys(obj).map(
//     key => ({ [key]: cloneDeep(obj[key], hash) })));
// };
/** @type {?} */
export var isArray = Array.isArray;
// https://stackoverflow.com/a/28953167
/** @type {?} */
export var isEmpty = (/**
 * @param {?} val
 * @return {?}
 */
function (val) {
    if (val === undefined)
        return true;
    else if (typeof (val) === 'function' || typeof (val) === 'number' || typeof (val) === 'boolean'
        || Object.prototype.toString.call(val) === '[object Date]')
        return false;
    else if (val == null || val.length === 0) // null or 0 length array
        return true;
    else if (typeof (val) === 'object') {
        // empty object
        /** @type {?} */
        var r = void 0;
        for (var _1 in val)
            r = false;
        return r;
    }
    return false;
});
/** @type {?} */
export var isFunction = (/**
 * @param {?} val
 * @return {?}
 */
function (val) { return typeof val === 'function'; });
/** @type {?} */
export var isObject = (/**
 * @param {?} val
 * @return {?}
 */
function (val) { return typeof val === 'object' && val != null; });
/** @type {?} */
export var isString = (/**
 * @param {?} val
 * @return {?}
 */
function (val) { return typeof val === 'string' || val instanceof String; });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7O0lBRWpELGlCQUFpQixHQUFHLHdCQUF3Qjs7Ozs7O0FBR2xELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBc0U7O0lBQzdGLHlHQUF5RztJQUN6RyxJQUFJLENBQUMsQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLEVBQUU7O1lBQ25GLE9BQU8sR0FBd0IsRUFBRTtRQUNyQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7OztnQkFFTCxZQUFZLEdBQUcsT0FBTyxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHOztnQkFDckYsS0FBd0IsSUFBQSxpQkFBQSxpQkFBQSxZQUFZLENBQUEsMENBQUEsb0VBQUU7b0JBQWpDLElBQUksV0FBVyx5QkFBQTtvQkFDaEIsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7d0JBQ2pDLHdFQUF3RTt3QkFDeEUsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUN2RCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3BEO3lCQUFNO3dCQUNILE9BQU8sQ0FBQyxJQUFJ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QUksQ0FBQztTQUVYLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTs7O1lBRzVCLENBQUMsU0FBQTtRQUVMLEtBQUssSUFBTSxFQUFDLElBQUksR0FBRztZQUNmLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFZCxPQUFPLENBQUMsQ0FBQztLQUNaO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFBOztBQUVELE1BQU0sS0FBTyxVQUFVOzs7O0FBQUcsVUFBQyxHQUFRLElBQWMsT0FBQSxPQUFPLEdBQUcsS0FBSyxVQUFVLEVBQXpCLENBQXlCLENBQUE7O0FBRTFFLE1BQU0sS0FBTyxRQUFROzs7O0FBQUcsVUFBQyxHQUFRLElBQWMsT0FBQSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxJQUFJLElBQUksRUFBdEMsQ0FBc0MsQ0FBQTs7QUFFckYsTUFBTSxLQUFPLFFBQVE7Ozs7QUFBRyxVQUFDLEdBQVEsSUFBYyxPQUFBLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLFlBQVksTUFBTSxFQUFoRCxDQUFnRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuZXhwb3J0IHsgY2xvbmVEZWVwLCBnZXQsIHNldCwgdW5zZXQgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5jb25zdCBrZXlQYXRoTWVtYmVyTmFtZSA9ICdfZm9ybWx5RGVzaWduZXJLZXlQYXRoJztcblxuLy8gU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL25neC1mb3JtbHkvYmxvYi9tYXN0ZXIvc3JjL2NvcmUvc3JjL2xpYi91dGlscy50c1xuZXhwb3J0IGZ1bmN0aW9uIGdldEtleVBhdGgoZmllbGQ6IHsga2V5Pzogc3RyaW5nIHwgc3RyaW5nW10sIGZpZWxkR3JvdXA/OiBhbnksIGZpZWxkQXJyYXk/OiBhbnkgfSk6IChzdHJpbmcgfCBudW1iZXIpW10ge1xuICAgIC8qIFdlIHN0b3JlIHRoZSBrZXlQYXRoIGluIHRoZSBmaWVsZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy4gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBmcmVxdWVudGx5LiAqL1xuICAgIGlmICghKDxhbnk+ZmllbGQpW2tleVBhdGhNZW1iZXJOYW1lXSB8fCAoPGFueT5maWVsZClba2V5UGF0aE1lbWJlck5hbWVdLmtleSAhPT0gZmllbGQua2V5KSB7XG4gICAgICAgIGxldCBrZXlQYXRoOiAoc3RyaW5nIHwgbnVtYmVyKVtdID0gW107XG4gICAgICAgIGlmIChmaWVsZC5rZXkpIHtcbiAgICAgICAgICAgIC8qIEFsc28gYWxsb3cgZm9yIGFuIGFycmF5IGtleSwgaGVuY2UgdGhlIHR5cGUgY2hlY2sgICovXG4gICAgICAgICAgICBjb25zdCBwYXRoRWxlbWVudHMgPSB0eXBlb2YgZmllbGQua2V5ID09PSAnc3RyaW5nJyA/IGZpZWxkLmtleS5zcGxpdCgnLicpIDogZmllbGQua2V5O1xuICAgICAgICAgICAgZm9yIChsZXQgcGF0aEVsZW1lbnQgb2YgcGF0aEVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXRoRWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLyogcmVwbGFjZSBwYXRocyBvZiB0aGUgZm9ybSBuYW1lc1syXSBieSBuYW1lcy4yLCBjZnIuIGFuZ3VsYXIgZm9ybWx5ICovXG4gICAgICAgICAgICAgICAgICAgIHBhdGhFbGVtZW50ID0gcGF0aEVsZW1lbnQucmVwbGFjZSgvXFxbKFxcdyspXFxdL2csICcuJDEnKTtcbiAgICAgICAgICAgICAgICAgICAga2V5UGF0aCA9IGtleVBhdGguY29uY2F0KHBhdGhFbGVtZW50LnNwbGl0KCcuJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGtleVBhdGgucHVzaChwYXRoRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlQYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aEVsZW1lbnQgPSBrZXlQYXRoW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGF0aEVsZW1lbnQgPT09ICdzdHJpbmcnICYmIC9eXFxkKyQvLnRlc3QocGF0aEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleVBhdGhbaV0gPSBwYXJzZUludChwYXRoRWxlbWVudCwgMTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAoPGFueT5maWVsZClba2V5UGF0aE1lbWJlck5hbWVdID0ge1xuICAgICAgICAgICAga2V5OiBmaWVsZC5rZXksXG4gICAgICAgICAgICBwYXRoOiBrZXlQYXRoLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiAoPGFueT5maWVsZClba2V5UGF0aE1lbWJlck5hbWVdLnBhdGguc2xpY2UoKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxUeXBlKGE6IEZvcm1seUZpZWxkQ29uZmlnLCBiOiBGb3JtbHlGaWVsZENvbmZpZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoIWEuZmllbGRBcnJheSA9PT0gIWIuZmllbGRBcnJheSkgJiYgKCFhLmZpZWxkR3JvdXAgPT09ICFiLmZpZWxkR3JvdXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VGaWVsZHMoZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdLFxuICAgIGNhbGxiYWNrOiAoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBwYXRoPzogKHN0cmluZyB8IG51bWJlcilbXSwgcGFyZW50PzogRm9ybWx5RmllbGRDb25maWcpID0+IGJvb2xlYW4gfCBhbnksXG4gICAgcGF0aD86IChzdHJpbmcgfCBudW1iZXIpW10sXG4gICAgcGFyZW50PzogRm9ybWx5RmllbGRDb25maWcpOiBib29sZWFuIHwgYW55IHtcbiAgICBwYXRoID0gcGF0aCB8fCBbXTtcbiAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZpZWxkcykge1xuICAgICAgICBpZiAoY2FsbGJhY2soZmllbGQsIHBhdGgsIHBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZC5maWVsZEFycmF5KSB7XG4gICAgICAgICAgICBpZiAodHJhdmVyc2VGaWVsZHMoW2ZpZWxkLmZpZWxkQXJyYXldLCBjYWxsYmFjaywgcGF0aC5jb25jYXQoZ2V0S2V5UGF0aChmaWVsZCkpLCBmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICAgICAgICBpZiAodHJhdmVyc2VGaWVsZHMoZmllbGQuZmllbGRHcm91cCwgY2FsbGJhY2ssIHBhdGguY29uY2F0KGdldEtleVBhdGgoZmllbGQpKSwgZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80MDI5NDA1OFxuLy8gZXhwb3J0IGNvbnN0IGNsb25lRGVlcCA9IChvYmosIGhhc2ggPSBuZXcgV2Vha01hcCgpKTogdHlwZW9mIG9iaiA9PiB7XG4vLyAgIGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSByZXR1cm4gb2JqOyAvLyBwcmltaXRpdmVzXG4vLyAgIGlmIChoYXNoLmhhcyhvYmopKSByZXR1cm4gaGFzaC5nZXQob2JqKTsgLy8gY3ljbGljIHJlZmVyZW5jZVxuLy8gICBjb25zdCByZXN1bHQgPSBvYmogaW5zdGFuY2VvZiBEYXRlID8gbmV3IERhdGUob2JqKVxuLy8gICAgIDogb2JqIGluc3RhbmNlb2YgUmVnRXhwID8gbmV3IFJlZ0V4cChvYmouc291cmNlLCBvYmouZmxhZ3MpXG4vLyAgICAgICA6IG9iai5jb25zdHJ1Y3RvciA/IG5ldyBvYmouY29uc3RydWN0b3IoKVxuLy8gICAgICAgICA6IE9iamVjdC5jcmVhdGUobnVsbCk7XG4vLyAgIGhhc2guc2V0KG9iaiwgcmVzdWx0KTtcbi8vICAgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcClcbi8vICAgICBBcnJheS5mcm9tKG9iaiwgKFtrZXksIHZhbF0pID0+IHJlc3VsdC5zZXQoa2V5LCBjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuLy8gICByZXR1cm4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIC4uLk9iamVjdC5rZXlzKG9iaikubWFwKFxuLy8gICAgIGtleSA9PiAoeyBba2V5XTogY2xvbmVEZWVwKG9ialtrZXldLCBoYXNoKSB9KSkpO1xuLy8gfTtcblxuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODk1MzE2N1xuZXhwb3J0IGNvbnN0IGlzRW1wdHkgPSAodmFsOiBhbnkpOiBib29sZWFuID0+IHtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgZWxzZSBpZiAodHlwZW9mICh2YWwpID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiAodmFsKSA9PT0gJ251bWJlcicgfHwgdHlwZW9mICh2YWwpID09PSAnYm9vbGVhbidcbiAgICAgICAgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZWxzZSBpZiAodmFsID09IG51bGwgfHwgdmFsLmxlbmd0aCA9PT0gMCkgICAgICAgIC8vIG51bGwgb3IgMCBsZW5ndGggYXJyYXlcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBlbHNlIGlmICh0eXBlb2YgKHZhbCkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIGVtcHR5IG9iamVjdFxuXG4gICAgICAgIGxldCByO1xuXG4gICAgICAgIGZvciAoY29uc3QgXyBpbiB2YWwpXG4gICAgICAgICAgICByID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb24gPSAodmFsOiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdCA9ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBpc1N0cmluZyA9ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgfHwgdmFsIGluc3RhbmNlb2YgU3RyaW5nO1xuIl19