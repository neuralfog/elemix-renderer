import type { AttributeDefinition } from '../../attributes';
import { camelToKebab, mergeClasses } from '../../utils';
import type { AttributeHole } from './AttributeHole';

export class BindAttrsHole implements AttributeHole {
    private initialClass: string;

    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {
        this.initialClass = node.getAttribute('class') || '';
    }

    public setValue(value: unknown): void {
        if (value === undefined) return;
        if (typeof value !== 'object') return;

        const { node } = this;
        const attributes = value as Record<string, unknown>;

        for (const [attrName, attrValue] of Object.entries(attributes)) {
            const name = camelToKebab(attrName);

            if (
                attrValue === undefined ||
                attrValue === null ||
                attrValue === false
            ) {
                node.removeAttribute(name);
                if (this.initialClass.length) {
                    node.setAttribute('class', String(this.initialClass));
                }
                continue;
            }

            if (name === 'class') {
                node.setAttribute(
                    'class',
                    mergeClasses(this.initialClass, String(attrValue)),
                );
                continue;
            }

            node.setAttribute(name, String(attrValue));
        }
    }
}
