
# Kontti 

Kontti is a React viewmodel -library designed for simplicity and development speed.

React uses a tree-like component structure, component has child components, which again might have child components, etc. Kontti utilises this tree-like hierarchy by creating a viewmodel -component, which passes viewmodel to its child components.

Kontti -viewmodel consists of a provider component and a consumer component. Provider component contains the viewmodel and passes it down to consumer components.

## Basics

Provider- and Consumer -components can listen to viewmodel values by giving them as values in props. If listened viewmodel values change, the component is updated with new values.

| Property | Type | Description | 
| :- | :- | :- |
| provider | Function | Returns a Provider -component. Takes values object and actions function as a parameter. `const Provider = provider(values, actions);` values |
| values | Object | Object containing viewmodel init values. |
| actions | Function | Returns an object, containing functions for changing the model. Gets an object as an argument, which contains set-, get- and put -functions. |
| get | Function | Return value is dependant of given parameters. Parameters can be either empty or a list of strings. If parameters are empty, returns current viewmodel as an object. If parameters are a list of strings, returns an object containing listed viewmodel values. Also takes a function as parameter, more about this in the "Function syntax" -chapter. `get().person` |
| set | Function | Takes an object as a parameter, containing changes to viewmodel. Using set to update viewmodel updates all components listening to the changed values. Returns an object containing actions. Also takes a function as parameter, more about this in the "Function syntax" -chapter. `set({ value: 'New value' })` |
| put | Function | Not adviced to be used, added only for some super special case. Works just like set, but doesn't component updates. Look at the "Private store" -section for alternative solutions. |
| Consumer | React -component | Used to listen to viewmodel created by Provider. Listened values are given to Consumer as props. Consumer should have a function as a child. Consumer calls this function with the listened viewmodel values and viewmodel actions. ` <Consumer person> {(vm, m) => <div> {vm.person} </div>} </Consumer> ` |
| vm | Object | An object containing listened viewmodel values. |
| m | Object | An object containing listened viewmodel actions. |

## Examples

This example is simplified and can be shortened a lot. An example of a shortened version at the advanced section.

```javascript

import React from 'react';
import {provider, Consumer} from 'kontti';

//
// CREATE A PROVIDER
//

// Initialise values for the viewmodel
// 
const values = {
    person: '',
}

// Initialize actions to change the viewmodel
//
const actions = (modelActions) => {
    // Argument modelActions is type of an object, which is used to either get values from the model or set new values from the model
    // 
    return {
        addPerson(personName) {
            modelActions.set({person: personName});
        },

        // Actions can also be used to return values
        //
        getPersonUpperCase() {
            return modelActions.get().person.toUpperCase();
        }
    }
}

const ProviderParent = provider(values, actions);

// 
// CREATE A CONSUMER
//

const ConsumerChild () => {
    return (
        // Listened values are listed as props. Provider can also listen to values like this.
        //
        <Consumer person>
            // Child function called with listened values and model actions.
            //
            {(vm, m) => {
                return (
                    <div>
                        // Model actions contains providers actions
                        //
                        <button onClick={() => m.addPerson('Jack Sparrow')} value='Add Jack Sparrow' />
                        <br />
                        <button onClick={() => alert(m.getPersonUpperCase() + '!')} value='Yell current person!' />
                        <hr />
                        
                        // Value updated as model changes
                        //
                        {'Hello ' + vm.person}
                    </div>
                )
            }}
        </Consumer>
    )
}

export default () => {
    return (
        <ProviderParent>
            <ConsumerChild />
        </ProviderParent>
    )
}

```

## Advanced

### Shortened syntax

This is a shortened version of the basic example.

In addition, the provider and consumer implementations are separated into their own ProviderParent.jsx- and ConsumerChild.jsx -files.

