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
    public onToggle?: (checked: boolean) => void;
    private _labelText: Text;
    private _label: string = "Check me";


    constructor(parent: Window) {
        super(parent);
        this.width = 20;
        this.height = 20;
        this.role = RoleType.none;
        this.setState(new IdleUpWidgetState());
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        this.box = this._group.rect(this.width, this.height)
            .fill(this.backcolor || '#D8D8F6')
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

        this._group.move(this.x, this.y);

        this._labelText = this._group.text(this._label);
        this._labelText
            .font({ size: 16 })
            .fill('#000')
            .x(this.width + 10)  // position label to the right of the box
            .y((this.height - this._labelText.bbox().height) / 2); // vertical centering  
        this.update();  
    }

    pressReleaseState(): void {
        this.toggle();
        this.update();

        if (this.onToggle) {
            this.onToggle(this.isChecked);
        }
    }

    set label(value: string) {
        this._label = value;
        if (this._labelText) {
            this._labelText.text(this._label);
        }
    }
    
    get label(): string {
        return this._label;
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
        this.box.fill('#D8D8F6');
     }
    idledownState(): void {
        this.box.fill('#B18FCF');
     }
    pressedState(): void {
        this.box.fill('#B18FCF');
     }
    hoverState(): void {
        this.box.fill('#B18FCF');
     }

    hoverPressedState(): void {
        this.box.fill('#9E73C3');
    }
    
    pressedoutState(): void {
        this.box.fill('#D8D8F6');
    }
    
    moveState(): void {
        this.box.fill('#BCA3D4');
    }
    
    keyupState(): void {
        this.toggle();
        this.update();
    
        if (this.onToggle) {
            this.onToggle(this.isChecked);
        }
    }
    
}

export {Checkbox}
