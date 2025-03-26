import type { AttributeDefinition } from '../../attributes';
import type { AttributeHole } from './AttributeHole';

export class BindEventsHole implements AttributeHole {
    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {}

    public setValue(value: unknown): void {
        if (value === undefined || value === null) return;
        if (typeof value !== 'object') return;

        for (const [attrName, attrValue] of Object.entries(value)) {
            (this.node as any)[`on${attrName}`] = attrValue;
        }
    }
}
