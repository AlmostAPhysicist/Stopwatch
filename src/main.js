// within index.html, the following file is sequencially evaluated after the DOM for the page is loaded.
// DOM is the tree structure for the HTML elements on the page.
// By default, the DOM object is available as a global variable named "document" in JavaScript. Think of it as the root node.
// Each HTML element on the page is represented as a node in the DOM tree, and we can manipulate these nodes using JavaScript to change the content and structure of the page dynamically.

console.log("main.js loaded") // print to the developer console to confirm that the file is loaded and executed.


const page_header = document.createElement("h1") // create a new HTML element of type "h1" (header level 1) and assign it to the variable "page_header".
console.log(page_header) // print the newly created "h1" element to the console. At this point, it is an empty header element that has not yet been added to the page.

// NOTE: this is important! I created the element but did not add it to the page yet.
// There are 2 phases:
// Create node
// Attach node to DOM tree
// Let's add some content to it and actually add it to the page.

// Modify the content: 
page_header.textContent = "Hello World!" // set the text content of the "h1" element to "Hello World!". <h1>Hello World!</h1>

// Add it to the page:
document.body.append(page_header) // append the "h1" element as a child of the "body" element in the DOM, which will make it visible on the page. On append vs appendChild: https://dev.to/ibn_abubakre/append-vs-appendchild-a4m

console.log(document.body)

// The browser roughly did:
// 1. Create h1 node object
// 2. Store text inside it
// 3. Insert node into body
// 4. Recalculate page layout
// 5. Render pixels to screen

// As an experiment, let me add the start button 

const start_button = document.createElement("button") // create a new HTML element of type "button" and assign it to the variable "start_button".
start_button.textContent = "Start" // set the text content of the button to "Start".
document.body.append(start_button) // append the button to the body of the document, making it visible on the page.

//--- Now let's start fresh and compartmentalize everything in a nicer tree structure---

// Delete `page_header` and `start_button` from the page
page_header.remove() // Modern method
start_button.parentElement.removeChild(start_button) // Legacy method

//------

// start by creating a generic grouping element, a div, which is just a node used for structural purposes. We can call it "app" or "root" or whatever we want. This will be the parent node for all our content.
const app = document.createElement("div")
document.body.append(app)
app.append(page_header) // instead of appending directly to document, append to app
app.append(start_button)
// body
// └── div
//     ├── h1
//     └── button
// This will help us keep ourselves organized, and will make our lives easier as we add more and more content to the page. We can just append everything to this "app" div, and it will all be contained within it. This is a common pattern in web development, where we have a root element that contains all our content.
// Now you can:
// move the whole app
// style the whole app
// hide/show the whole app
// replace the whole app
// isolate app logic
// all through ONE container.

//-------

// MOVING NODES (VERY IMPORTANT)
// DOM nodes can move around the DOM tree. They are not fixed in place. When you append a node to a new parent, it will be moved from its current location to the new location. This is a fundamental behavior of the DOM and is important to understand when manipulating the DOM with JavaScript.
// This surprises many beginners.

// If you do:

// document.body.append(page_header);
// app.append(page_header);

// the header does NOT get copied.
// It MOVES.
// Because a node can only exist once in the DOM tree.
// This is a fundamental DOM rule.

//-------

// Attributes and Properties of DOM nodes:
// Often it is nice to set some attributes on our nodes, such as id, class, style, etc. These attributes can be set using JavaScript as well. For example:

app.id = "app" // <div id="app"></div>; IDs give us a unique identifier for the element, which can be used for styling or selecting the element later.


// SELECTING EXISTING NODES

const selected_app = document.getElementById("app") // select the element with the id "app". Note: `selected_app` would hold here, a reference to the same DOM node as `app`. They are two variables pointing to the same object in memory. So if you modify `selected_app`, you are also modifying `app`, because they are the same object. This is an important concept in JavaScript, where variables hold references to objects rather than the objects themselves.

// We didn't assign any ID to the header or button, but we can still select them using other methods, such as `querySelector` or `getElementsByTagName`. For example:

const selected_header = document.querySelector("h1") // select the first "h1" element in the document. This will return the same element as `page_header` because there is only one "h1" element in the DOM. If there were multiple "h1" elements, it would return the first one it finds in the DOM tree. 
// You can add more specific selection criteria to `querySelector` using CSS selectors. For example, if you had multiple headers and wanted to select the one with a specific class, you could do `document.querySelector("h1.my-class")` to select the first "h1" element with the css class "my-class".

