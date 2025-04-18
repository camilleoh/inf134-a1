import { Window, Widget, RoleType } from "../core/ui";
import { Rect } from "../core/ui";
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";

class ProgressBar extends Widget {
    private track: Rect;
    private fill: Rect;
    private progressValue: number = 0;
    private _incrementStep: number = 10;
    private _progressWidth: number = 200;

    // Event handlers
    onIncrement?: (newValue: number) => void;
    onStateChange?: (state: string) => void;

    constructor(parent: Window) {
        super(parent);
        this.width = this._progressWidth;
        this.height = 20;
        this.role = RoleType.none;
        this.setState(new IdleUpWidgetState());

        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        this.track = this._group.rect(this._progressWidth, this.height).fill('#e0e0e0').radius(10);
        this.fill = this._group.rect(0, this.height).fill('#4caf50').radius(10).move(0, 0);
    }

    setProgress(value: number): void {
        const clamped = Math.max(0, Math.min(value, 100));
        this.progressValue = clamped;
        const newWidth = (clamped / 100) * this._progressWidth;
        this.fill.width(newWidth);

        // Notify increment listeners
        if (this.onIncrement) {
            this.onIncrement(clamped);
        }

        // Notify state change listeners
        if (this.onStateChange) {
            this.onStateChange("progress-updated");
        }
    }

    increment(value: number = this._incrementStep): void {
        this.setProgress(this.progressValue + value);
    }

    reduce(value: number = this._incrementStep): void {
        this.setProgress(this.progressValue - value);
    }

    move(x: number, y: number): void {
        super.move(x, y);
        this._group.move(x, y);
    }

    get progress(): number {
        return this.progressValue;
    }

    get incrementStep(): number {
        return this._incrementStep;
    }

    set incrementStep(value: number) {
        this._incrementStep = value;
    }

    get progressWidth(): number {
        return this._progressWidth;
    }

    set progressWidth(width: number) {
        this._progressWidth = width;
        if (this.track && this.fill) {
            this.track.width(width);
            this.setProgress(this.progressValue); // Refresh fill width
        }
    }

    // Optional UI state methods
    idleupState(): void { this.notifyState("idleup"); }
    idledownState(): void { this.notifyState("idledown"); }
    pressedState(): void { this.notifyState("pressed"); }
    pressReleaseState(): void { this.notifyState("press-release"); }
    hoverState(): void { this.notifyState("hover"); }
    hoverPressedState(): void { this.notifyState("hover-pressed"); }
    pressedoutState(): void { this.notifyState("pressed-out"); }
    moveState(): void { this.notifyState("move"); }
    keyupState(): void { this.notifyState("keyup"); }

    private notifyState(state: string): void {
        if (this.onStateChange) {
            this.onStateChange(state);
        }
    }
}

export { ProgressBar };
