# Analytics App

## Author: Ashish Kar

### Version 1.0.0

---

## 1. Pre-requisites

1. Install Node.js. I have used Node version 14.20.0 so using same will ensure no errors/conflicts happen in npm dependencies.
2. Install Git
3. Clone the repository by using command:
   For HTTPS: git clone https://github.com/ashacekar/analytics-app.git
   For SSH: git clone git@github.com:ashacekar/analytics-app.git
4. Navigate to the project directory using a code editor (I recommend vs code)

## 2. How to Run the App

1. Run yarn install to download all dependencies
2. Run yarn build to build the project
3. Run yarn start to run the project

## 3. Features

Main Page (http://localhost:3000)

    Dataset used: https://drive.google.com/file/d/1td86FL0GyVYcKBUGY-8HX_wgeSDxWAsa/view

    Utility functions to calculate the class-wise mean, median, mode of
    “Flavanoids” for the entire dataset and results shown in tabular form

    Function that creates a new property “Gamma” for each point of
    the dataset. “Gamma” can be calculated as Gamma = (Ash * Hue) / Magnesium.

    Utility functions to calculate the class-wise mean, median, mode of
    “Gamma” for the entire dataset and results shown in tabular form

![alt text](/public/flavanoids-table.png)
![alt text](/public/gamma-table.png)
