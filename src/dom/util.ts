// FP

export const call = <T>(cb: () => T): T => cb();

export const forEach = <
  T extends Record<"forEach", (...item: readonly any[]) => any>,
>(
  iterable: T | null | undefined,
  cb: T extends Record<"forEach", (cb: infer Cb) => void> ? Cb : never,
): void => iterable?.forEach(cb);

export const reverseForOf = <T>(
  iterable: Iterable<T>,
  cb: (item: T) => unknown,
): void => {
  let arr = [...iterable], i = arr.length - 1;
  for (; i >= 0; i--) cb(arr[i]);
};

export const isFunction = <T extends Function>(v: unknown): v is T =>
  typeof v == "function";

export const { entries } = Object;

// DOM

export const dispatchPrevented = (el: EventTarget, event: Event) => (
  el.dispatchEvent(event), event.defaultPrevented
);

export const customEvent = <T>(
  type: string,
  detail?: T,
  opts?: CustomEventInit<T>,
) =>
  new CustomEvent(type, { bubbles: true, cancelable: true, detail, ...opts });

export const newURL = (url: string | URL, base?: string | URL | undefined) =>
  new URL(url, base);

export const preventDefault = (e: Event) => e.preventDefault();

type ListenerOfAddEvent<K extends string, T extends EventTarget> = (
  this: T,
  e: T extends Window ? K extends keyof WindowEventMap ? WindowEventMap[K]
    : Event
    : K extends keyof HTMLElementEventMap ? HTMLElementEventMap[K]
    : Event,
) => void;

export const stopPropagation = (e: Event) => e.stopPropagation();

export const subEvent = <
  K extends string,
  T extends EventTarget,
>(
  target: T,
  type: K,
  listener: ListenerOfAddEvent<K, T>,
  stopPropag?: 1 | 0 | boolean,
) => {
  let wrappedListener = (stopPropag
    ? (function (e) {
      stopPropagation(e);
      listener.call(this, e);
    } as typeof listener)
    : listener) as EventListener;
  target.addEventListener(type, wrappedListener);
  return () => target.removeEventListener(type, wrappedListener);
};
