// importing local code, code we have written
import {Window, Widget, RoleType, IdleUpWidgetState, PressedWidgetState} from "../core/ui";
// importing code from SVG.js library
import {Rect} from "../core/ui";

class ScrollBar extends Widget{
    private _rect: Rect;
    private upButton: Rect;
    private downButton: Rect;
    private thumb: Rect;

    private defaultWidth: number = 20;
    private defaultHeight: number = 200;
    private scrollStep: number = 10;

    private _moveCallback: (direction: string) => void;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        // set Aria role
        this.role = RoleType.none;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState())

        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        // Set the outer svg element 
        this.outerSvg = this._group;
        
        // scroll track appearance 
        this._rect = this._group.rect(this.width, this.height).fill('#D9D9D9');

        // up button 
        const btnHeight = 20; 
        this.upButton = this._group.rect(this.width, btnHeight)
                                .fill('green')
                                .stroke({color: 'black'})
        this.downButton = this._group.rect(this.width, btnHeight)
                                .fill('green')
                                .stroke({color: 'black'})
                                .move(0, this.height - btnHeight)

        this._group.polygon("15,5 25,15 5,15")
                    .fill("white")
                    .center(this.width / 2, btnHeight / 2); 

        this._group.polygon("5,5 25,5 15,15")
                    .fill("white")
                    .center(this.width / 2, this.height - btnHeight / 2); 
                    
        // Scroll Thumb
        this.thumb = this._group.rect(this.width, 30)
                    .fill("#A7C7E7")
                    .stroke({color: 'black'})
                    .move(0, btnHeight);
        
        // Button functions 
        this.upButton.click(() => {
            const currentY = parseFloat(this.thumb.y() as string); 
            const minY = 320;

            if (currentY > minY) {
                const updatedY = currentY - this.scrollStep;

                if (updatedY >= minY) {
                    this.thumb.y(updatedY.toString());  
                    if (this._moveCallback) {
                        this._moveCallback("up");
                    }
                }
            }
        });

        this.downButton.click(() => { 
            const currentY = parseFloat(this.thumb.y() as string); 
            const maxY = 550; 
        
            if (currentY < maxY) {
                const updatedY = currentY + this.scrollStep;

                if (updatedY <= maxY) {
                    this.thumb.y(updatedY.toString());  
                    if (this._moveCallback) {
                        this._moveCallback("down");
                    }
                }
            }
        });

        // track click functionality 
        this._rect.click((event: MouseEvent) => { 
            const clickPos = event.offsetY;
            const minY = 320;
            const maxY = 550; 

            if (clickPos >= minY && clickPos <= maxY) { 
                this.thumb.y(clickPos); 
                if (this._moveCallback) {
                    const direction = clickPos > this.thumbPos ? "down" : "up";
                    this._moveCallback(direction);
                }
            } 
        });

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    

    get scrollBarHeight(): number { 
        return this.height;
    }

    set scrollBarHeight(height: number) { 
        this.height = height;
        this.render();
    }

    get thumbPos(): number { 
        return parseFloat(this.thumb.y() as string);
    }
    
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
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

export {ScrollBar}