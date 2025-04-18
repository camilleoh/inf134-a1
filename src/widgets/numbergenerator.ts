import { Widget, Window, RoleType } from "../core/ui";
import { Rect, Text } from "../core/ui";
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";

class NumberGenerator extends Widget {
    private minInput: HTMLInputElement;
    private maxInput: HTMLInputElement;
    private resultText: Text;
    private generateButton: Rect;
    private generateLabel: Text;
    private x: number = 0;
    private y: number = 0;


    constructor(parent: Window) {
        super(parent);
        this.role = RoleType.none;
        this.setState(new IdleUpWidgetState());
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Create min input
        this.minInput = document.createElement("input");
        this.minInput.type = "number";
        this.minInput.placeholder = "Min";
        this.minInput.style.position = "absolute";
        this.minInput.style.left = "20px";
        this.minInput.style.top = "650px";
        document.body.appendChild(this.minInput);

        // Create max input
        this.maxInput = document.createElement("input");
        this.maxInput.type = "number";
        this.maxInput.placeholder = "Max";
        this.maxInput.style.position = "absolute";
        this.maxInput.style.left = "120px";
        this.maxInput.style.top = "650px";
        document.body.appendChild(this.maxInput);

        // Create generate button
        this.generateButton = this._group.rect(100, 30)
            .fill("#D8D8F6")
            .stroke("black")
            .move(20, 680)
            .radius(5);

        this.generateLabel = this._group.text("Generate")
            .font({ size: 14, family: "Arial" })
            .center(70, 695);

        this.resultText = this._group.text("Result: -")
            .font({ size: 16, family: "Arial" })
            .move(20, 720);

        this.generateButton.click(() => this.generateNumber());
        this.registerEvent(this.outerSvg);
        this.move(20, 650); // default position
    }

    private generateNumber(): void {
        const min = parseInt(this.minInput.value);
        const max = parseInt(this.maxInput.value);
        if (!isNaN(min) && !isNaN(max) && min <= max) {
            const result = Math.floor(Math.random() * (max - min + 1)) + min;
            this.resultText.text("Result: " + result);
        } else {
            this.resultText.text("Invalid range");
        }
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    
        // Move HTML inputs
        this.minInput.style.left = `${this.x}px`;
        this.minInput.style.top = `${this.y}px`;
    
        this.maxInput.style.left = `${this.x + 150}px`;
        this.maxInput.style.top = `${this.y}px`;
    
        // Move SVG elements
        this.generateButton.move(this.x, this.y + 30);
        this.generateLabel.center(this.x + 50, this.y + 45);
        this.resultText.move(this.x, this.y + 70);
    }

    pressReleaseState(): void {
        throw new Error("Method not implemented.");
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

export { NumberGenerator };