// `querySelector` searches through #id node-type .css-class, for example `document.querySelector("#app h1 .my-class")` would search for an element with the class "my-class" that is a descendant of an "h1" element that is a descendant of the element with the id "app". It uses the same syntax as CSS selectors. Notice, this means that multiple elements can have the same ID and querySelector will just return the first one it finds. However, it is generally considered bad practice to have multiple elements with the same ID, as IDs are meant to be unique identifiers for elements in the DOM.

const selected_button = document.getElementsByTagName("button")[0] // getElementsByTagName returns a live HTMLCollection of all elements with the specified tag name. Since it returns a collection, we need to specify the index [0] to get the first button element. This will return the same element as `start_button` because there is only one "button" element in the DOM. If for instance we had added 2 buttons and we wanted the one we added at the end, we could do `document.getElementsByTagName("button")[1]` to get the second button element. Note that `getElementsByTagName` is a live collection, meaning that if you add or remove elements with the specified tag name after calling this method, the collection will automatically update to reflect those changes. In contrast, `querySelector` returns a static reference to the first matching element at the time it is called, and does not update if the DOM changes later on.

selected_header.textContent = "Stopwatch" // mutate the header 
selected_button.className = "start-button" // add a CSS class to the button node for styling purposes. This will allow us to target the button with CSS and apply styles to it. For example, we could have a CSS rule like `.start-button { background-color: green; color: white; }` to style the button with a green background and white text.

// CSS syntax  (order does not matter):

// #id
// .class
// tag

// # → ID
// . → class
// no prefix → tag

// You can get all matching elements with `querySelectorAll`
// You can also decide the scope for the quary by calling `querySelector` on a specific element instead of `document`. For example body.querySelector("h1") would search for the first "h1" element that is a descendant of the body element. whereas app.querySelector("h1") would search for the first "h1" element that is a descendant of the app element.

// quarySelector searches at infinite depth, so it will find any matching element that is a descendant of the specified element, regardless of how deeply nested it is in the DOM tree. (It actually uses DFS traversal, i.e. finds children of nodes using a stack)

//-------

// Let's now give our page all the elements it needs.

// Find all children of the app div and remove them 

let n = app.childNodes.length // get the number of child nodes of the app element. This will give us the number of elements that are currently inside the app div.
for (let i = 0; i < n; i++) { // careful! using app.childNodes.length in the loop condition would be a bug, because as we remove nodes, the length will decrease since the property `childNodes` is live. IT UPDATES IN REAL TIME WITH CHANGES TO THE DOM. You must be careful with things like this.
    app.removeChild(app.childNodes[0]);// this is a little subtle. We are always removing the first child node (index 0) because as we remove nodes, the remaining nodes shift to the left.
}


const header = document.createElement("h1")
header.textContent = "Stopwatch"
app.append(header)

const theme_toggle_wrap = document.createElement("div")
theme_toggle_wrap.className = "theme-toggle-wrap"

const theme_toggle = document.createElement("input")
theme_toggle.type = "checkbox"
theme_toggle.className = "theme-checkbox"
theme_toggle.setAttribute("aria-label", "Toggle theme")
theme_toggle_wrap.append(theme_toggle)
app.append(theme_toggle_wrap)

// layout container: main-area will fill remainder of viewport under header
const mainArea = document.createElement("div")
mainArea.className = "main-area"
app.append(mainArea)

// left (3) and right (1) columns
const left = document.createElement("div")
left.className = "left"
const right = document.createElement("div")
right.className = "right"
mainArea.append(left, right)

// left column split vertically: time-area (3) and controls (1)
const clock = document.createElement("div") // an analog clock placeholder
clock.className = "clock"
left.append(clock)

const timelog = document.createElement("div")
timelog.className = "timelog"
left.append(timelog)

const time = document.createElement("p")
time.className = "time"
time.textContent = "00:00:00"
timelog.append(time)

const buttons = document.createElement("div")
buttons.className = "controls"
left.append(buttons)

function createStyledButton(label, className) {
    const button = document.createElement("button")
    button.className = `btn ${className}`

    const button_top = document.createElement("span")
    button_top.className = "button_top"
    button_top.textContent = label

    button.append(button_top)
    return button
}

const start_stop_button = createStyledButton("Start", "btn-start")
buttons.append(start_stop_button)

