import type { HtmlTemplate } from './HtmlTemplate';

export const repeat = <T extends Record<string | symbol, unknown>>(
    list: T[],
    key: (val: T, index: number) => string,
    callback: (val: T, index: number) => HtmlTemplate,
): HtmlTemplate[] => {
    return list.map((item, index) => {
        const template = callback(item, index);
        template.key = key(item, index);
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
