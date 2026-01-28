import type { AttributeDefinition } from '../../attributes';
import type { AttributeHole } from './AttributeHole';

export class EventHole implements AttributeHole {
    private lastValue?: unknown;

    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {}

    public setValue(value: unknown): void {
        if (value === undefined) return;
        if (this.lastValue === value) return;
        this.lastValue = value;
        const name = this.definition.name.slice(1);
        (this.node as any)[`on${name}`] = value;
    }
}
