export function createPrivateMap() {
    const wm = new WeakMap()
    return function(target: object) {
        return {
            get<T = any>(key: string|symbol) {
                if (wm.has(target)) return wm.get(target)[key] as T
                return undefined
            },
            all(): {[k: string|symbol]: unknown} | undefined {
                if (wm.has(target)) return wm.get(target)
                return undefined
            },
            set<T>(key: string|symbol, value: T): T {
                if (!wm.has(target)) wm.set(target, {})
                Object.defineProperty(wm.get(target), key, {
                    value,
                    enumerable: true,
                    configurable: true
                })
                return wm.get(target)[key]
            },
            delete(key: string|symbol) {
                if (wm.has(target)) delete wm.get(target)[key]
            },
            has(key: string|symbol) {
                return wm.has(target) && key in wm.get(target)
            }
        }
    }
}