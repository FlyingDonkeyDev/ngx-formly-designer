/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { cloneDeep, isArray, isObject } from './util';
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
export function decycle(value) {
    if (value == null) {
        return value;
    }
    /** @type {?} */
    var nextId = 1;
    /** @type {?} */
    var objects = new Map();
    return traverse(cloneDeep(value), (/**
     * @param {?} key
     * @param {?} v
     * @return {?}
     */
    function (key, v) {
        if (isObject(v)) {
            if (objects.has(v)) {
                /** @type {?} */
                var id = objects.get(v);
                if (!id) {
                    v.$id = id = nextId++;
                    objects.set(v, id);
                }
                return { $ref: id };
            }
            else {
                objects.set(v, 0);
            }
        }
    }));
}
/**
 * @template T
 * @param {?} obj
 * @param {?} replace
 * @return {?}
 */
function traverse(obj, replace) {
    if (isArray(obj)) {
        for (var i = 0; i < ((/** @type {?} */ (obj))).length; i++) {
            traverseValue.bind(obj, i, obj[i], replace)();
        }
    }
    else if (isObject(obj)) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                traverseValue.bind(obj, key, obj[key], replace)();
            }
        }
    }
    return obj;
}
/**
 * @param {?} key
 * @param {?} value
 * @param {?} replace
 * @return {?}
 */
function traverseValue(key, value, replace) {
    /** @type {?} */
    var replacement = replace(key, value);
    if (replacement === undefined) {
        traverse(value, replace);
    }
    else {
        this[key] = replacement;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2pzb24taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7OztBQUV0RCxNQUFNLFVBQVUsT0FBTyxDQUFJLEtBQVE7SUFDL0IsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ2YsT0FBTyxLQUFLLENBQUM7S0FDaEI7O1FBRUcsTUFBTSxHQUFHLENBQUM7O1FBQ1IsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFlO0lBQ3RDLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Ozs7O0lBQUUsVUFBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7b0JBQ1osRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsRUFBRSxFQUFFO29CQUNMLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDO29CQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyQjtTQUNKO0lBQ0wsQ0FBQyxFQUFDLENBQUM7QUFDUCxDQUFDOzs7Ozs7O0FBRUQsU0FBUyxRQUFRLENBQUksR0FBTSxFQUFFLE9BQTRCO0lBQ3JELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQUEsR0FBRyxFQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ2pEO0tBQ0o7U0FBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN0QixLQUFLLElBQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNuQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUNyRDtTQUNKO0tBQ0o7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLGFBQWEsQ0FBQyxHQUFRLEVBQUUsS0FBVSxFQUFFLE9BQTRCOztRQUMvRCxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7SUFDdkMsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1FBQzNCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDNUI7U0FBTTtRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUM7S0FDM0I7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2xvbmVEZWVwLCBpc0FycmF5LCBpc09iamVjdCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWN5Y2xlPFQ+KHZhbHVlOiBUKTogVCB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGxldCBuZXh0SWQgPSAxO1xuICAgIGNvbnN0IG9iamVjdHMgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuICAgIHJldHVybiB0cmF2ZXJzZShjbG9uZURlZXAodmFsdWUpLCAoa2V5LCB2KSA9PiB7XG4gICAgICAgIGlmIChpc09iamVjdCh2KSkge1xuICAgICAgICAgICAgaWYgKG9iamVjdHMuaGFzKHYpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkID0gb2JqZWN0cy5nZXQodik7XG4gICAgICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgICAgICB2LiRpZCA9IGlkID0gbmV4dElkKys7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHMuc2V0KHYsIGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgJHJlZjogaWQgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0cy5zZXQodiwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdHJhdmVyc2U8VD4ob2JqOiBULCByZXBsYWNlOiAoa2V5LCB2YWx1ZSkgPT4gYW55KTogVCB7XG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChvYmogYXMgYW55KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJhdmVyc2VWYWx1ZS5iaW5kKG9iaiwgaSwgb2JqW2ldLCByZXBsYWNlKSgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc09iamVjdChvYmopKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdHJhdmVyc2VWYWx1ZS5iaW5kKG9iaiwga2V5LCBvYmpba2V5XSwgcmVwbGFjZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiB0cmF2ZXJzZVZhbHVlKGtleTogYW55LCB2YWx1ZTogYW55LCByZXBsYWNlOiAoa2V5LCB2YWx1ZSkgPT4gYW55KTogdm9pZCB7XG4gICAgY29uc3QgcmVwbGFjZW1lbnQgPSByZXBsYWNlKGtleSwgdmFsdWUpO1xuICAgIGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRyYXZlcnNlKHZhbHVlLCByZXBsYWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW2tleV0gPSByZXBsYWNlbWVudDtcbiAgICB9XG59XG4iXX0=