const reset_button = createStyledButton("Reset", "btn-reset")
buttons.append(reset_button)

const lap_button = createStyledButton("Lap", "btn-lap")
buttons.append(lap_button)

// right column: lap times label + entries container
const lap_times_timelog = document.createElement("div")
lap_times_timelog.className = "lap-times"
const lap_label_node = document.createElement("div")
lap_label_node.className = "lap-label"
lap_label_node.textContent = "Lap times:"
const lap_entries = document.createElement("div")
lap_entries.className = "lap-entries"
lap_times_timelog.append(lap_label_node, lap_entries)
right.append(lap_times_timelog)

theme_toggle.addEventListener("change", function () {
    document.body.classList.toggle("theme-light", theme_toggle.checked)
})

function setStartStopButtonState(isRunning) {
    start_stop_button.querySelector(".button_top").textContent = isRunning ? "Stop" : "Start"
    start_stop_button.classList.toggle("btn-start", !isRunning)
    start_stop_button.classList.toggle("btn-stop", isRunning)
}

setStartStopButtonState(false)

//------

// EVENTS
// The browser is constantly listening for things:

// mouse clicks
// keyboard input
// scrolling
// resizing
// dragging
// focus changes
// touch gestures

// When something happens,
// the browser CREATES an event object and dispatches it through the DOM.

// Your JS can subscribe to these events through the addEventListener() API

// Example:

function iGotClicked() {
    console.log("Button clicked!")
}
start_stop_button.addEventListener("click", iGotClicked) // you can also define a function inline using () => {} (equivalent to function () {}) syntax, which is called an anonymous function. () contains the parameters (if any) and {} contains the body of the function. For example: `start_stop_button.addEventListener("click", () => { console.log("Button clicked!") })` would be equivalent.
// Note: selected_button.addEventListener("click", console.log("hello")) would NOT work since any function call (i.e. with parentheses) will execute the function immediately and pass its return value to addEventListener, which is not what we want. We want to pass the function itself as a reference, without executing it, so that it can be called later when the event occurs. This is why we pass `iGotClicked` without parentheses, which allows us to reference the function without executing it immediately. When the button is clicked, the browser will call the `iGotClicked` function and execute its body, which will log "Button clicked!" to the console.

// remove event listener:
start_stop_button.removeEventListener("click", iGotClicked) // this will remove the event listener that we just added. Now if we click the start_stop_button, nothing will happen because there are no event listeners attached to it. Note that when you remove an event listener, you need to pass the same function reference that you used when adding the event listener. This is why we defined the function `iGotClicked` separately, so that we can reference it when removing the event listener. If we had defined the function inline as an anonymous function, we would not be able to remove it later because we would not have a reference to it.
// Functions are first-class objects in JS and can also be stored as variables like `const iGotClicked = () => { console.log("Button clicked!") }` and then we can pass `iGotClicked` to both `addEventListener` and `removeEventListener`.

// list of events: https://developer.mozilla.org/en-US/docs/Web/Events, common ones: https://www.geeksforgeeks.org/javascript/javascript-events/

// Let's create an increment toggle variable that changes state every time we click the start_stop_button, and log its value to the console.

let is_incrementing = false
function toggleIncrement() {
    is_incrementing = !is_incrementing // toggle the value of is_incrementing between true and false every time the function is called.
    console.log(is_incrementing) // log the current value of is_incrementing to the console.
    setStartStopButtonState(is_incrementing) // change the text content of the start_stop_button to "Stop" if is_incrementing is true, and "Start" if is_incrementing is false. This will give us visual feedback on the button itself to indicate whether we are currently incrementing or not.
}
start_stop_button.addEventListener("click", toggleIncrement) // add an event listener to the start_stop_button that listens for "click" events and calls the toggleIncrement function when a click occurs. This will allow us to toggle the incrementing state and update the button text every time we click the button.

//--------------------------------------------------------------

let seconds = 0.0 // another state variable to keep track of the time in seconds.
let interval = 10 // milliseconds
let last_paused_time = 0.0
let last_seconds = 0.0

// TIMERS
// The browser also has a built in timer system that allows us to execute code at specific intervals or after a certain delay. This is done through the `setInterval` and `setTimeout` function API. To be able to delete these timers later, we need to store their IDs, which are returned by these functions when we create a timer.

let increment_timer_id = null // variable to store the ID of the increment timer, which we will create later.

