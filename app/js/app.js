// Here's where we get, save, and delete to-dos.
// (Yep, this is all we need to access the Todo
// REST endpoints!)
var Todo = can.Model.extend({
	findAll: 'GET /todos',
    findOne: 'GET /todos/{id}',
	update: 'PUT /todos/{id}',
	destroy: 'DELETE /todos/{id}'
}, {});

// For this example, we're not actually going out to
// a REST endpoint, so we'll use fixtures to emulate that.
// Fixtures help you test your application when you
// don't have access to your REST services.
var TODOS = [
    'Download CanJS',
    'Read the guides',
    'Build your app',
    'Become immortal',
    'Haircut @ 2pm'
];

var todoStore = can.fixture.make(TODOS.length, function(i) {
	return {
		id: i + 1,
		description: TODOS[i],
		done: false
	};
});

can.fixture({
	'GET /todos': todoStore.findAll,
    'GET /todos/{id}': todoStore.findOne,
	'PUT /todos/{id}': todoStore.update,
	'DELETE /todos/{id}': todoStore.destroy
});

// Let's drag this out a bit.
can.fixture.delay = 500;

can.Component.extend({
  tag: "todos-app",
  scope: {
    selectedTodo: null,
    todos: new Todo.List({}),
    select: function(todo){
      this.attr('selectedTodo', todo);
    },
    saveTodo: function(todo) {
      todo.save();
      this.removeAttr('selectedTodo');
    }
  }
})

// Start the application by rendering our template!
$("#content").html(can.view("appMustache", { }))
