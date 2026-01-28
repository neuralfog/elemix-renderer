import type { AttributeDefinition } from '../../attributes';
import { mergeClasses } from '../../utils';
import type { AttributeHole } from './AttributeHole';

export class DirectClassHole implements AttributeHole {
    private initialClass: string;
    private lastClass?: string;

    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {
        this.initialClass = node.getAttribute('class') || '';
    }

    public setValue(value: unknown): void {
        const { node } = this;

        if (value === undefined || value === null) {
            if (this.initialClass.length) {
                if (this.lastClass !== this.initialClass) {
                    this.lastClass = this.initialClass;
                    node.setAttribute('class', String(this.initialClass));
                }
            }
        }

        if (typeof value === 'string') {
            const next = mergeClasses(this.initialClass, String(value));
            if (this.lastClass !== next) {
                this.lastClass = next;
                node.setAttribute('class', next);
            }
        }

        if (typeof value === 'object') {
            const val = value as Record<string, boolean>;
            const classesFromObject = Object.entries(val)
                .filter(([, flag]) => Boolean(flag))
                .map(([classNames]) => classNames)
                .join(' ');

            const next = mergeClasses(this.initialClass, classesFromObject);
            if (this.lastClass !== next) {
                this.lastClass = next;
                node.setAttribute('class', next);
            }
        }
    }
}
