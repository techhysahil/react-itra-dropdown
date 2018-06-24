# React Dropdown

React component that allow you to slect single options from set of options. It has list of options [See Options List Section] that can be selected based on requirement.

## Demo

Live Demo URL : Not available yet

## Getting Started

The easiest way to use React Dropdown is to install it using NPM.

```javascript
npm install react-itra-dropdown --save
```
Now import React Dropdown into your project.

```js
import ItraDropdown from 'react-itra-dropdown';
```

### Usage

After adding react-itra-dropdown into your project, add following to get going.

You can set sourceList as either Array of Object or even Array to Object with Nested list of items as follow.

```
let CustomerList =[
  {
    "id": 0,
    "name": "Georgette Bender",
    list: [{
      "id": 10,
      "name": "Miranda Roman"
    },
    {
      "id": 11,
      "name": "Graves Vincent"
    }]
  },
  {
    "id": 1,
    "name": "Malinda Henry"
  },
  {
    "id": 2,
    "name": "Donaldson Gordon"
  },
  {
    "id": 3,
    "name": "Gaines Marshall"
  },
  {
    "id": 4,
    "name": "Taylor Boyd",
    list: [{
      "id": 40,
      "name": "Buckley Mayer"
    },
    {
      "id": 41,
      "name": "Ruby Webb"
    }
    ]
  },
  {
    "id": 5,
    "name": "Blevins Macdonald"
  }
];

let selectedCustomer = CustomerList[1];

<ItraDropdown 
  dataSource={CustomerList}
  selectedValue={selectedCustomer}
  onTagSelection={this.onCustomerSelection}
  showSearchBar={true}
/>
```
## Options List

| OPtion | Required/Optional | Description |
| --- | --- | --- |
| `id` | Required & Unique | Unique id for each category|
| `dataSource` | Required | List of items|
| `selectedValue` | Required | Selected  |
| `disabled` | Optional | disable Dropdown control, default  value is `false` |
| `showSearchBar` | Optional | Weather search needs to be shown or hidden, default  value is `false` i.e Search is hidden |


## Authors

***Sahil Gupta** [Github](https://github.com/techhysahil)

## License

This project is licensed under the Custom License - see the [LICENSE.md](LICENSE.md) file for details