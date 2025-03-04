import type { AttributeDefinition } from '../../attributes';
import type { AttributeHole } from './AttributeHole';

export class RefHole implements AttributeHole {
    constructor(
        public node: HTMLElement,
        public definition: AttributeDefinition,
    ) {}

    public setValue(value: { value?: unknown }): void {
        value.value = this.node;
    }
}
