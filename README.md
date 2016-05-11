#Kontti

## API 

#### createModel

Used to create a model for a module. Model is passed in context down to child components. Declaring a new Model in component hierarchy overrides the parent Model.

`initModel`

Initvalues for the model. Type of object.

```js
const initModel = {
	firstName: 'FirstName',
	lastName: 'LastName'
}
```

`actions`

Actions to change the model. Type of object, actions can be either object or function.

```js
const actions = {
	changeFirstNameTo: (firstName) => ({
		firstName
	}),
	changeLastNameToJackSmith: {
		lastName: 'Jack Smith'
	}
}
```

CreateModel retuns another function, which you can connect to React component by passing the component as function parameter. CreateModel(ReactComponent) returns a react component.

```js
import {createModel} from 'kontti';

const initModel = {
	firstName: 'FirstName',
	lastName: 'LastName'
}

const actions = {
	changeFirstNameTo: (firstName) => ({
		firstName
	}),
	changeLastNameToJackSmith: {
		lastName: 'Jack Smith'
	}
}

const Model = createModel(initModel, actions);

...

const ModeledComponent = Model(ReactComponent)

``` 

#### createState

`initState`

Initvalues for the state. Type of object. State is passed only to the connected component.

```js
const initState = {
	firstName: 'FirstName',
	lastName: 'LastName'
}
```

`actions`

Actions to change the state. Type of object, actions can be either object or function.

```js
const actions = {
	changeFirstNameTo: (firstName) => ({
		firstName
	}),
	changeLastNameToJackSmith: {
		lastName: 'Jack Smith'
	}
}
```

CreateState retuns another function, which you can connect to React component by passing the component as function parameter. CreateState(ReactComponent) returns a react component.

```js 
import {createState} from 'kontti';

const initState = {
	firstName: 'FirstName',
	lastName: 'LastName'
}

const actions = {
	changeFirstNameTo: (firstName) => ({
		firstName
	}),
	changeLastNameToJackSmith: {
		lastName: 'Jack Smith'
	}
}

const State = createState(initState, actions);

...

const StatedComponent = State(ReactComponent)

``` 

#### connect

Used to connect React component to current Model.

```js
import {connect} from 'kontti';

const ReactComponent = () => (
	...
)

export default connect(ReactComponent)

```

#### listenTo

`...listenedValues`

Used to tell which Model values the component listens to. Listened values types are strings.

```js
import {listenTo} from 'kontti';

const listener = listenTo(
	'firstName',
	'lastName'
)

const ReactComponent = () => (
	...
)

export default listener(ReactComponent)

```

#### listener
-- DEPRECATED - Use listenTo instead --

`...listenedValues`

Used to tell which Model values the component listens to. Listened values types are strings.

```js
import {listener} from 'kontti';

listener(
	'firstName',
	'lastName'
)

const ReactComponent = () => (
	...
)

export default listener(ReactComponent)

```

## Basic usage

### With createModel

Example.model.js
```js
import {createModel} from 'kontti';

const initModel = {
	firstName: 'FirstName',
	lastName: 'LastName'
}

const actions = {
	changeFirstNameTo: (firstName) => ({
		firstName
	}),
	changeLastNameToJackSmith: {
		lastName: 'Jack Smith'
	}
}

export default createModel(initModel, actions)
``` 

ExampleParentComponent.jsx
```js
import ExampleModel from './Example.model.js';
import ExampleChildComponent from './ExampleChildComponent.jsx';

const ExampleParentComponent = () => (
	<ExampleChildComponent />
);

export default ExampleModel(ExampleParentComponent);

```

ExampleChildComponent.jsx
```js
import {listenTo} from 'kontti';

const listener = listenTo(
	'firstName',
	'lastName'
)

const ExampleChildComponent = ({
	firstName,
	secondName
}, {
	Model
}) => {
	const handleNameChangeClick = () => {
		Model.changeLastNameToJackSmith();
	}

	return (
		<div>
			<p>{firstName}</p>
			<p>{lastName}</p>
			
			<hr /> 
			<button 
				type='button'
				onClick={handleNameChangeClick}
				>
				Change last name to Jack Smith
			</button>
		</div>
	)
}

export default listener(ExampleChildComponent);

```

### With createState

Example.state.js
```js
import {createState} from 'kontti';

const initState = {
	firstName: 'FirstName',
	lastName: 'LastName'
}

const actions = {
	changeFirstNameTo: (firstName) => ({
		firstName
	}),
	changeLastNameToJackSmith: {
		lastName: 'Jack Smith'
	}
}

export default createState(initState, actions)
``` 

ExampleComponent.jsx
```js
import ExampleState from './Example.state.js';

const ExampleComponent = ({
	firstName,
	secondName,

	State
}) => {

	const handleNameChangeClick = () => {
		State.changeLastNameToJackSmith();
	}

	return (
		<div>
			<p>{firstName}</p>
			<p>{lastName}</p>
			
			<hr /> 
			<button 
				type='button'
				onClick={handleNameChangeClick}
				>
				Change last name to Jack Smith
			</button>
		</div>
	)
}

export default ExampleState(ExampleChildComponent);

```
