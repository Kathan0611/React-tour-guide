<h1>React-Step-Guide</h1>

The React-Step-Guide component is a guided tour overlay for web applications, helping users navigate through specific features or elements on a page. 
It highlights elements in a sequence and displays an informational popup with navigation controls.

## Features

1) Automatically highlights elements specified in the steps.

2) Displays a popup with customizable content for each step.

3) Smooth scrolling to bring elements into view.

4) Calculates optimal popup positioning dynamically.

5) Provides controls for navigation (Next, Previous, Skip).

6) Handles edge cases for limited screen space.

 ## Installation
```npm install React-Step-Guide```
or 
```yarn add React-Step-Guide```

## Prerequisite

Ensure you have a React application set up.You can use create-react-app or any other React setup.

## Add the Component

Copy the TourGuide.tsx file into your project’s components folder.

Install the necessary dependencies (if not already installed):

```npm install react```

## Usage

import TourGuide in yourProject and with step array and flag.

This package provides a React-tourGuide hook that you can use to track the tour's dynamically of your website.

```import { TourGuide } from "./components/TourGuide"```
```
<TourGuide
        steps={steps}
        isTourActive={isTourActive}
        onClose={() => setIsTourActive(false)}
      />
```


## Example
```
import React, { useState } from "react";
import { TourGuide } from "./components/TourGuide"; //Tour Guide Component Will import
import "./components/TourGuide.css";

import React, { useState } from "react";
import { TourGuide } from "./components/TourGuide";
import "./components/TourGuide.css";

const App = () => {
  const [isTourActive, setIsTourActive] = useState(false);

  const steps = [
    { id: "step1", content: "This is step 1." },
    { id: "step2", content: "This is step 2." },
    { id: "step3", content: "This is step 3." },
  ];

  return (
    <div>
      <button onClick={() => setIsTourActive(true)}>Start Tour</button>

      <div id="step1" style={{ margin: "50px", padding: "10px", border: "1px solid black" }}>
        Step 1 Element
      </div>

      <div id="step2" style={{ margin: "50px", padding: "10px", border: "1px solid black" }}>
        Step 2 Element
      </div>
      <div id="step3" style={{ margin: "50px", padding: "10px", border: "1px solid black" }}>
        Step 3 Element
      </div>

      <TourGuide
        steps={steps}
        isTourActive={isTourActive}
        onClose={() => setIsTourActive(false)}
      />
    </div>

  );
};

export default App;

```

## API

###  `react-step-guide()`

| Key   | Type   | Description               |
|-------|--------|---------------------------|
| step | Array |  step array defined how much step will go. |
| flag | boolean | flag will be define step show and hide. |




![ezgif-7-84a33c2a88](https://github.com/user-attachments/assets/bf43e471-5447-44f6-a9ae-9fd369a9a16c)







