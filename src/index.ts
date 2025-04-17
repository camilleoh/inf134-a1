import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import {Checkbox} from "./widgets/checkbox"


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
