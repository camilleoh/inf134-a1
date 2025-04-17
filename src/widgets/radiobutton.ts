import { Window, Widget, RoleType } from "../core/ui";
import { Circle } from "../core/ui";
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";

class RadioButton extends Widget {
    private circle: Circle;
    private defaultWidth: number = 20;
    private defaultHeight: number = 20;
    private _isSelected: boolean = false;

    constructor(parent: Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        // set Aria role
        this.role = RoleType.none;
        // set initial state
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Single circle for the radio button
        this.circle = this._group.circle(this.width)
            .fill('#D8D8F6') // default color
            .stroke({ width: 2, color: '#000' })
            .move(0, 0); // positioned at (0, 0)

        this.registerEvent(this.outerSvg);
        this.update();
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
    }

    update(): void {
        if (this._isSelected) {
            this.circle.fill('#3B3BFF'); // change to selected color (blue in this case)
        } else {
            this.circle.fill('#D8D8F6'); // revert to default color
        }
    }

    //TODO: Implement the state methods to manage the visual appearance in different states
    idleupState(): void {
        throw new Error("Method not implemented.");
    }
    idledownState(): void {
        throw new Error("Method not implemented.");
    }
    pressedState(): void {
        throw new Error("Method not implemented.");
    }
    pressReleaseState(): void {
        this.toggle();
    }
    hoverState(): void {
        throw new Error("Method not implemented.");
    }
    hoverPressedState(): void {
        throw new Error("Method not implemented.");
    }
    pressedoutState(): void {
        throw new Error("Method not implemented.");
    }
    moveState(): void {
        throw new Error("Method not implemented.");
    }
    keyupState(): void {
        throw new Error("Method not implemented.");
    }
}

export { RadioButton };
