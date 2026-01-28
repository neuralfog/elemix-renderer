import type { AttributeDefinition } from '../../attributes';
import type { AttributeHole } from './AttributeHole';

export class BindEventsHole implements AttributeHole {
    private lastHandlers = new Map<string, unknown>();

    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {}

    public setValue(value: unknown): void {
        if (value === undefined || value === null) return;
        if (typeof value !== 'object') return;

        for (const [attrName, attrValue] of Object.entries(value)) {
            const prev = this.lastHandlers.get(attrName);
            if (prev === attrValue) continue;
            this.lastHandlers.set(attrName, attrValue);
            (this.node as any)[`on${attrName}`] = attrValue;
        }
    }
}
