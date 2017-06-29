# Kontti

React viewmodel -library.

## API

Api consists of three methods: model, state, connector and pureConnector. 

Model is a viewmodel shared between its child components. Child model overrides parent model for its children, so everytime a model is created in react component hierarchy it replaces parent models.

Viewmodel created by a model can be listened with a connector or a pureConnector -component. PureConnector -component acts as a connector -component, except it wont update on prop change but only on viewmodel changes.

State is used to create a viewmodel for a single component. State acts like model, except it cant be listened by child components. Using state wont override model.

### model / state

Takes initialization values and actions as parameters. Returns a Model / Store -component, which behaves like a connector component except it is used to initialize the viewmodel.

State differs from Model in that it always gets all initValues as props, even if it wont listen to them.

`initValues`

An object, which contains the viewmodels initialization values.

`actions`

Custom actions for changing the model. Actions is a function, which returns an object of functions for altering the viewmodel. 

Actions get an object as an parameter. This object contains the following methods for changing the viewmodel:
- get: returns values of given keys. Takes string values as an argument.
- set: sets and emits given values. Takes an object containing keys and values as an argument.
- put: sets given values into store. Takes an object containing keys and values as an argument.

#### simple example

```js

// State works the same way, just import {state} instead of {model}

import {model} from 'kontti';

export default model({
    firstValue: 'value1',
    secondValue: 'value2',
}, ({get, set, put}) => ({

    fetchBothValues: () => get(
        'firstValue', 
        'secondValue'
    ),

    storeNewValues: () => set({
        firstValue: '1',
        secondValue: '2'
    }),

    insertNewValues: () => put({
        firstValue: 'this doesnt emit new viewmodel',
        secondValue: 'this doesnt emit new viewmodel'
    })
});

```

### connector / pureConnector

Takes listened keys, view component and options as parameters. Returns component wrapped to connector -component. PureConnector acts like a connector component, except it only updates on viewmodel changes.

Listened keys can be either list of string values or a propTypes -object.

Component is a react component, either class or function. 

Options contains options for the connector. At the moment options is only used to give contextTypes.

Component gets listened keys and their viewmodel values as props. Component also gets Model/State -function and ModelStore/StateStore- and Subscriber -objects as context, depending on the viewmodel -type.

`listenedKeys`

Either list of strings or a propTypes type of an object.

`component`

React component which will be is wrapped by the connector.

`options`

An object, which is used for givin contextTypes for the wrapped component.

`Model / State`

Model / state is used to manipulate the viewmodel. It is a function, which contains default actions for altering the viewmodel as properties.

The Model / state -function is used to batch default actions for not firing multiple renders when altering many values at once. The function gets model / state as a paramter.

Model / state contains default actions as properties. Default actions are set- / get -methods for every value initialized in viewmodel. Method has a get/set -prefix and value key with first letter as uppercase.

``` js 

Model(m => {
    m.getFirstValue() // returns the current firstValue
    
    m.setFirstValue(/* insert new value here */) // sets and emits new firstValue
})

```

`ModelStore / StateStore`

Also used to manipulate the viewmodel. Provides the actions as created when creating store/model as properties.

`Subscriber`

Has getStoreChanged- and getPropsChanged -function as parameters. 

GetStoreChanged returns true if store has changed on update.

GetPropsChanged returns true if props have changed on update.

``` js

// PureConnector works the same way as connector, except it only updates on viewmodel changes

import {connector} from 'kontti';

export default connector('firstValue', 'secondValue', ({
    firstValue, 
    secondValue
}, {
    Model,
    ModelStore
}) => {

    const handleModelChange = () => {
        Model.setFirstValue('newValue')
    }

    const handleModelStoreChange = () => {
        // Created in model / state -example
        ModelStore.storeNewValues();
    }

    return (
        <div> 
            <button onClick={handleModelChange}> Change Model </button>
            <button onClick={handleModelStoreChange}> Change ModelStore </button>
        </div>
    )
})

```

### Example

A simple example. Just to demonstrate the productivity of Kontti.

``` js

/* Create a model */
import {model} from 'kontti';

const HelloModel = model({
    name: null
})

/* Create the name setter -component */
import {pureConnector} from 'kontti';

const NameSetter = pureConnector((props, {
    Model
}) => {

    const handleInputChange = (e) => {
        Model.setName(e.target.value)
    }

    return (
        <input onChange={handleInputChange} />
    )
})

/* Create the name displayer -component */
import {pureConnector} from 'kontti';

const NameDisplayer = pureConnector('name', (
    vm
) => (
    <div>
        Hello {vm.name}!
    </div>
)

/* Create the modeler -compoent */

const HelloYou = HelloModel(() => (
    <div>
        <NameSetter />
        <NameDisplayer />
    </div>
))

// HelloYou is ready to be rendered

``` 

A more complicated example. It is meant just to show some different possibilities of using Kontti. Normally you would use state instead of model for just one component.

``` js 

/* Create Model */
import {model} from 'kontti';
import {timerApi} from 'services.js'; // Just some imaginary API file for example

const FetchModel = model({
    timer: null,
    testRows: []
}, s => ({
    fetchTestRows: () => {
        // Wont emit changes
        s.put({
            timer: Date.now()
        })

        timerApi.getData()
            .then((data) => {
                s.set({
                    timer: s.getTimer() - Date.now(),
                    testRows: data.rows
                })
            })
    }
})

/* Create the FetchTimer */
const FetchTimer = FetchModel({
    timer: propTypes.number,
    testRows: propTypes.array
}, (vm, {
    ModelStore
}) => (
    <div>
        <button onClick={ModelStore.fetchTestRows()}> 
            Run test again! 
        </button>

        <hr />
        Time passed: {vm.timer}
        <div>
            Rows:
            {vm.testRows.map(row => (
                <div> {row.value} </div>
            ))}
        </div>
    </div>
))

// FetchTimer is ready to be rendered

```