```javascript

//
// ProviderParent.jsx
//

import React from 'react';
import {provider} from 'kontti';

export default provider({
    person: ''
}, ({ set, get }) => ({
    addPerson: (person) => set({ person }),
    getPersonUpperCase: () => get().person.toUpperCase()
}))

//
// ConsumerChild.jsx
//

import React from 'react';
import {Consumer} from 'kontti';

import ProviderParent from './ProviderParent';

export default () => (
    <ProviderParent>
        <Consumer person>
            {(vm, m) => (
                <div>
                    <button onClick={() => m.addPerson('Jack Sparrow')} value='Add Jack Sparrow' />
                    <br />
                    <button onClick={() => alert(m.getPersonUpperCase() + '!')} value='Yell current person!' />
                    <hr />
                    {'Hello ' + vm.person}
                </div>
            )}
        </Consumer>
    </ProviderParent>
)

```

### Function syntax

Model actions set-, get- and put -functions also take a function as a parameter. They all receive current viewmodel values as a parameter and act like they normally do. 

| Property | Description |
| :- | :- |
| set | Sets values returned by the function as new viewmodel values. Set -function still returns actions. |
| put | Same as set, but doens't trigger component updates. |
| get | Returns the return value of the function. |

```javascript

import {provider} from 'kontti';

export default provider({
    counter: 0
}, ({ set, get }) => ({
    increaseCounter: () => set(vm => ({ counter: vm.counter + 1 })),

    increaseCounterByN: (n = 0) => set(vm => ({ counter: vm.counter + n }))

    getCounter: () => get(vm => vm.counter)
}))

```

### Real life use

In real life Kontti is used for managing one web application pages state. The folder structure can be used for describing which component uses which model. Component structure could be something like:

- pages/
    - itemsPage/
        - view/               --Contains React components using the Kontti -model, which is created in items.model.jsx. These components are only meant to be used in items page.
            - searchBar.jsx      
            - resultsArea.jsx   
            - ...
        - items.jsx           --Contains the items -page. This file is the root of items page, it combines the viewmodel with page's components
        - items.model.jsx     --Contains kontti -viewmodel

```javascript

// items.jsx

import React from 'react';

import Provider from 'items.model';

import SearchBar from './view/searchBar'
import ResultsArea from './view/resultsArea'

export default () => (
    <Provider>
        <div>
            <SearchBar />
            <ResultsArea />
        </div>
    </Provider>
)

```
    
### Local viewmodel

Kontti -viewmodel is global by default. This means that the Consumer gets its values from the closest Provider above in its component hierarchy. 

Kontti provides the possibility of making a local viewmodel, but usually in these cases the component is small, so using setState might be a more simple option.

```javascript

// When using a Local viewmodel, instead of importing provider or Consumer, you import container function.
//
import {container} from 'kontti';

// You can then create a local viewmodel by passing viewmodel values and viewmodel actions to container, like when creating a provider.
// Function returns an object containing Provider and Consumer -components. These components only work together. 
// 
const {Provider, Consumer} = container(values, actions);

// You can for example export Provider and Consumer, and use them to create a local viewmodel.
// 
export default {Provider, Consumer};

``` 

### Private store

Sometimes you want to store values in your viewmodel, which doesn't affect components or their rendering cycle. As Provider is created only when Provider is rendered, you can use a clojure to create a private store.

```javascript 

import {provider} from 'kontti';

export default provider({
    counter: 0
}, ({set}) => {
    // This function is only called when component is rendered. You can use this to store private values.
    // 
    let _timesCounterIncreased = 0;
    let _timesCounterDecreased = 0;

    return {
        increaseCounterBy: (n = 0) => set(vm => {
            _timesCounterIncreased = _timesCounterIncreased + 1;

            return { counter: vm.counter + n }
        }),

        decreaseCounterBy: (n = 0) => set(vm => {
            _timesCounterIncreased = _timesCounterIncreased + 1;

            return { counter: vm.counter + n }
        })
    }
})

```