function incrementTime() { // I want this to run every `interval` milliseconds and update the time display accordingly. This function will be responsible for incrementing the time and updating the display every time it is called.
    let incremented_time_since_last_pause = Date.now() - last_paused_time // calculate the amount of time that has passed since the last time we paused the timer. `Date.now()` returns the current timestamp in milliseconds, so by subtracting the `last_paused_time` from it, we get the elapsed time in milliseconds since the last pause. This will allow us to keep track of how much time has passed while the timer is running, and we can use this information to update our `seconds` variable accordingly.

    seconds = last_seconds + (incremented_time_since_last_pause / 1000) // increment the time by 0.001 seconds (1 millisecond) every time this function is called. This will allow us to keep track of the elapsed time in seconds.

    const elapsedMilliseconds = Math.floor(seconds * 1000) // convert the elapsed time from seconds to milliseconds by multiplying it by 1000 and rounding down to the nearest integer using Math.floor. This will give us the total elapsed time in milliseconds, which we can then use to calculate the minutes, seconds, and milliseconds for display.

    const totalMilliseconds = elapsedMilliseconds;

    const m = String(Math.floor(totalMilliseconds / 60000)).padStart(2, "0");
    const s = String(Math.floor((totalMilliseconds % 60000) / 1000)).padStart(2, "0");
    const cs = String(Math.floor((totalMilliseconds % 1000) / 10)).padStart(2, "0");

    time.textContent = `${m}:${s}:${cs}`;
}

function startIncrementing() {
    if (increment_timer_id !== null) { // if the increment timer is already running, we don't want to start another one. This check prevents us from creating multiple timers that would all increment the time at the same time, which would cause the time to increment faster than intended.
        return
    }
    last_seconds = seconds
    last_paused_time = Date.now()
    increment_timer_id = setInterval(incrementTime, interval)
}

function stopIncrementing() {
    clearInterval(increment_timer_id)
    increment_timer_id = null
}

function updatedToggleIncrement() {
    is_incrementing = !is_incrementing // toggle the value of is_incrementing between true and false every time the function is called.
    console.log(is_incrementing) // log the current value of is_incrementing to the console.
    setStartStopButtonState(is_incrementing) // change the text content of the start_stop_button to "Stop" if is_incrementing is true, and "Start" if is_incrementing is false. This will give us visual feedback on the button itself to indicate whether we are currently incrementing or not.
    if (is_incrementing) {
        startIncrementing() // if is_incrementing is true, start the increment timer to begin incrementing the time every `interval` milliseconds.
    } else {
        stopIncrementing() // if is_incrementing is false, stop the increment timer to stop incrementing the time.
    }
}

// Now we can replace the old toggleIncrement function with the updatedToggleIncrement function to have the start/stop functionality work properly with the timer.

function handlePrimaryPress(action) {
    return function (event) {
        if (event.button !== undefined && event.button !== 0) {
            return
        }
        event.preventDefault()
        action()
    }
}

start_stop_button.removeEventListener("click", toggleIncrement) // remove old
start_stop_button.addEventListener("pointerdown", handlePrimaryPress(updatedToggleIncrement)) // add new


//-------
// Lap functionality:
// Adds a new entry to the lap times log every time we click the lap button, showing the current elapsed time.
function logLapTime() {
    const lap_time_entry = document.createElement("p") // create a new paragraph element to hold the lap time entry.
    lap_time_entry.textContent = time.textContent // set the text content of the lap time entry to the current elapsed time displayed in the `time` element. This will log the current time as a new lap time entry in the lap times log.
    lap_entries.append(lap_time_entry) // append the new lap time entry to the `lap_entries` element, which will display it on the page under the "Lap times:" heading.
}
lap_button.addEventListener("click", logLapTime)

// ---------
// Reset functionality:
// Resets the stopwatch to 0 and clears the lap times log.
function resetStopwatch() {
    seconds = 0.0 // reset the time back to 0 seconds.
    last_seconds = 0.0
    last_paused_time = Date.now()
    time.textContent = "00:00:00" // update the time display to show 0 time.

    // clear only lap entries
    lap_entries.innerHTML = ""
}
reset_button.addEventListener("click", resetStopwatch)

lap_button.removeEventListener("click", logLapTime)
lap_button.addEventListener("pointerdown", handlePrimaryPress(logLapTime))

reset_button.removeEventListener("click", resetStopwatch)
reset_button.addEventListener("pointerdown", handlePrimaryPress(resetStopwatch))



