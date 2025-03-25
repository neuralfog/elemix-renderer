import type { AttributeDefinition } from '../../attributes';
import { mergeClasses } from '../../utils';
import type { AttributeHole } from './AttributeHole';

export class DirectClassHole implements AttributeHole {
    private initialClass: string;

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
                node.setAttribute('class', String(this.initialClass));
            }
        }

        if (typeof value === 'string') {
            node.setAttribute(
                'class',
                mergeClasses(this.initialClass, String(value)),
            );
        }

        if (typeof value === 'object') {
            const val = value as Record<string, boolean>;
            const classesFromObject = Object.entries(val)
                .filter(([, flag]) => Boolean(flag))
                .map(([classNames]) => classNames)
                .join(' ');

            node.setAttribute(
                'class',
                mergeClasses(this.initialClass, classesFromObject),
            );
        }
    }
}
