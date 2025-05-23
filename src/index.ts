import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import {Checkbox} from "./widgets/checkbox"
import {RadioButton} from "./widgets/radiobutton"
import {ScrollBar} from "./widgets/scrollbar"
import { ProgressBar } from "./widgets/progressbar";
import { NumberGenerator } from "./widgets/numbergenerator";


let w = new Window(window.innerHeight-10,'100%');

// button
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
    console.log("Button was clicked!");
});

// Checkbox
let lbl2 = new Heading(w);
lbl2.text = "Check the checkbox:";
lbl2.tabindex = 3;
lbl2.fontSize = 16;
lbl2.move(10, 100);

let checkbox = new Checkbox(w);
checkbox.tabindex = 4;
checkbox.move(12, 125);

checkbox.onToggle = (checked) => {
    lbl2.text = checked ? "Checkbox checked!" : "Check the checkbox:";
    console.log(`Checkbox toggled. Checked: ${checked}`);
};

// radio button
let lbl3 = new Heading(w);
lbl3.text = "Choose an option:";
lbl3.tabindex = 5;
lbl3.fontSize = 16;
lbl3.move(10, 160);

let rb1 = new RadioButton(w);
rb1.label = "Option A";
rb1.move(12, 190);

let rb2 = new RadioButton(w);
rb2.label = "Option B";
rb2.move(12, 220);

rb1.onSelect = (label) => {
    rb1.select();
    rb2.deselect();
    lbl3.text = `${label} selected`;
    console.log(`${label} selected`);
};

rb2.onSelect = (label) => {
    rb2.select();
    rb1.deselect();
    lbl3.text = `${label} selected`;
    console.log(`${label} selected`);
};

// scrollbar
let lbl4 = new Heading(w);
lbl4.text = "Scroll below:";
lbl4.tabindex = 6;
lbl4.fontSize = 16;
lbl4.move(10, 260);

let scrollbar = new ScrollBar(w);
scrollbar.move(12, 290);

let lbl5 = new Heading(w);
lbl5.text = "Progress Bar:";
lbl5.tabindex = 7;
lbl5.fontSize = 16;
lbl5.move(10, 500);

// progressbar
let progress = new ProgressBar(w);
progress.progressWidth = 250;
progress.incrementStep = 10;
progress.move(12, 580);
progress.setProgress(0);

let progressBtn = new Button(w);
progressBtn.tabindex = 8;
progressBtn.fontSize = 14;
progressBtn.label = "Add";
progressBtn.size = { width: 160, height: 40 };
progressBtn.move(200, 530);

let delProgressBtn = new Button(w);
delProgressBtn.tabindex = 8;
delProgressBtn.fontSize = 14;
delProgressBtn.label = "Delete";
delProgressBtn.size = { width: 200, height: 40 };
delProgressBtn.move(12, 530);

progressBtn.onClick(() => {
    progress.increment();
    lbl5.text = "Progress incremented!";
});

delProgressBtn.onClick(() => {
    progress.reduce();
    lbl5.text = "Progress reduced!";
});

progress.onIncrement = (val) => {
    console.log("Progress is now:", val);
};

progress.onStateChange = (state) => {
    console.log("ProgressBar state:", state);
};

// random number generator
let lbl6 = new Heading(w);
lbl6.text = "Random Number Generator:";
lbl6.tabindex = 7;
lbl6.fontSize = 16;
lbl6.move(10, 610);

let numberGen = new NumberGenerator(w);
numberGen.move(20, 650);
