// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";


class Checkbox extends Widget {
    private isChecked: boolean = false;
    private box: Rect;
    private checkmark: Text;
    private x: number = 0;
    private y: number = 0;


    constructor(parent: Window) {
        super(parent);
        this.width = 20;
        this.height = 20;
        this.role = RoleType.none;
        this.render();
        this.setState(new IdleUpWidgetState());
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        this.box = this._group.rect(this.width, this.height)
            .fill(this.backcolor || '#fff')
            .stroke({ width: 2, color: '#000' });

        this.checkmark = this._group.text('✓')
            .move(2, -2)
            .font({ size: 18 })
            .fill(this.forecolor || '#000')
            .hide(); // Hidden by default
        
        const checkSize = 18; // same as font size
        const offsetX = (this.width - checkSize) / 2;
        const offsetY = (this.height - checkSize) / 2;
        this.checkmark.move(offsetX, offsetY);

        this.registerEvent(this._group);
        this.update();

        this._group.move(this.x, this.y);
    }

    pressReleaseState(): void {
        this.toggle();
        this.update();
    }

    toggle(): void {
        this.isChecked = !this.isChecked;
        if (this.isChecked) {
            this.checkmark.show();
        } else {
            this.checkmark.hide();
        }
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        if (this._group) {
            this._group.move(this.x, this.y);
        }
    }
    


    idleupState(): void {
        throw new Error("Method not implemented.");
     }
    idledownState(): void {
        throw new Error("Method not implemented.");
     }
    pressedState(): void {
        throw new Error("Method not implemented.");
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

export {Checkbox}
