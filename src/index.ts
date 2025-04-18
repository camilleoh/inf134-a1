import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import {Checkbox} from "./widgets/checkbox"
import {RadioButton} from "./widgets/radiobutton"
import {ScrollBar} from "./widgets/scrollbar"


let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Click the button!";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14
btn.label = "Click here!";
btn.size = {width: 120, height: 40};
btn.move(12, 50)

btn.onClick(() => {
    lbl1.text = "Button was clicked!";
});

let lbl2 = new Heading(w);
lbl2.text = "Check the checkbox:";
lbl2.tabindex = 3;
lbl2.fontSize = 16;
lbl2.move(10, 100);

// Checkbox
let checkbox = new Checkbox(w);
checkbox.tabindex = 4;
checkbox.move(12, 125);
checkbox.render();

let lbl3 = new Heading(w);
lbl3.text = "Choose an option:";
lbl3.tabindex = 5;
lbl3.fontSize = 16;
lbl3.move(10, 160);

let rb1 = new RadioButton(w);
rb1.move(12, 190);

let rb2 = new RadioButton(w);
rb2.move(12, 220);

// Optional: manually manage group behavior
rb1.pressReleaseState = () => {
    rb1.select();
    rb2.deselect();
};

rb2.pressReleaseState = () => {
    rb2.select();
    rb1.deselect();
};

let lbl4 = new Heading(w);
lbl4.text = "Scroll below:";
lbl4.tabindex = 6;
lbl4.fontSize = 16;
lbl4.move(10, 260);

// Scrollbar
let scrollbar = new ScrollBar(w);
scrollbar.move(12, 290); // Adjust Y as needed
// scrollbar.render();
