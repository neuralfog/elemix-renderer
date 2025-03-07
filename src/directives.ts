import type { HtmlTemplate } from './HtmlTemplate';

export const repeat = <T = unknown>(
    list: T[],
    callback: (val: T, index: number) => HtmlTemplate,
    key?: (val: T, index: number) => string,
): HtmlTemplate[] => {
    return list.map((item, index) => {
        const template = callback(item, index);
        template.key = key?.(item, index) || String(index);
        return template;
    });
};

export const condition = (
    condition: boolean | (() => boolean),
    trueTemplate: HtmlTemplate,
    falseTemplate: HtmlTemplate,
): HtmlTemplate => {
    const result = typeof condition === 'function' ? condition() : condition;
    return result ? trueTemplate : falseTemplate;
};
