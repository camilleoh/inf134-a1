import { Window, Widget, RoleType, Circle, Text } from "../core/ui";
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";

class RadioButton extends Widget {
    private circle: Circle;
    private labelText: Text;
    private defaultWidth: number = 20;
    private defaultHeight: number = 20;
    private _isSelected: boolean = false;
    private x: number = 0;
    private y: number = 0;

    public label: string = "";
    public onSelect?: (label: string) => void;

    constructor(parent: Window) {
        super(parent);
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this.role = RoleType.none;
        this.setState(new IdleUpWidgetState());
        this.render();
        this.deselect();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Radio circle
        this.circle = this._group.circle(this.width)
            .fill('#D8D8F6')
            .stroke({ width: 2, color: '#000' })
            .move(0, 0);

        // Label text
        this.labelText = this._group.text(this.label || "")
            .font({ size: 14 })
            .fill('#000')
            .move(this.width + 8, 2); // space to the right of the circle

        this._group.move(this.x, this.y);
        this.registerEvent(this.outerSvg);
        this.update();
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        if (this._group) {
            this._group.move(x, y);
        }
    }

    select(): void {
        this._isSelected = true;
        this.update();
    }

    deselect(): void {
        this._isSelected = false;
        this.update();
    }

    toggle(): void {
        this._isSelected = !this._isSelected;
        this.update();
        if (this._isSelected && this.onSelect) {
            this.onSelect(this.label);
        }
    }

    update(): void {
        this.circle.fill(this._isSelected ? '#B18FCF' : '#D8D8F6');
        if (this.labelText) {
            this.labelText.text(this.label || "");
        }
    }

    pressReleaseState(): void {
        this.toggle();
    }

    // unused states (can remain unimplemented for now)
    idleupState(): void {
        this.circle.fill(this._isSelected ? '#B18FCF' : '#D8D8F6');
    }
    
    idledownState(): void {
        this.circle.fill('#C7B2D9'); // Slightly darker shade for visual feedback
    }
    
    pressedState(): void {
        this.circle.fill('#A984C8'); // A bit deeper tone when actively pressing
    }
    
    hoverState(): void {
        this.circle.fill(this._isSelected ? '#C29EDC' : '#E3DBF2'); // Gentle hover color
    }
    
    hoverPressedState(): void {
        this.circle.fill('#9F6EC2'); // For hover + pressed state
    }
    
    pressedoutState(): void {
        this.circle.fill(this._isSelected ? '#B18FCF' : '#D8D8F6'); // Revert to previous
    }
    
    moveState(): void {
        // Optional visual if you're showing feedback during pointer movement
        this.circle.fill('#D0C0E8');
    }
    
    keyupState(): void {
        this.toggle(); // Allow keyboard interaction
    }
    
}

export { RadioButton };
