import type { AttributeDefinition } from '../../attributes';
import { camelToKebab, mergeClasses } from '../../utils';
import type { AttributeHole } from './AttributeHole';

export class BindAttrsHole implements AttributeHole {
    private initialClass: string;
    private lastClass?: string;

    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {
        this.initialClass = node.getAttribute('class') || '';
    }

    public setValue(value: unknown): void {
        if (value === undefined || value === null) return;
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
                if (node.hasAttribute(name)) {
                    node.removeAttribute(name);
                }
                if (
                    this.initialClass.length &&
                    this.lastClass !== this.initialClass
                ) {
                    this.lastClass = this.initialClass;
                    node.setAttribute('class', String(this.initialClass));
                }
                continue;
            }

            if (name === 'class') {
                const next = mergeClasses(
                    this.initialClass,
                    String(attrValue),
                );
                if (this.lastClass !== next) {
                    this.lastClass = next;
                    node.setAttribute('class', next);
                }
                continue;
            }

            const nextValue = String(attrValue);
            if (node.getAttribute(name) !== nextValue) {
                node.setAttribute(name, nextValue);
            }
        }
    }
}
