import { Window, Widget, RoleType } from "../core/ui";
import { Rect } from "../core/ui";
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";

class ScrollBar extends Widget {
    private track: Rect;
    private thumb: Rect;
    private thumbHeight: number = 30;
    private dragging: boolean = false;
    private dragOffsetY: number = 0;
    private _offsetY: number = 0;

    constructor(parent: Window) {
        super(parent);
        this.height = 100;
        this.width = 20;
        this.role = RoleType.scrollbar;
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;
    
        // Track
        this.track = this._group.rect(this.width, this.height).fill('#ccc');
    
        // Thumb
        this.thumb = this._group.rect(this.width, this.thumbHeight).fill('#888').move(0, 0);
    
        this.registerEvent(this.thumb);
    
        // Mouse down on thumb
        this.thumb.on('mousedown', (event: MouseEvent) => {
            this.dragging = true;
    
            const thumbRect = this.thumb.node.getBoundingClientRect();
            this.dragOffsetY = event.clientY - thumbRect.top;
        });
    
        // Mouse move
        document.addEventListener('mousemove', (event: MouseEvent) => {
            document.addEventListener('mousemove', (event: MouseEvent) => {
                if (this.dragging) {
                    const windowTop = (this.parent as Window).window.node.getBoundingClientRect().top;
                    const mouseY = event.clientY - windowTop;
                    let newY = mouseY - this.dragOffsetY - this._offsetY;
                
                    // Clamp
                    newY = Math.max(0, Math.min(newY, this.height - this.thumbHeight));
                    
                    // Move the thumb
                    this.thumb.move(0, newY);  // Adjust the thumb's Y position relative to the group
                }
            });
            
        });
    
        // Mouse up
        document.addEventListener('mouseup', () => {
            this.dragging = false;
        });
    }

    move(x: number, y: number): void {
        super.move(x, y);
        this._group.move(x, y);  // move the actual SVG group
        this._offsetY = y;       // store the Y offset
    }

    get scrollPosition(): number {
        return (this.thumb.y() as  number) / (this.height - this.thumbHeight);
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
    pressReleaseState(): void {
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

export { ScrollBar };
