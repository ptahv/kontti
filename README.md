#Kontti

## API 

### createModel

Used to create a model for a module.

`*initModel*`

Initvalues for the model. Type of object.

`const initModel = {
	firstName: 'FirstName',
	lastName: 'LastName'
}`

`*actions*`

Actions to change the model. Type of object, actions can be either object or function.

`const actions = {
	changeFirstNameTo: (firstName) => ({
		firstName
	}),
	changeLastNameToJackSmith: {
		lastName: 'Jack Smith'
	}
}`

### createState

`*initState*`

Initvalues for the state. Type of object.

`const initState = {
	firstName: 'FirstName',
	lastName: 'LastName'
}`

`*actions*`

Actions to change the state. Type of object, actions can be either object or function.

`const actions = {
	changeFirstNameTo: (firstName) => ({
		firstName
	}),
	changeLastNameToJackSmith: {
		lastName: 'Jack Smith'
	}
}`

### connect

Used to connect React component to Model

### listenTo

`*...listenedValues*`

Used to tell which Model values the component listens to. Listened values types are strings.

`const listener = listenTo(
	'firstName',
	'lastName'
)`



### listener
-- DEPRECATED - Use listenTo instead --

`*...listenedValues*`

Used to tell which Model values the component listens to. Listened values types are strings.

`listener(
	'firstName',
	'lastName'
)`

## Basic usage
